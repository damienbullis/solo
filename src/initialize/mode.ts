import * as vs from "vscode";
import { log, inspectConfig } from "../helpers";

const { commands } = vs;

/**
 * - #### `ON` (soloMode = true)
 *    - This will hide all files (in the current workspace) except for the files that are in the solodFiles array
 * - #### `OFF` (soloMode = false)
 *    - This will show all files (in the current workspace)
 */
export default async function () {
  log.info("Initialize Solo Mode");

  // Check if we have a previous value of soloMode
  const soloMode = inspectConfig("solo.soloMode");

  // Set context for soloMode to allow for conditional Commands, Menus, and File Explorer decorations
  await commands.executeCommand("setContext", "solo.soloMode", soloMode);
  log.debug(`setContext --> ${soloMode}`);
}
