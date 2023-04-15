import db from "../adapters/db/index.js";
import { userLeftMessage } from "../utils/message.templates.js";

const DELETE_INACTIVE_INTERVAL = 15000;
const MAX_INACTIVE_TIME = 10000;

async function participantLeft({ _id, name }) {
  try {
    await db.deleteParticipant({ id: _id });
    await db.insertMessage(userLeftMessage({ userName: name }));
  } catch (err) {
    console.log(err);
  }
}

async function deleteInactive() {
  try {
    const inactives = await db.getInactiveParticipants({
      inactiveMilliSeconds: MAX_INACTIVE_TIME,
    });
    inactives.forEach(participantLeft);
  } catch (err) {
    console.log(err);
  }
}

export { deleteInactive, DELETE_INACTIVE_INTERVAL };
