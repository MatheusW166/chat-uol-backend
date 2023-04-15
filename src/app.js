import express, { json } from "express";
import scheduledTasks from "./scheduled/index.js";
import router from "./routes.js";
import cors from "cors";

const app = express();

app.use(json());
app.use(cors());
app.use(router);

// scheduledTasks();

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Running at ${PORT}`));
