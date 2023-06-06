import { Router } from "express";
import validateCakeInfo from "../middlewares/cakes.middlewares.js";
import cakeSchema from "../schemas/cakes.schemas.js";
import postCakesController from "../controllers.cakes.controllers.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", validateCakeInfo(cakeSchema), postCakesController);

export default cakesRouter;