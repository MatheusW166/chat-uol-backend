import MongoDbAdapter from "./mongodb.adapter.js";
import dotenv from "dotenv";
dotenv.config();

const config = {
  url: process.env.DATABASE_URL,
};

const db = new MongoDbAdapter(config);

export default db;
