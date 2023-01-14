import { ConfigurationTarget, workspace } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";

type ExcludeListType = { [key: string]: boolean } | null;

export default async function resetExcludeList() {
  $LOG("Reset Exclude List", LOG_TYPES.SYSTEM);
  // This is a bit of a work-around to reset the exclude list
  // on start if check if we have a previous exclude list
  // if we do, then we reset the exclude list to the previous exclude list
  // before we proceed with the process.

  const res = workspace
    .getConfiguration("solo")
    .get<ExcludeListType>("initialExclude");

  if (res === null) {
    $LOG("no exclude list to reset");
    return Promise.resolve();
  } else {
    $LOG("resetting exclude list");
    await workspace
      .getConfiguration("files")
      .update("exclude", res, ConfigurationTarget.Workspace);
    return await workspace
      .getConfiguration("solo")
      .update("initialExclude", null, ConfigurationTarget.Workspace);
  }
}
