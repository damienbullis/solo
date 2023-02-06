import { $LOG, LOG_TYPES, inspectConfig, updateConfig } from "../helpers";

export default async function () {
  $LOG("Initialize Exclude", LOG_TYPES.SYSTEM);
  // initialExclude --> files.exclude
  const initialExclude = inspectConfig("solo.initialExclude");
  const exclude = inspectConfig("files.exclude");

  // if we have an initialExclude, we need to reset the files.exclude
  if (initialExclude !== false) {
    $LOG("Exclude being set to initialExclude", LOG_TYPES.SYSTEM_WARN, {
      setTo: initialExclude,
    });
    await updateConfig("files.exclude", initialExclude);
  } else {
    // if we don't have an initialExclude, we need to reset the files.exclude
    if (exclude !== undefined) {
      $LOG("InitialExclude being set to exclude", LOG_TYPES.SYSTEM_WARN, {
        setTo: exclude,
      });
      await updateConfig("solo.initialExclude", exclude);
    }
  }
  $LOG("Initialize Exclude List - Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
