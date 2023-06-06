import cors from "cors";
import express, { json } from "express";
import dotenv from "dotenv";
import apiPort from "./constants/apiPort.js";
import router from "./routes/index.routes.js";

dotenv.config()

const app = express();

app.use(json());
app.use(cors());

app.use(router);

app.listen(apiPort, () => console.log(`Server running in port ${apiPort}`));