import * as vscode from "vscode";
import buildCommands from "./commands";
import initializeExtension from "./initialize";

export function activate(context: vscode.ExtensionContext) {
  // const { globalState, workspaceState } = context;

  // Initialize the extension state
  initializeExtension(context);

  // Build and subscribe to commands
  buildCommands(context);
}

export function deactivate() {
  // reset the exclude list
}
