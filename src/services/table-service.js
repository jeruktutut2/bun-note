import table1Repository from "../repositories/table1-repository.js";
import table2Repository from "../repositories/table2-repository.js";
import table3Repository from "../repositories/table3-repository.js";
import mysqlUtil from "../utils/mysql-util.js";
import { HTTPException } from 'hono/http-exception'
import logHelper from "../helper/log-helper.js";

const create = async (requestId) => {
    let connection
    try {
        connection = await mysqlUtil.mysqlPool.getConnection();
        const table1Result = await table1Repository.create(connection)
        const table2Result = await table2Repository.create(connection)
        const table3Result =  await table3Repository.create(connection)
        return "successfully created"
    } catch (error) {
        logHelper.printToTerminal(error, requestId)
        throw new HTTPException(500, { message: 'internal server error' })
    } finally {
        if (connection) {
            connection.release()
        }
    }
}

const createWithTx = async (requestId) => {
    let connection
    try {
        connection = await mysqlUtil.mysqlPool.getConnection();
        await connection.beginTransaction()
        const table1Result = await table1Repository.create(connection)
        const table2Result = await table2Repository.create(connection)
        const table3Result =  await table3Repository.create(connection)
        await connection.commit()
        return "successfully created with tx"
    } catch (error) {
        logHelper.printToTerminal(error, requestId)
        if (connection) {
            await connection.rollback()
        }
        // there is an error when go to this, i dont know why, coz same code (above) run well but not this
        throw new HTTPException(500, { message: 'internal server error' })
    } finally {
        if (connection) {
            connection.release()
        }
    }
}

export default {
    create,
    createWithTx
}