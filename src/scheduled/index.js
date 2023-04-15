import {
  deleteInactive,
  DELETE_INACTIVE_INTERVAL,
} from "./deleteInactive.schedule.js";

function scheduledTasks() {
  setInterval(deleteInactive, DELETE_INACTIVE_INTERVAL);
}

export default scheduledTasks;
