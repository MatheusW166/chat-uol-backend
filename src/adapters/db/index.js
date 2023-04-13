import MongoDbAdapter from "./mongodb/mongodb.adapter.js";

const config = {
  url: process.env.DATABASE_URL,
};

const db = new MongoDbAdapter(config);
db.connect()
  .then(() => console.log("Connected to db"))
  .catch((err) => console.log(err));

export default db;
