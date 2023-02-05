import { $LOG, LOG_TYPES } from "../helpers";
import { inspectConfig, updateConfig } from "../helpers/inspectConfig";

export default async function () {
  $LOG("Initialize Reset Exclude", LOG_TYPES.SYSTEM);
  // initialExclude --> files.exclude
  const initialExclude = inspectConfig("solo.initialExclude");
  const exclude = inspectConfig("files.exclude");

  // if we have an initialExclude, we need to reset the files.exclude
  if (initialExclude !== false) {
    $LOG("Exclude being set to initialExclude", LOG_TYPES.SYSTEM_WARN, {
      setTo: initialExclude,
    });
    $LOG("InitializeReset Exclude List - Complete", LOG_TYPES.SYSTEM_SUCCESS);
    return await updateConfig("files.exclude", initialExclude);
  }

  // if we don't have an initialExclude, we need to reset the files.exclude
  if (exclude !== undefined) {
    $LOG("InitialExclude being set to exclude", LOG_TYPES.SYSTEM_WARN, {
      setTo: exclude,
    });
    $LOG("InitializeReset Exclude List - Complete", LOG_TYPES.SYSTEM_SUCCESS);
    return await updateConfig("solo.initialExclude", exclude);
  }
}
