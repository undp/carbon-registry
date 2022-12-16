import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { QldbDriver, Result, TransactionExecutor } from "amazon-qldb-driver-nodejs";
import { dom } from "ion-js";

@Injectable()
export class LedgerDbService {

    public tableName: string;
    public overallTableName: string;
    private ledgerName: string;
    private driver: QldbDriver;

    constructor(private readonly logger: Logger, private readonly configService: ConfigService) {
        this.ledgerName = configService.get<string>('ledger.name')
        this.tableName = configService.get<string>('ledger.table')
        this.overallTableName = configService.get<string>('ledger.overallTable')
        logger.log("Ledger init ", this.ledgerName)
    }

    // TODO: Handler session expire
    public async execute<TM>(sql, ...parameters: any[]): Promise<Result> {
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

    public async createTable(tableName?: string): Promise<void> {
        await (await this.execute(`create table ${tableName ? tableName : this.tableName}`));
    }

    public async createIndex(indexCol: string, tableName?: string): Promise<void> {
        await (await this.execute(`create index on ${tableName ? tableName : this.tableName} (${indexCol})`));
    }

    public async insertRecord(document: Record<string, any>, tableName?: string): Promise<void> {
        await (await this.execute(`INSERT INTO ${tableName ? tableName : this.tableName} ?`, document));
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

    public async getAndUpdateTx<TM>(getQueries: Record<string, Record<string, any>>, processGetFn: (results: Record<string, dom.Value[]>) => [Record<string, any>, Record<string, any>]): Promise<Record<string, dom.Value[]>> {
        this.logger.debug(``)
        this.driver = new QldbDriver(this.ledgerName);
        const resp = await this.driver.executeLambda(async (txn: TransactionExecutor) => {
            const getResults = {}
            for (const t in getQueries) {
                if (getQueries.hasOwnProperty(t)) {
                    const wc = Object.keys(getQueries[t]).map(k => (`${k} = ?`)).join(' and ')
                    const r = (await this.execute(`SELECT * FROM ${t} WHERE ${wc}`, ...Object.values(getQueries[t])))?.getResultList();
                    getResults[t] = r;
                }
            }
            const [update,  updateWhere] = processGetFn(getResults);
            const updateResults = {}
            for (const t in update) {
                if (update.hasOwnProperty(t) && updateWhere.hasOwnProperty(t)) {
                    const whereClause = Object.keys(updateWhere[t]).map(k => (`${k} = ?`)).join(' and ')
                    const updateClause = Object.keys(update[t]).map(k => (`${k} = ?`)).join(',')
                    updateResults[t] = (await this.execute(`UPDATE ${t} SET ${updateClause} WHERE ${whereClause}`, ...Object.values(update[t]), ...Object.values(updateWhere[t])))?.getResultList();
                }
            }
            return updateResults;
        });
        this.logger.debug('Response', JSON.stringify(resp))
        this.driver.close()
        return resp;
    }

}
