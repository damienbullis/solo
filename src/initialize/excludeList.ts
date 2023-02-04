import { $LOG, LOG_TYPES } from "../helpers";
import { inspectConfig, updateConfig } from "../helpers/inspectConfig";

export default async function () {
  $LOG("Initialize Exclude List", LOG_TYPES.SYSTEM);
  // files.exclude --> initialExclude
  const exclude = inspectConfig("files.exclude");

  if (exclude === null) {
    $LOG("No exclude list found", LOG_TYPES.SYSTEM_SUCCESS); // Early return
    return Promise.resolve();
  }

  updateConfig("solo.initialExclude", exclude);

  $LOG("Exclude List Complete", LOG_TYPES.SYSTEM_SUCCESS);
  return Promise.resolve();
}
