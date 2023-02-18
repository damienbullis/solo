import { log, inspectConfig, updateConfig } from "../helpers";

export default async function () {
  log.group("Initialize Exclude & InitialExclude");
  // initialExclude --> files.exclude
  const initialExclude = inspectConfig("solo.initialExclude");
  const exclude = inspectConfig("files.exclude");

  // if we have an initialExclude, we need to reset the files.exclude
  if (initialExclude !== false) {
    log.debug("Exclude being set to initialExclude");
    log.info({
      setTo: initialExclude,
    });
    await updateConfig("files.exclude", initialExclude);
  } else {
    // if we don't have an initialExclude, we need to reset the files.exclude
    if (exclude !== undefined) {
      log.debug("InitialExclude being set to exclude");
      log.info({
        exclude,
      });
      await updateConfig("solo.initialExclude", exclude);
    }
  }
  log.end();
}
