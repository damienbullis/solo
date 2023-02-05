import * as vscode from "vscode";
import buildCommands from "./commands";
import initializeExtension from "./initialize";

const { commands } = vscode;

export async function activate(context: vscode.ExtensionContext) {
  // Build and subscribe to commands
  buildCommands(context);
  // Initialize the extension state
  initializeExtension(context);

  // Execxute the initial update command, which will process the solod files
  // and update the exclude list
  commands.executeCommand("solo.solo.update");
}

export function deactivate() {}
