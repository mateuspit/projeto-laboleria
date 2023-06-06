import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import apiPort from "./constants/apiPort";
import router from "./routes/index.routes.js";

dotenv.config()

const app = express();

app.use(json());
app.use(cors());

app.use(router);

app.listen(apiPort, () => console.log(`Server running in port ${apiPort}`));