import * as vscode from "vscode";
import buildCommands from "./commands";
import initializeExtension from "./initialize";

const { commands } = vscode;

export async function activate(context: vscode.ExtensionContext) {
  // Build and subscribe to commands
  buildCommands(context);
  // Initialize the extension state & context
  initializeExtension(context);

  // Trigger the update command, to update the exclude list
  await commands.executeCommand("solo.solo.update");
}

export function deactivate() {}
