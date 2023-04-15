import {
  deleteInactive,
  DELETE_INACTIVE_TIME,
} from "./deleteInactive.schedule.js";

function scheduledTasks() {
  setInterval(deleteInactive, DELETE_INACTIVE_TIME);
}

export default scheduledTasks;
