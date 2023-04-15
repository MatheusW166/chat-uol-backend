import db from "../adapters/db/index.js";
import validationAdapter from "../adapters/validation/index.js";
import { currentHHmmSS } from "../utils/time.format.js";

class MessagesController {
  getMessages = async (req, res) => {
    const { user } = req.headers;
    const { limit } = req.query;
    const nameValidation = validationAdapter.validateString(user);
    const limitValidation = validationAdapter.validateLimit(limit);
    const errors = [...nameValidation.error, ...limitValidation.error];
    try {
      if (errors.length > 0) {
        return res.status(422).send(errors);
      }
      const messages = await db.findAllowedMessages({
        limit: limitValidation.value,
        name: nameValidation.value,
      });
      res.send(messages);
    } catch (err) {
      res.sendStatus(500);
    }
  };
  sendMessage = async (req, res) => {
    const { user } = req.headers;
    const message = { from: user, ...req.body };
    const { value, error } = validationAdapter.validateMessage(message);
    try {
      if (error.length > 0) {
        return res.status(422).send(error);
      }
      if (!(await db.findParticipant({ name: user }))) {
        return res.status(401).send("User not found");
      }
      const validMessage = {
        ...value,
        time: currentHHmmSS(),
      };
      await db.insertMessage(validMessage);
      res.status(201).send(validMessage);
    } catch (err) {
      res.sendStatus(500);
    }
  };
}

export default MessagesController;
