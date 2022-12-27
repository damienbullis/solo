import { commands, ExtensionContext } from "vscode";

let mode = false;

export default (context: ExtensionContext) => {
  const { globalState, workspaceState, subscriptions } = context;
  // push mode commands to subscriptions
  subscriptions.push(
    commands.registerCommand("solo.mode.enable", () => {
      mode = true;
    }),
    commands.registerCommand("solo.mode.disable", () => {
      mode = false;
    })
  );
};
