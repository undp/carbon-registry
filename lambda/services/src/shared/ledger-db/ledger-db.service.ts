import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QldbDriver, Result, TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { dom } from "ion-js";

@Injectable()
export class LedgerDbService {

    private tableName: string;
    private ledgerName: string;
    private driver: QldbDriver;

    constructor(private readonly logger: Logger, private readonly configService: ConfigService) {
        this.ledgerName = configService.get<string>('ledger.name')
        this.tableName = configService.get<string>('ledger.table')
        logger.log("Ledger init ", this.ledgerName)
    }

    // TODO: Handler session expire
    private async execute<TM>(sql, ...parameters: any[]): Promise<Result> {
        this.logger.debug(`Statement: ${sql}, parameter: ${JSON.stringify(parameters)}`)
        this.driver = new QldbDriver(this.ledgerName);
        const resp = await this.driver.executeLambda(async (txn: TransactionExecutor) => {
            if (parameters.length > 0) {
                return await txn.execute(sql, ...parameters) 
            } else {
                return await txn.execute(sql) 
            }
                
        });
        this.logger.debug('Response', JSON.stringify(resp))
        this.driver.close()
        return resp;
    }

    public async createTable(): Promise<void> {
        await (await this.execute(`create table ${this.tableName}`));
    }

    public async createIndex(indexCol: string): Promise<void> {
        await (await this.execute(`create index on ${this.tableName} (${indexCol})`));
    }

    public async insertRecord(document: Record<string, any>): Promise<void> {
        await (await this.execute(`INSERT INTO ${this.tableName} ?`, document));
    }
    
    public async fetchRecords(where: Record<string, any>): Promise<dom.Value[]> {
        const whereClause = Object.keys(where).map(k => (`${k} = ?`)).join(' and ')
        return (await this.execute(`SELECT * FROM ${this.tableName} WHERE ${whereClause}`, ...Object.values(where)))?.getResultList();
    }

    public async fetchHistory(where: Record<string, any>): Promise<dom.Value[]> {
        const whereClause = Object.keys(where).map(k => (`h.data.${k} = ?`)).join(' and ')
        const x = (await this.execute(`SELECT * FROM history(${this.tableName}) as h WHERE ${whereClause}`, ...Object.values(where)))?.getResultList();
        console.log('Results', x)
        return x
    }
    
    public async updateRecords(update: Record<string, any>,  where: Record<string, any>): Promise<dom.Value[]> {
        const whereClause = Object.keys(where).map(k => (`${k} = ?`)).join(' and ')
        const updateClause = Object.keys(update).map(k => (`${k} = ?`)).join(',')
        return (await this.execute(`UPDATE ${this.tableName} SET ${updateClause} WHERE ${whereClause}`, ...Object.values(update), ...Object.values(where)))?.getResultList();
    };
}
