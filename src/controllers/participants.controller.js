import validationAdapter from "../adapters/validation/index.js";
import { userJoinMessage } from "../utils/message.templates.js";
import db from "../adapters/db/index.js";

class ParticipantsController {
  joinUser = async (req, res) => {
    const { name } = req.body;
    const { value, error } = validationAdapter.validateString(name);
    try {
      if (error.length > 0) {
        return res.sendStatus(422);
      }
      if (await db.findParticipant({ name: value })) {
        return res.sendStatus(409);
      }
      await db.insertParticipant({
        name: value,
        lastStatus: Date.now(),
      });
      await db.insertMessage(userJoinMessage({ userName: value }));
      res.sendStatus(201);
    } catch (err) {
      res.sendStatus(500);
    }
  };
  getParticipants = async (_, res) => {
    try {
      const participants = await db.findAllParticipants();
      res.send(participants);
    } catch (err) {
      res.sendStatus(500);
    }
  };
}

export default ParticipantsController;
