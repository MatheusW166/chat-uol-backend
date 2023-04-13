import { MongoClient } from "mongodb";

class MongoDbAdapter {
  constructor(config) {
    this.config = config;
    this.client = null;
    this.db = null;
  }

  async connect() {
    try {
      if (this.db) return;
      this.client = await MongoClient.connect(this.config.url);
      this.db = this.client.db();
    } catch (err) {
      this.db = null;
      this.client = null;
      throw Error(err.message);
    }
  }

  async close() {
    try {
      if (!this.client) return;
      await this.client.close();
      this.db = null;
      this.client = null;
    } catch (err) {
      throw Error(err.message);
    }
  }
}

export default MongoDbAdapter;
