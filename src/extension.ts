import * as vscode from "vscode";
import buildCommands from "./commands";
import initializeExtension from "./initialize";
import store from "./store";

export function activate(context: vscode.ExtensionContext) {
  // const { globalState, workspaceState } = context;

  // Initialize the extension state
  initializeExtension(context);

  // Build and subscribe to commands
  buildCommands(context);
}

export function deactivate() {
  // reset the exclude list to the initial state
  const resetWith = store.get("initialExclude");
  if (!resetWith) {
    console.log("no initial exclude list to reset with");
    return;
  }
  const filesConfig = vscode.workspace.getConfiguration("files");
  console.log(
    "deactivating with exclude list\n",
    JSON.stringify(resetWith, null, 2)
  );
  filesConfig.update(
    "exclude",
    resetWith,
    vscode.ConfigurationTarget.Workspace
  );
}
