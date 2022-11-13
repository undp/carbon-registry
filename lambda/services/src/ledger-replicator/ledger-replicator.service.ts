import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../shared/entities/project.entity';
import { dom } from "ion-js";

const computeChecksums = true;
const REVISION_DETAILS = "REVISION_DETAILS";
const deagg = require('aws-kinesis-agg');

@Injectable()
export class LedgerReplicatorService {

    constructor(@InjectRepository(Project) private projectRepo: Repository<Project>, private logger: Logger) {

    }

    async processRecords(records) {
        await Promise.all(
            records.map(async (record) => {
                // Kinesis data is base64 encoded so decode here
                const payload = Buffer.from(record.data, "base64");

                // payload is the actual ion binary record published by QLDB to the stream
                const ionRecord = dom.load(payload);
                this.logger.log('ION Record', JSON.stringify(ionRecord))
                // Only process records where the record type is REVISION_DETAILS
                // if (JSON.parse(dom.dumpText(ionRecord.recordType)) !== REVISION_DETAILS) {
                //     console.log(`Skipping record of type ${ion.dumpPrettyText(ionRecord.recordType)}`);
                // } else {
                //     // process record
                // }
            })
        );
    }

    async promiseDeaggregate(record) {
        new Promise((resolve, reject) => {
            deagg.deaggregateSync(record, computeChecksums, (err, responseObject) => {
                if (err) {
                    //handle/report error
                    return reject(err);
                }
                return resolve(responseObject);
            });
        });
    }

    async replicate(event): Promise<any> {
        this.logger.log('Event received', JSON.stringify(event));
        await Promise.all(
            event.Records.map(async (kinesisRecord) => {
                const records = await this.promiseDeaggregate(kinesisRecord.kinesis);
                await this.processRecords(records);
            })
        );
    }
}
