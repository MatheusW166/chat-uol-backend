import MessagesController from "./messages.controller.js";
import ParticipantsController from "./participants.controller.js";
import StatusController from "./status.controller.js";

const participantsController = new ParticipantsController();
const messagesController = new MessagesController();
const statusController = new StatusController();

export { participantsController, messagesController, statusController };
