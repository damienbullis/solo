import { ExtensionContext, workspace } from "vscode";

import buildSoloCommands from "./solo";
// import setProfilesCommands from "./profiles";
import buildModeCommands from "./mode";

export default function buildCommands(context: ExtensionContext) {
  const { globalState, workspaceState } = context;

  buildModeCommands(context);
  buildSoloCommands(context);

  //#region Other Commands

  // TODO: Add commands for:
  // _commands.push(commands.registerCommand("solo.profile.add", () => {}));
  // _commands.push(
  //   commands.registerCommand("solo.profile.remove", () => {})
  // );
  // _commands.push(
  //   commands.registerCommand("solo.profile.select", () => {})
  // );
  // _commands.push(commands.registerCommand("solo.profile.save", () => {}));

  //#endregion
}
