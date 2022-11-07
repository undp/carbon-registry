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
        this.driver = new QldbDriver(this.ledgerName);
        logger.log("Ledger init ", this.ledgerName)
    }

    // TODO: Handler session expire
    private async execute<TM>(sql, ...parameters: any[]): Promise<Result> {
        this.logger.debug('Statement', sql, 'parameter size', parameters.length)
        const resp = await this.driver.executeLambda(async (txn: TransactionExecutor) => {
            return txn.execute(sql, parameters) 
        });
        return resp;
    }

    public async insertRecord(document: Record<string, any>): Promise<void> {
        await (await this.execute(`INSERT INTO ${this.tableName} ?`, document));
    }
    
    public async fetchRecords<T extends Record<string, any>>(where: Record<string, any>): Promise<dom.Value[]> {
        const whereClause = where.keys().map(k => (`${k} = ?`)).join(',')
        return (await this.execute(`SELECT * FROM ${this.tableName} WHERE ${whereClause}`, ...where.values())).getResultList();
    }
    
    public async updateRecords(update: Record<string, any>,  where: Record<string, any>): Promise<void> {
        const whereClause = where.keys().map(k => (`${k} = ?`)).join(',')
        const updateClause = update.keys().map(k => (`${k} = ?`)).join(',')
        await this.execute(`UPDATE ${this.tableName} SET ${updateClause} WHERE ${whereClause}`, ...update.values(), ...where.values());
    };
}
