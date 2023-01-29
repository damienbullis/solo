import { workspace, ConfigurationTarget, commands } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";

/**
 * Solo Mode
 * ---
 * Solo Mode is a toggle that allows you to toggle between two states:
 * - #### `ON` (soloMode = true)
 *    - This will hide all files (in the current workspace) except for the files that are in the solodFiles array
 * - #### `OFF` (soloMode = false)
 *    - This will show all files (in the current workspace)
 */
export default function () {
  $LOG("Initialize Solo Mode", LOG_TYPES.SYSTEM);
  const check = workspace.getConfiguration("solo").inspect<boolean>("soloMode");
  // This first will grab the previous value of soloMode, if it exists
  // If it doesn't, grab the default value of soloMode
  // If it doesn't, default to false
  const v = check?.globalValue || check?.defaultValue || false;
  if (check?.globalValue === undefined) {
    // Only update global if we didn't have a global value
    workspace
      .getConfiguration("solo")
      .update("soloMode", v, ConfigurationTarget.Global);
  }
  // set context for soloMode to allow for conditional Commands, Menus, and File Explorer decorations
  commands.executeCommand("setContext", "solo.soloMode", v);
  $LOG("Initialize Solo Mode Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
