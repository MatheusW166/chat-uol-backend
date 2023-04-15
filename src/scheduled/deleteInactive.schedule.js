import db from "../adapters/db/index.js";

const DELETE_INACTIVE_TIME = 15000;

function deleteInactive() {
  console.log("Executing");
}

export { deleteInactive, DELETE_INACTIVE_TIME };
