import { ExtensionContext } from "vscode";

import buildSoloCommands from "./solo";
// import setProfilesCommands from "./profiles";
import buildModeCommands from "./mode";
import { $LOG, LOG_TYPES } from "../helpers";

export default function buildCommands(context: ExtensionContext) {
  $LOG("Build Commands Start", LOG_TYPES.SYSTEM);
  buildModeCommands(context);
  buildSoloCommands(context);

  $LOG("Build Commands Complete", LOG_TYPES.SYSTEM_SUCCESS);

  // TODO: Add commands for:
  // _commands.push(commands.registerCommand("solo.profile.add", () => {}));
  // _commands.push(
  //   commands.registerCommand("solo.profile.remove", () => {})
  // );
  // _commands.push(
  //   commands.registerCommand("solo.profile.select", () => {})
  // );
  // _commands.push(commands.registerCommand("solo.profile.save", () => {}));
}
