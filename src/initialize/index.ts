import initializeMode from "./mode";
import initializeExcludeList from "./excludeList";
import initializeSoloList from "./soloList";
import { ExtensionContext, workspace } from "vscode";
import store from "../store";

export default function initializeExtension(context: ExtensionContext) {
  // set up listener on workspace config change on files.exclude
  context.subscriptions.push(
    workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration(
          "files.exclude",
          workspace.workspaceFolders?.[0].uri
        )
      ) {
        console.log("files.exclude changed", { store });
      }
    })
  );

  initializeMode();
  initializeExcludeList();
  initializeSoloList();
}
