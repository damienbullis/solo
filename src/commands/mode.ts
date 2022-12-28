import {
  commands,
  ExtensionContext,
  workspace,
  ConfigurationTarget,
} from "vscode";
import store from "../store";

export default (context: ExtensionContext) => {
  const { subscriptions } = context;
  subscriptions.push(
    commands.registerCommand("solo.mode.enable", () => {
      // Set the solo mode to true
      workspace
        .getConfiguration("solo")
        .update("soloMode", true, ConfigurationTarget.Global);
      commands.executeCommand("setContext", "solo.soloMode", true);
      // Update the exclude list to be an empty object
      workspace
        .getConfiguration("files")
        .update("exclude", {}, ConfigurationTarget.Workspace);
      console.log("mode enabled");
    }),
    commands.registerCommand("solo.mode.disable", () => {
      // Set the solo mode to false
      workspace
        .getConfiguration("solo")
        .update("soloMode", false, ConfigurationTarget.Global);
      commands.executeCommand("setContext", "solo.soloMode", false);
      // Update the exclude list to be the current exclude list
      workspace
        .getConfiguration("files")
        .update(
          "exclude",
          store.get("excludeList"),
          ConfigurationTarget.Workspace
        );
      console.log("mode disabled");
    })
  );
};
