import initializeMode from "./mode";
import initializeExcludeList from "./excludeList";
import initializeSoloList from "./soloList";
import resetExcludeList from "./resetExcludeList";
import { ExtensionContext, workspace } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";

export default async function initializeExtension(context: ExtensionContext) {
  $LOG("initializeExtension", LOG_TYPES.SYSTEM);

  // set up listener on workspace config change on files.exclude
  // FIXME: not sure what to use this for yet or if needed...
  context.subscriptions.push(
    workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration(
          "solo.solodFiles",
          workspace.workspaceFolders?.[0].uri
        )
      ) {
        const res = workspace.getConfiguration("solo").get("solodFiles");
        console.log("solod files changed", res);
      }
    })
  );

  initializeMode();
  await resetExcludeList();
  await initializeExcludeList();
  initializeSoloList();
}
