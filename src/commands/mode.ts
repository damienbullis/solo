import {
  commands,
  ExtensionContext,
  workspace,
  ConfigurationTarget,
} from "vscode";

export default (context: ExtensionContext) => {
  const { subscriptions } = context;
  subscriptions.push(
    commands.registerCommand("solo.mode.enable", () => {
      workspace
        .getConfiguration("solo")
        .update("soloMode", true, ConfigurationTarget.Global);
      commands.executeCommand("setContext", "solo.soloMode", true);
      console.log("mode enabled");
    }),
    commands.registerCommand("solo.mode.disable", () => {
      workspace
        .getConfiguration("solo")
        .update("soloMode", false, ConfigurationTarget.Global);
      commands.executeCommand("setContext", "solo.soloMode", false);
      console.log("mode disabled");
    })
  );
};
