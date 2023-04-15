import db from "../adapters/db/index.js";

const DELETE_INACTIVE_INTERVAL = 15000;
const MAX_INACTIVE_TIME = 10000;

function deleteInactive() {
  db.deleteInactiveParticipants({
    inactiveMilliSeconds: MAX_INACTIVE_TIME,
  })
    .then((result) => console.log(result))
    .catch((err) => console.log(err));
}

export { deleteInactive, DELETE_INACTIVE_INTERVAL };
