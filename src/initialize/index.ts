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

  // check all the workspaces that are open
  const workspaceFolders = workspace.workspaceFolders;
  if (workspaceFolders === undefined) {
    $LOG("No workspace folders found", LOG_TYPES.SYSTEM_ERROR);
  } else {
    $LOG("Workspace Folders Found", LOG_TYPES.SYSTEM_WARN, {
      workspaceFolders,
    });
  }

  // check if the workspace uri is set in the global settings.json
  //   - if so, dont change the workspace uri
  //   - if not, set the workspace uri to the current workspace uri
  // finally check for solod files for that workspace uri in global settings.json
  //   - this allows us to maintain continuous solod files across workspaces and sessions

  // At this point we have the workspace uri and the solod files for that workspace uri
  // We can now initialize the exclude list.

  // await resetExcludeList();
  // await initializeExcludeList();
  // initializeSoloList();
  $LOG("Initialize Extension Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
