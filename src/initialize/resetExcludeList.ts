import { $LOG, LOG_TYPES } from "../helpers";
import { inspectConfig, updateConfig } from "../helpers/inspectConfig";

export default function () {
  $LOG("Initialize Reset Exclude List", LOG_TYPES.SYSTEM);
  // initialExclude --> files.exclude
  const initialExclude = inspectConfig("solo.initialExclude");
  const filesExclude = inspectConfig("files.exclude");

  $LOG("Reset Exclude List", LOG_TYPES.SYSTEM_WARN, { initialExclude });
  // if we have an initialExclude, we need to reset the files.exclude
  if (initialExclude !== false) {
    return updateConfig("files.exclude", initialExclude);
  }

  if (filesExclude !== undefined) {
    // if we don't have an initialExclude, we need to reset the files.exclude
    return updateConfig("solo.initialExclude", filesExclude);
  }

  $LOG("Reset Exclude List Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
