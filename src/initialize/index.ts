import initializeMode from "./mode";
import initializeExcludeList from "./excludeList";
import initializeSoloList from "./soloList";
import { commands, ExtensionContext, workspace } from "vscode";

export default async function initializeExtension(context: ExtensionContext) {
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
  await initializeExcludeList();
  initializeSoloList();
}
