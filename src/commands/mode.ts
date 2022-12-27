import { commands, ExtensionContext, workspace } from "vscode";

export default (context: ExtensionContext) => {
  const { globalState, workspaceState, subscriptions } = context;
  // push mode commands to subscriptions
  subscriptions.push(
    commands.registerCommand("solo.mode.enable", () => {
      workspace.getConfiguration("solo").update("soloMode", true);
      commands.executeCommand("setContext", "solo.soloMode", true);
      console.log("mode enabled");
    }),
    commands.registerCommand("solo.mode.disable", () => {
      workspace.getConfiguration("solo").update("soloMode", false);
      commands.executeCommand("setContext", "solo.soloMode", false);
      console.log("mode disabled");
    })
  );
};
