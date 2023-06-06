import { Router } from "express";
import orderSchema from "../schemas/orders.schemas.js";
import validateOrderInfo from "../middlewares/orders.middlewares.js";
import { postOrdersController } from "../controllers/orders.controllers.js";

const ordersRouter = Router();

ordersRouter.post("/order", validateOrderInfo(orderSchema), postOrdersController);

export default ordersRouter;