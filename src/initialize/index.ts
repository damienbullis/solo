import initializeMode from "./mode";
import initialExcludeList from "./excludeList";
import initializeSoloList from "./soloList";
import resetExcludeList from "./resetExcludeList";
import { ExtensionContext, workspace } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";

export default async function (context: ExtensionContext) {
  $LOG("Initialize Extension", LOG_TYPES.SYSTEM);

  initializeMode();

  // initialExclude --> files.exclude
  await resetExcludeList();
  // files.exclude --> initialExclude
  await initialExcludeList();

  initializeSoloList();

  // check all the workspaces that are open
  const workspaceFolders = workspace.workspaceFolders;
  if (workspaceFolders === undefined) {
    $LOG("No workspace folders found", LOG_TYPES.SYSTEM_ERROR);
  } else {
    $LOG("Workspace Folders Found", LOG_TYPES.SYSTEM_WARN, {
      workspaceFolders,
    });
  }

  $LOG("Initialize Extension Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
