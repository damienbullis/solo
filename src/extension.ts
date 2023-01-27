import { commands, ExtensionContext } from "vscode";
import buildCommands from "./commands";
import initializeExtension from "./initialize";

export async function activate(context: ExtensionContext) {
  // Initialize the extension state
  await initializeExtension(context);

  // Build and subscribe to commands
  buildCommands(context);

  // Execxute the initial update command, which will process the solod files
  // and update the exclude list
  commands.executeCommand("solo.solo.update");
}

export function deactivate() {}
