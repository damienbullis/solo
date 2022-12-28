import initializeMode from "./mode";
import initializeExcludeList from "./excludeList";
import initializeSoloList from "./soloList";
import { ConfigurationTarget, ExtensionContext, Uri, workspace } from "vscode";
import store from "../store";

export default function initializeExtension(context: ExtensionContext) {
  console.log("initializing extension");
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

  initializeMode(store);
  initializeExcludeList(store);
  initializeSoloList(store);
}
