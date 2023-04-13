import { MongoClient } from "mongodb";

class MongoDbAdapter {
  constructor(config) {
    this.config = config;
    this.client = null;
    this.db = null;
  }
}

export default MongoDbAdapter;
