import { currentHHmmSS } from "./time.format.js";

function userJoinMessage({ userName }) {
  return {
    from: userName,
    to: "Todos",
    text: "entra na sala...",
    type: "status",
    time: currentHHmmSS(),
  };
}

function userLeftMessage({ userName }) {
  return {
    from: userName,
    to: "Todos",
    text: "sai da sala...",
    type: "status",
    time: currentHHmmSS(),
  };
}

export { userJoinMessage, userLeftMessage };
