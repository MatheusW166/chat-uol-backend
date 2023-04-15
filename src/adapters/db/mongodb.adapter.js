import { MongoClient } from "mongodb";

class MongoDbAdapter {
  constructor(config) {
    this.config = config;
    this.client = null;
    this.db = null;
  }

  connect = async () => {
    try {
      if (this.db) return;
      this.client = await MongoClient.connect(this.config.url);
      this.db = this.client.db();
    } catch (err) {
      this.db = null;
      this.client = null;
      throw Error(err.message);
    }
  };

  close = async () => {
    try {
      if (!this.client) return;
      await this.client.close();
      this.db = null;
      this.client = null;
    } catch (err) {
      throw Error(err.message);
    }
  };

  insertParticipant = async ({ name, lastStatus }) => {
    try {
      await this.connect();
      const collection = this.db.collection("participants");
      return await collection.insertOne({ name, lastStatus });
    } catch (err) {
      throw Error(err.message);
    }
  };

  findParticipant = async ({ name }) => {
    try {
      await this.connect();
      const collection = this.db.collection("participants");
      return await collection.findOne({ name });
    } catch (err) {
      throw Error(err.message);
    }
  };

  findAllParticipants = async () => {
    try {
      await this.connect();
      const collection = this.db.collection("participants");
      return await collection.find().toArray();
    } catch (err) {
      throw Error(err.message);
    }
  };

  findAllowedMessages = async ({ limit, name }) => {
    try {
      await this.connect();
      const collection = this.db.collection("messages");
      const result = collection.find({
        $or: [
          { from: name },
          { type: { $in: ["status", "message"] } },
          { to: { $in: [name, "Todos"] } },
        ],
      });
      if (limit) {
        return await result.limit(limit).toArray();
      }
      return await result.toArray();
    } catch (err) {
      throw Error(err.message);
    }
  };

  insertMessage = async ({ from, to, text, type, time }) => {
    try {
      await this.connect();
      const collection = this.db.collection("messages");
      return await collection.insertOne({
        from,
        to,
        text,
        type,
        time,
      });
    } catch (err) {
      throw Error(err.message);
    }
  };

  updateLastStatus = async ({ name, lastStatus }) => {
    try {
      await this.connect();
      const collection = this.db.collection("participants");
      return await collection.updateOne({ name }, { $set: { lastStatus } });
    } catch (err) {
      throw Error(err.message);
    }
  };
}

export default MongoDbAdapter;
