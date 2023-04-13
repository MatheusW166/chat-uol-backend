import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import router from "./routes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`Running at PORT ${PORT}`));
