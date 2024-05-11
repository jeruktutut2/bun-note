import mysql from 'mysql2/promise';

let mysqlPool
const newConnection = async () => {
    console.log(new Date(), "mysql: connecting to", Bun.env.MYSQL_HOST);
    const poolConfig = {
        host: Bun.env.MYSQL_HOST,
        user: Bun.env.MYSQL_USERNAME,
        password: Bun.env.MYSQL_PASSWORD,
        database: Bun.env.MYSQL_DATABASE,
        port: Bun.env.MYSQL_PORT,
        waitForConnections: true,
        connectionLimit: Bun.env.MYSQL_MAX_OPEN_CONNECTION,
        maxIdle: Bun.env.MYSQL_MAX_IDLE_CONNECTION, // max idle connections, the default value is the same as `connectionLimit`
        idleTimeout: Bun.env.MYSQL_CONNECTION_MAX_IDLETIME * 1000, // idle connections timeout, in milliseconds, the default value 60000
        queueLimit: 0,
        enableKeepAlive: true,
        keepAliveInitialDelay: 0,
    }
    console.log(new Date(), "mysql: connected to", Bun.env.MYSQL_HOST);
    return mysql.createPool(poolConfig);
}

export default {
    mysqlPool,
    newConnection
}