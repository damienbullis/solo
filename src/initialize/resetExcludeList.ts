import { $LOG, LOG_TYPES } from "../helpers";
import { inspectConfig, updateConfig } from "../helpers/inspectConfig";

export default async function () {
  $LOG("Initialize Reset Exclude List", LOG_TYPES.SYSTEM);

  const initialExclude = inspectConfig("solo.initialExclude");

  if (initialExclude === null) {
    $LOG("failed to retrieve initial exclude", LOG_TYPES.SYSTEM_ERROR); // Early return
    return Promise.resolve();
  }

  if (initialExclude === false) {
    $LOG("initial exclude list is empty, nothing to reset");
  } else {
    updateConfig("files.exclude", initialExclude);
    updateConfig("solo.initialExclude", false);
  }

  $LOG("Reset Exclude List Complete", LOG_TYPES.SYSTEM_SUCCESS);
  return Promise.resolve();
}
