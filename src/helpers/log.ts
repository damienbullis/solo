const isDev = process.env?.NODE_ENV === "development";

const noOp = () => {};

export default {
  debug: isDev ? console.log.bind(console, "%c%s", "color: #D9ACF5") : noOp,
  info: isDev ? console.info.bind(console) : noOp,
  warn: isDev ? console.warn.bind(console) : noOp,
  group: isDev ? console.group.bind(console) : noOp,
  end: isDev ? console.group.bind(console) : noOp,
};
