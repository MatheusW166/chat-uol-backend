import MongoDbAdapter from "./mongodb/mongodb.adapter.js";

const config = {
  url: process.env.DATABASE_URL,
};

const db = MongoDbAdapter(config);
export default db;
