import { ExtensionContext, workspace } from "vscode";

// import setSoloCommands from "./solo";
// import setProfilesCommands from "./profiles";
import buildModeCommands from "./mode";

export default function buildCommands(context: ExtensionContext) {
  const { globalState, workspaceState } = context;

  //#region Mode Commands (enable/disable)

  buildModeCommands(context);

  //#endregion

  //#region Solo Commands

  // _commands.push(
  //   commands.registerCommand("solo.solo.add", () => {
  //     // NEXT: solo.add
  //     // set the selected file/dir in `include`
  //     // add the selected file/dir to store.solodFiles
  //     // NEXT: check workspace
  //     // get all files and folders in the workspace
  //     // filter out the selected file/dir
  //     // combine the filtered files/folders with the current excluded files
  //     // NEXT: fn's to use
  //     // fn to get the current workspace files and folders
  //     // fn to take the current workspace files and folders and filter out the selected file/dir
  //     // fn to combine the filtered files/folders with the current excluded files
  //     // fn to update the exclude list
  //   })
  // );
  // _commands.push(
  //   commands.registerCommand("solo.solo.remove", () => {
  //     // NEXT: solo.remove
  //     // fn to remove the selected file/dir from store.solodFiles
  //     // fn to add the selected file/dir to the current excluded files
  //     // fn to update the exclude list
  //   })
  // );
  // _commands.push(
  //   commands.registerCommand("solo.solo.reset", () => {
  //     // NEXT: solo.reset
  //     // reset the exclude list to the initial excluded files
  //   })
  // );

  //#endregion

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
