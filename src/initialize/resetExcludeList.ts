import { ConfigurationTarget, workspace } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";

type ExcludeListType = { [key: string]: boolean } | null;

export default async function resetExcludeList() {
  $LOG("Reset Exclude List", LOG_TYPES.SYSTEM);
  // This is a bit of a work-around to reset the exclude list
  // on start if check if we have a previous exclude list
  // if we do, then we reset the exclude list to the previous exclude list
  // before we proceed with the process.

  // Check if we have a previous exclude list
  const checkInitialExclude = workspace
    .getConfiguration("solo")
    .get<ExcludeListType>("initialExclude");

  if (checkInitialExclude === null) {
    // If we don't have a previous exclude list
    $LOG("no exclude list to reset");
  } else {
    // If we do have a previous exclude list
    $LOG("resetting exclude list");

    // then we reset the exclude list to the previous exclude list
    await workspace
      .getConfiguration("files")
      .update("exclude", checkInitialExclude, ConfigurationTarget.Global);

    // and we remove the previous exclude list
    await workspace
      .getConfiguration("solo")
      .update("initialExclude", null, ConfigurationTarget.Global);
  }

  $LOG("Reset Exclude List Complete", LOG_TYPES.SYSTEM_SUCCESS);

  return Promise.resolve();
}
