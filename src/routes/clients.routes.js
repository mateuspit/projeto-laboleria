import { Router } from "express";
import clientSchema from "../schemas/clients.schemas.js";
import validateClientInfo from "../middlewares/clients.middlewares.js";
import { postClientsController } from "../controllers/clients.controllers.js";

const clientsRouter = Router();

clientsRouter.post("/clients", validateClientInfo(clientSchema), postClientsController);

export default clientsRouter;
