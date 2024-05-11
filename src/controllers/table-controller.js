import tableService from "../services/table-service.js";
import { HTTPException } from 'hono/http-exception'

const create = async (c) => {
    try {
        const result = await tableService.create(c.req.requestId)
        c.status(201)
        return c.json({
            data: result,
            error: ""
        })
    } catch (error) {
        throw new HTTPException(error.getResponse().status, { message: error.message })
    }
}

const createWithTx = async (c) => {
    try {
        const result = tableService.createWithTx(c.req.requestId)
        c.status(201)
        return c.json({
            data: result,
            error: ""
        })
    } catch (error) {
        console.log("error controller:", error);
        // throw new HTTPException(error.getResponse().status, { message: error.message })
    }
}

export default {
    create,
    createWithTx
}