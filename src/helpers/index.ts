import store from "../store";

export type LogType = "INFO" | "WARN" | "SYSTEM" | "STORE";

export const LOG_TYPES = {
  INFO: "INFO",
  WARN: "WARN",
  SYSTEM: "SYSTEM",
  STORE: "STORE",
} as const;

const colors = {
  [LOG_TYPES.INFO]: "color: #B2B2B2",
  [LOG_TYPES.WARN]: "color: #FFB26B",
  [LOG_TYPES.SYSTEM]: "color: #00ABB3",
  [LOG_TYPES.STORE]: "color: #FF0032",
};

const logLevels = {
  INFO: true,
  WARN: true,
  SYSTEM: false,
  STORE: false,
};

export const $LOG = (
  msg: string,
  type: LogType = "INFO",
  ...additional: any[]
) => {
  // check the store of the log levels we want to see
  // if the log level is not in the store, then we don't log it
  let triggerAdditional = false;
  switch (type) {
    case LOG_TYPES.WARN:
      if (logLevels.WARN) {
        console.log(`%c${msg}`, colors[LOG_TYPES.WARN]);
        triggerAdditional = true;
      }
      break;
    case LOG_TYPES.SYSTEM:
      if (logLevels.SYSTEM) {
        console.log(`%c${msg}`, colors[LOG_TYPES.SYSTEM]);
        triggerAdditional = true;
      }
      break;
    case LOG_TYPES.STORE:
      if (logLevels.STORE) {
        console.log(`%c${msg}`, colors[LOG_TYPES.STORE]);
        triggerAdditional = true;
      }
      break;
    case LOG_TYPES.INFO:
    default:
      if (logLevels.INFO) {
        console.log(`%c${msg}`, colors[LOG_TYPES.INFO]);
        triggerAdditional = true;
      }
      break;
  }
  if (additional.length && triggerAdditional) {
    console.log(...additional);
  }
};
