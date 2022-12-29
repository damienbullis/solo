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
  // reset the exclude list
  const resetWith = store.get("initialExclude");
  const filesConfig = vscode.workspace.getConfiguration("files");
  console.log("resetting exclude list", { resetWith });
  filesConfig.update("exclude", {}, vscode.ConfigurationTarget.Workspace);
}
