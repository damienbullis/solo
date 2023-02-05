import { $LOG, LOG_TYPES } from "../helpers";
import { inspectConfig, updateConfig } from "../helpers/inspectConfig";

export default async function () {
  $LOG("Initialize Exclude List", LOG_TYPES.SYSTEM);
  // files.exclude --> initialExclude
  // const exclude = inspectConfig("files.exclude");

  // if (exclude !== undefined) {
  //   $LOG("Exclude List", LOG_TYPES.SYSTEM_WARN, { exclude });
  //   await updateConfig("solo.initialExclude", exclude);
  // }

  $LOG("Exclude List Complete", LOG_TYPES.SYSTEM_SUCCESS);
  return Promise.resolve();
}
