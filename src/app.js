import express, { json } from "express";
import cors from "cors";
import router from "./routes.js";

const app = express();

app.use(json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`Running at PORT ${PORT}`));
