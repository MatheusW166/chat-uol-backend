import express from "express";
import { config } from "dotenv";
config();
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT ?? 5000;
app.listen(PORT, () => console.log(`Running at PORT ${PORT}`));
