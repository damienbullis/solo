export const LOG_TYPES = {
  INFO: "INFO",
  STORE: "STORE",
  SYSTEM: "SYSTEM",
  SYSTEM_WARN: "SYSTEM_WARN",
  SYSTEM_ERROR: "SYSTEM_ERROR",
  SYSTEM_SUCCESS: "SYSTEM_SUCCESS",
} as const;

const colors = {
  [LOG_TYPES.INFO]: "color: #FFF9F9",
  [LOG_TYPES.STORE]: "color: #D9ACF5",
  [LOG_TYPES.SYSTEM]: "color: #00ABB3",
  [LOG_TYPES.SYSTEM_WARN]: "color: #FD841F",
  [LOG_TYPES.SYSTEM_ERROR]: "color: #FF0032",
  [LOG_TYPES.SYSTEM_SUCCESS]: "color: #03C988",
};

const logLevels = {
  INFO: true,
  STORE: false,
  SYSTEM: true,
  SYSTEM_WARN: true,
  SYSTEM_ERROR: true,
  SYSTEM_SUCCESS: true,
};

export const $LOG = (
  msg: string,
  type: keyof typeof LOG_TYPES = "INFO",
  ...additional: any[]
) => {
  // check the store of the log levels we want to see
  // if the log level is not in the store, then we don't log it
  let triggerAdditional = false;
  switch (type) {
    case LOG_TYPES.SYSTEM_WARN:
      if (logLevels.SYSTEM_WARN) {
        console.log(`%c${msg}`, colors[LOG_TYPES.SYSTEM_WARN]);
        triggerAdditional = true;
      }
      break;
    case LOG_TYPES.SYSTEM_ERROR:
      if (logLevels.SYSTEM_ERROR) {
        console.log(`%c${msg}`, colors[LOG_TYPES.SYSTEM_ERROR]);
        triggerAdditional = true;
      }
      break;
    case LOG_TYPES.SYSTEM_SUCCESS:
      if (logLevels.SYSTEM_SUCCESS) {
        console.log(`%c${msg}`, colors[LOG_TYPES.SYSTEM_SUCCESS]);
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
    // only show additional if we the log level is in the store (visible)
    console.log(...additional);
  }
};
