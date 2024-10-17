import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { instanceToPlain, plainToClass } from "class-transformer";
import { User } from 'src/shared/entities/user.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { HelperService } from 'src/shared/util/helpers.service';
import { FileHandlerInterface } from 'src/shared/file-handler/filehandler.interface';
import { ConfigService } from '@nestjs/config';
import { GHGRecordState } from 'src/shared/enum/ghg.record.state.enum';
import { CompanyRole } from 'src/shared/enum/company.role.enum';
import { Projection } from 'src/shared/entities/projection.entity';
import { ProjectionDto } from 'src/shared/dto/projection.dto';
import { ProjectionEvent } from 'src/shared/entities/projection.event.entity';

@Injectable()
export class GhgProjectionsService {
    constructor(
        private logger: Logger,
        @InjectEntityManager() private entityManager: EntityManager,
        @InjectRepository(Projection) private projectionRepo: Repository<Projection>,
        private helperService: HelperService,
        private fileHandler: FileHandlerInterface,
        private configService: ConfigService,
    ) { };

    async create(projectionDto: ProjectionDto, user: User): Promise<{ status: HttpStatus; data: Projection } | undefined> {
        if (user.companyRole !== CompanyRole.MINISTRY && user.companyRole !== CompanyRole.GOVERNMENT) {
            throw new HttpException(
                this.helperService.formatReqMessagesString("user.userUnAUth", []),
                HttpStatus.FORBIDDEN
            );
        }
        let version: number = 1;
        this.logger.verbose("ProgrammeDTO received", JSON.stringify(projectionDto));
        const projection: Projection = this.toProjection(projectionDto);
        this.logger.verbose("Projection  create", JSON.stringify(projection));
        this.verifyProjectionValues(projection);

        let savedProjection: Projection;
        const result = await this.getEmissionByYear(projection.year);

        if (result && result.length > 0) {
            if (result[0].state === GHGRecordState.FINALIZED) {
                throw new HttpException(
                    this.helperService.formatReqMessagesString("ghgInventory.cannotEditProjectionFinalized", []),
                    HttpStatus.FORBIDDEN
                );
            }
            if (projectionDto.state === GHGRecordState.FINALIZED && user.companyRole !== CompanyRole.GOVERNMENT) {
                throw new HttpException(
                    this.helperService.formatReqMessagesString("user.userUnAUth", []),
                    HttpStatus.FORBIDDEN
                );
            }

            if (projectionDto.version !== result[0].version) {
                throw new HttpException(
                    this.helperService.formatReqMessagesString("ghgInventory.notTheLatestVersion", []),
                    HttpStatus.CONFLICT
                );
            }

            const version = result[0].version + 1;
            projection.id = result[0]?.id;
            if (projectionDto.emissionDocument) {
                projection.emissionDocument = await this.uploadDocument(
                    projectionDto.year,
                    version,
                    projectionDto.emissionDocument
                );
            }

            savedProjection = await this.entityManager
                .transaction(async (em) => {
                    const updatedData = await em.update<Projection>(Projection, {
                        id: projection.id,
                    },
                        {
                            energyEmissions: projection.energyEmissions,
                            industrialProcessesProductUse: projection.industrialProcessesProductUse,
                            agricultureForestryOtherLandUse: projection.agricultureForestryOtherLandUse,
                            waste: projection.waste,
                            other: projection.other,
                            totalCo2WithoutLand: projection.totalCo2WithoutLand,
                            totalCo2WithLand: projection.totalCo2WithLand,
                            state: projection.state,
                            emissionDocument: projection.emissionDocument,
                            version: version,
                            updatedAt: new Date(),
                            remarks: projection.remarks
                        });
                    await em.save<ProjectionEvent>(this.toProjectionEvent(projection, user));
                    return updatedData;
                })
                .catch((err: any) => {
                    console.log(err);
                    if (err instanceof QueryFailedError) {
                        throw new HttpException(this.helperService.formatReqMessagesString("ghgInventory.projectionSaveFailed", []), HttpStatus.BAD_REQUEST);
                    } else {
                        this.logger.error(`Emission updating error ${err}`);
                    }
                    return err;
                });
            return { status: HttpStatus.OK, data: savedProjection };
        }
        const createdDate = new Date();
        projection.country = this.configService.get("systemCountryName");
        projection.version = version;
        projection.createdAt = createdDate;
        projection.updatedAt = createdDate;
        if (projectionDto.emissionDocument) {
            projection.emissionDocument = await this.uploadDocument(
                projectionDto.year,
                projection.version,
                projectionDto.emissionDocument

            );
        }
        savedProjection = await this.entityManager
            .transaction(async (em) => {
                const savedData = await em.save<Projection>(projection);
                await em.save<ProjectionEvent>(this.toProjectionEvent(savedData, user));
                return savedData;
            })
            .catch((err: any) => {
                console.log(err);
                if (err instanceof QueryFailedError) {
                    throw new HttpException(this.helperService.formatReqMessagesString("ghgInventory.projectionUpdateFailed", []), HttpStatus.BAD_REQUEST);
                } else {
                    this.logger.error(`Projection add error ${err}`);
                }
                return err;
            });

        return { status: HttpStatus.CREATED, data: savedProjection };
    }

