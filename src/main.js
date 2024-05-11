import hono from "./application/hono.js";
import mysqlUtil from "./utils/mysql-util.js";

mysqlUtil.mysqlPool = await mysqlUtil.newConnection()

Bun.serve({
    fetch: hono.fetch,
    port: Bun.env.APPLICATION_PORT,
})
console.log(new Date(), "hono: started");

[`SIGBREAK`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `SIGTERM`].forEach((eventType) => {
	process.on(eventType, () => {
        console.log(eventType, "stop process");
        mysqlUtil.mysqlConnection.end()
        console.log(new Date(), "mysql: closed connection");
        process.exit(0)
    });
});