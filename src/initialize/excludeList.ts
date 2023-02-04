import { $LOG, LOG_TYPES } from "../helpers";
import { inspectConfig, updateConfig } from "../helpers/inspectConfig";

export default async function () {
  $LOG("Initialize Exclude List", LOG_TYPES.SYSTEM);

  // get the current exclude list
  // Do we need to check this here?
  const filesExclude = inspectConfig("files.exclude");

  if (filesExclude === null) {
    $LOG("no exclude list found", LOG_TYPES.SYSTEM_WARN); // Early return
    return Promise.resolve();
  }

  // get the current soloMode
  const soloMode = inspectConfig("solo.soloMode");

  if (soloMode === null) {
    $LOG("no solo mode found", LOG_TYPES.SYSTEM_ERROR); // Early return
    return Promise.resolve();
  }

  if (soloMode) {
    $LOG("solo mode is true, setting exclude list to {}");

    updateConfig("files.exclude", {});
  } else {
    $LOG("solo mode is false, setting exclude list to initial exclude list");

    const initialExclude = inspectConfig("solo.initialExclude");

    if (initialExclude === null) {
      $LOG("no initial exclude to set");
    } else {
      $LOG("files exclude set to initial exclude", LOG_TYPES.SYSTEM_SUCCESS);

      updateConfig("files.exclude", initialExclude);
    }
  }
  return Promise.resolve();
}