    async getAllProjections(user: User){
        if (user.companyRole !== CompanyRole.MINISTRY && user.companyRole !== CompanyRole.GOVERNMENT) {
            return await this.projectionRepo.find({
                where: {
                    state: GHGRecordState.FINALIZED,
                },
                order: { state: 'ASC', year: "DESC", }
            });
        }
        return await this.projectionRepo.find({ order: { state: 'ASC', year: "DESC", } });
    }

    getEmissionByYear = async (year: string) => {
        return await this.projectionRepo.find({
            where: {
                year: year,
                country: this.configService.get("systemCountryName"),
            },
        });
    }

    private toProjection(projectionDto: ProjectionDto): Projection {
        const data = instanceToPlain(projectionDto);
        this.logger.verbose("Converted ProjectionDto to Projection entity", JSON.stringify(data));
        return plainToClass(Projection, data);
    }
    private fileExtensionMap = new Map([
        ["vnd.openxmlformats-officedocument.spreadsheetml.sheet", "xlsx"],
        ["vnd.ms-excel", "xls"],
    ]);

    getFileExtension = (file: string): string => {
        let fileType = file.split(';')[0].split('/')[1];
        fileType = this.fileExtensionMap.get(fileType);
        return fileType;
    }

    async uploadDocument(year: string, version: number, data: string) {
        let filetype;
        try {
            filetype = this.getFileExtension(data);
            data = data.split(',')[1];
            if (filetype == undefined) {
                throw new HttpException(
                    this.helperService.formatReqMessagesString(
                        "programme.invalidDocumentUpload",
                        []
                    ),
                    HttpStatus.INTERNAL_SERVER_ERROR
                );
            }
        }
        catch (Exception: any) {
            throw new HttpException(
                this.helperService.formatReqMessagesString(
                    "programme.invalidDocumentUpload",
                    []
                ),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
        // Get the current date and time
        const currentDate = new Date();

        const response: any = await this.fileHandler.uploadFile(
            `documents/${year}_${currentDate.getTime()}_V${version}.${filetype}`,
            data
        );
        if (response) {
            return response;
        } else {
            throw new HttpException(
                this.helperService.formatReqMessagesString(
                    "programme.docUploadFailed",
                    []
                ),
                HttpStatus.INTERNAL_SERVER_ERROR
            );
        }
    }

    private toProjectionEvent(projection: Projection, user: User): ProjectionEvent {
        let projectionEvent = new ProjectionEvent();
        projectionEvent.projectionId = projection.id;
        projectionEvent.year = projection.year;
        projectionEvent.eventData = projection;
        projectionEvent.createdBy = user.id;
        projectionEvent.createdAt = new Date();
        return projectionEvent;
    }

    private verifyProjectionValues(projectionData: any) {
        const gasTypes = ['bau', 'conditionalNdc', 'unconditionalNdc'];
        for (let key in projectionData) {
          if (typeof projectionData[key] === 'object') {
            if (!this.verifyProjectionValues(projectionData[key])) {
              return false;
            }
          } else {
            // Check if the value is a number and positive
            if (gasTypes.includes(key)) {
              if (typeof projectionData[key] === 'string') {
                throw new HttpException(this.helperService.formatReqMessagesString("ghgInventory.invalidDataType", []), HttpStatus.BAD_REQUEST);
              }
              if (typeof projectionData[key] === 'number' && projectionData[key] < 0) {
                throw new HttpException(this.helperService.formatReqMessagesString("ghgInventory.negativeValuesNotAllowed", []), HttpStatus.BAD_REQUEST);
              }
            }
      
          }
        }
        return true;
      }
}
