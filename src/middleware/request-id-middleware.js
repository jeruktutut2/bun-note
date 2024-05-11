import { v4 as uuidv4 } from 'uuid';

const setRequestId = async (c, next) => {
    c.req.requestId = uuidv4();
    await next()
}

export default {
    setRequestId
}