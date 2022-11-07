export default () => ({
    stage: process.env.STAGE || 'NONE',
    database: {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 5432,
        username: process.env.DB_HOST || 'hquser',
        password: process.env.DB_PASSWORD || '',
        database: (process.env.DB_NAME || 'carbon') + (process.env.NODE_ENV || 'dev'),
        synchronize: process.env.NODE_ENV == 'prod' ? false : true,
        autoLoadEntities: true,
    },
    jwt: {
        userSecret: process.env.USER_JWT_SECRET || '1324',
        adminSecret: process.env.ADMIN_JWT_SECRET || '8654',
    },
    ledger: {
        name: 'carbon-registry-' + (process.env.NODE_ENV || 'dev'),
        table: 'projects'
    }
});