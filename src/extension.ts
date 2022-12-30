import { commands, ExtensionContext } from "vscode";
import buildCommands from "./commands";
import initializeExtension from "./initialize";

export async function activate(context: ExtensionContext) {
  // Initialize the extension state
  await initializeExtension(context);
  // Build and subscribe to commands
  buildCommands(context);
  commands.executeCommand("solo.solo.update");
}

export function deactivate() {
  // FEATURE: clean up the extension
  // reset exclude list -> initial exclude list
  // reset solo list -> initial solo list
}
