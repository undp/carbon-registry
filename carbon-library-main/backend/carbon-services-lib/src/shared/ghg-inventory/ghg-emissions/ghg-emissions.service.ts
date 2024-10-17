import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { EmissionDto } from 'src/shared/dto/emission.dto';
import { Emission } from 'src/shared/entities/emission.entity';
import { instanceToPlain, plainToClass } from "class-transformer";
import { User } from 'src/shared/entities/user.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, QueryFailedError, Repository } from 'typeorm';
import { HelperService } from 'src/shared/util/helpers.service';
import { FileHandlerInterface } from 'src/shared/file-handler/filehandler.interface';
import { ConfigService } from '@nestjs/config';
import { GHGRecordState } from 'src/shared/enum/ghg.record.state.enum';
import { CompanyRole } from 'src/shared/enum/company.role.enum';
import { EmissionEvent } from 'src/shared/entities/emission.event.entity';

@Injectable()
export class GhgEmissionsService {

    constructor(
        private logger: Logger,
        @InjectEntityManager() private entityManager: EntityManager,
        @InjectRepository(Emission) private emissionRepo: Repository<Emission>,
        private helperService: HelperService,
        private fileHandler: FileHandlerInterface,
        private configService: ConfigService,
    ) { };

    async create(emissionDto: EmissionDto, user: User): Promise<{ status: HttpStatus; data: Emission } | undefined> {
        if (user.companyRole !== CompanyRole.MINISTRY && user.companyRole !== CompanyRole.GOVERNMENT) {
            throw new HttpException(
                this.helperService.formatReqMessagesString("user.userUnAUth", []),
                HttpStatus.FORBIDDEN
            );
        }
        let version: number = 1;
        this.logger.verbose("ProgrammeDTO received", JSON.stringify(emissionDto));
        const emission: Emission = this.toEmission(emissionDto);
        this.logger.verbose("Emission  create", JSON.stringify(emission));
        this.verifyEmissionValues(emission);

        let savedEmission: Emission;
        const result = await this.getEmissionByYear(emission.year);

        if (result && result.length > 0) {
            if (result[0].state === GHGRecordState.FINALIZED) {
                throw new HttpException(
                    this.helperService.formatReqMessagesString("ghgInventory.cannotEditEmissionFinalized", []),
                    HttpStatus.FORBIDDEN
                );
            }
            if (emissionDto.state === GHGRecordState.FINALIZED && user.companyRole !== CompanyRole.GOVERNMENT) {
                throw new HttpException(
                    this.helperService.formatReqMessagesString("user.userUnAUth", []),
                    HttpStatus.FORBIDDEN
                );
            }

            if (emissionDto.version !== result[0].version) {
                throw new HttpException(
                    this.helperService.formatReqMessagesString("ghgInventory.notTheLatestVersion", []),
                    HttpStatus.CONFLICT
                );
            }

            const version = result[0].version + 1;
            emission.id = result[0]?.id;
            if (emissionDto.emissionDocument) {
                emission.emissionDocument = await this.uploadDocument(
                    emissionDto.year,
                    version,
                    emissionDto.emissionDocument
                );
            }

            savedEmission = await this.entityManager
                .transaction(async (em) => {
                    const updatedData = await em.update<Emission>(Emission, {
                        id: emission.id,
                    },
                        {
                            energyEmissions: emission.energyEmissions,
                            industrialProcessesProductUse: emission.industrialProcessesProductUse,
                            agricultureForestryOtherLandUse: emission.agricultureForestryOtherLandUse,
                            waste: emission.waste,
                            other: emission.other,
                            totalCo2WithoutLand: emission.totalCo2WithoutLand,
                            totalCo2WithLand: emission.totalCo2WithLand,
                            state: emission.state,
                            emissionDocument: emission.emissionDocument,
                            version: version,
                            updatedAt: new Date(),
                            remarks: emission.remarks
                        });
                    await em.save<EmissionEvent>(this.toEmissionEvent(emission, user));
                    return updatedData;
                })
                .catch((err: any) => {
                    console.log(err);
                    if (err instanceof QueryFailedError) {
                        throw new HttpException(this.helperService.formatReqMessagesString("ghgInventory.emissionUpdateFailed", []), HttpStatus.BAD_REQUEST);
                    } else {
                        this.logger.error(`Emission updating error ${err}`);
                    }
                    return err;
                });

            return { status: HttpStatus.OK, data: savedEmission };
        }

        const createdDate = new Date();
        emission.country = this.configService.get("systemCountryName");
        emission.version = version;
        emission.createdAt = createdDate;
        emission.updatedAt = createdDate;
        if (emissionDto.emissionDocument) {
            emission.emissionDocument = await this.uploadDocument(
                emissionDto.year,
                emission.version,
                emissionDto.emissionDocument

            );
        }
        savedEmission = await this.entityManager
            .transaction(async (em) => {
                const savedData = await em.save<Emission>(emission);
                await em.save<EmissionEvent>(this.toEmissionEvent(savedData, user));
                return savedData;
            })
            .catch((err: any) => {
                console.log(err);
                if (err instanceof QueryFailedError) {
                    throw new HttpException(this.helperService.formatReqMessagesString("ghgInventory.emissionSaveFailed", []), HttpStatus.BAD_REQUEST);
                } else {
                    this.logger.error(`Emission add error ${err}`);
                }
                return err;
            });

        return { status: HttpStatus.CREATED, data: savedEmission };
    }

    getEmissionByYear = async (year: string) => {
        return await this.emissionRepo.find({
            where: {
                year: year,
                country: this.configService.get("systemCountryName"),
            },
        });
    }

    async getAllEmissions(user: User) {
        if (user.companyRole !== CompanyRole.MINISTRY && user.companyRole !== CompanyRole.GOVERNMENT) {
            return await this.emissionRepo.find({
                where: {
                    state: GHGRecordState.FINALIZED,
                },
                order: { state: 'ASC', year: "DESC", }
            });
        }
        return await this.emissionRepo.find({ order: { state: 'ASC', year: "DESC", } });
    }

    private toEmission(emissionDto: EmissionDto): Emission {
        const data = instanceToPlain(emissionDto);
        this.logger.verbose("Converted emissionDto to Emission entity", JSON.stringify(data));
        return plainToClass(Emission, data);
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

    private verifyEmissionValues(emissionData: any) {
        const gasTypes = ['co2', 'ch4', 'n2o', 'co2eq'];
        for (let key in emissionData) {
          if (typeof emissionData[key] === 'object') {
            if (!this.verifyEmissionValues(emissionData[key])) {
              return false;
            }
          } else {
            // Check if the value is a number and positive
            if (gasTypes.includes(key)) {
              if (typeof emissionData[key] === 'string') {
                throw new HttpException(this.helperService.formatReqMessagesString("ghgInventory.invalidDataType", []), HttpStatus.BAD_REQUEST);
              }
              if (typeof emissionData[key] === 'number' && emissionData[key] < 0) {
                throw new HttpException(this.helperService.formatReqMessagesString("ghgInventory.negativeValuesNotAllowed", []), HttpStatus.BAD_REQUEST);
              }
            }
      
          }
        }
        return true;
      }

    private toEmissionEvent(emission: Emission, user: User): EmissionEvent {
        let emissionEvent = new EmissionEvent();
        emissionEvent.emissionId = emission.id;
        emissionEvent.year = emission.year;
        emissionEvent.eventData = emission;
        emissionEvent.createdBy = user.id;
        emissionEvent.createdAt = new Date();
        return emissionEvent;
    }
}

