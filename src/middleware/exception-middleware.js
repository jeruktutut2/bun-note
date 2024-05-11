import { HTTPException } from 'hono/http-exception'

const setException = async (err, c) => {
    if (err instanceof HTTPException) {
        c.status(err.getResponse().status)
        return c.json({
            data: "",
            error: err.message
        })
    }
}

export default {
    setException
}