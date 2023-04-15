import dayjs from "dayjs";

function currentHHmmSS(format = "HH:mm:ss") {
  return dayjs(Date.now()).format(format);
}

export { currentHHmmSS };
