import { ExtensionContext } from "vscode";
import buildCommands from "./commands";
import initializeExtension from "./initialize";

export function activate(context: ExtensionContext) {
  // Initialize the extension state
  initializeExtension(context);

  // Build and subscribe to commands
  buildCommands(context);
}

export function deactivate() {
  // FEATURE: clean up the extension
  // reset exclude list -> initial exclude list
  // reset solo list -> initial solo list
}
