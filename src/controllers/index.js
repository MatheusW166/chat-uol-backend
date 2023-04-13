import MessagesController from "./messages.controller.js";
import ParticipantsController from "./participants.controller.js";
import StatusController from "./status.controller.js";
import db from "../adapters/index.js";

const participantsController = new ParticipantsController(db);
const messagesController = new MessagesController(db);
const statusController = new StatusController(db);

export { participantsController, messagesController, statusController };
