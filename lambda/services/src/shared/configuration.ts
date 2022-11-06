export default () => ({
    stage: process.env.STAGE || 'NONE',
    database: {
        type: 'postgres',
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT) || 3306,
        username: process.env.DB_HOST || 'root',
        password: process.env.DB_HOST || 'root',
        database: (process.env.DB_HOST || 'carbon') + '-' + process.env.NODE_ENV,
        synchronize: process.env.NODE_ENV == 'dev' ? true : false,
        autoLoadEntities: true,
    }
});