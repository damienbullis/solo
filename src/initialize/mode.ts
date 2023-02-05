import * as vs from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";
import { inspectConfig } from "../helpers/inspectConfig";

const { commands } = vs;

/**
 * - #### `ON` (soloMode = true)
 *    - This will hide all files (in the current workspace) except for the files that are in the solodFiles array
 * - #### `OFF` (soloMode = false)
 *    - This will show all files (in the current workspace)
 */
export default function () {
  $LOG("Initialize Solo Mode", LOG_TYPES.SYSTEM);

  // Check if we have a previous value of soloMode
  const soloMode = inspectConfig("solo.soloMode") ?? false;

  // Set context for soloMode to allow for conditional Commands, Menus, and File Explorer decorations
  commands.executeCommand("setContext", "solo.soloMode", soloMode);
  $LOG(`setContext with ${soloMode}`, LOG_TYPES.SYSTEM_SUCCESS);

  $LOG("Initialize Solo Mode Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
