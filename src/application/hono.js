import { Hono } from 'hono'
import tableController from "../controllers/table-controller.js";
import exceptionMiddleware from "../middleware/exception-middleware.js";
import requestIdMiddleware from "../middleware/request-id-middleware.js";

const app = new Hono()
app.use(requestIdMiddleware.setRequestId)
app.post("/table", tableController.create)
app.post("/table/create-with-tx", tableController.createWithTx)
app.onError(exceptionMiddleware.setException)

export default app