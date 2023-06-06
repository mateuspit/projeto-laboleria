import { Router } from "express";
import { validateCakeInfo, validateFlavourInfo } from "../middlewares/cakes.middlewares.js";
import { cakeSchema, flavourSchema } from "../schemas/cakes.schemas.js";
import { postCakesController, postFlavoursController } from "../controllers/controllers.cakes.controllers.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", validateCakeInfo(cakeSchema), postCakesController);
cakesRouter.post("/flavours", validateFlavourInfo(flavourSchema), postFlavoursController);

export default cakesRouter;