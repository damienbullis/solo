import { ExtensionContext } from "vscode";

import buildModeCommands from "./mode";
import buildSoloCommands from "./solo";
// import setProfilesCommands from "./profiles";
import { log } from "../helpers";

export default function buildCommands(context: ExtensionContext) {
  log.info("Building Extension Commands");

  buildModeCommands(context);
  buildSoloCommands(context);

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
