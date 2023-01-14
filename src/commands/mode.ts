import {
  commands,
  ExtensionContext,
  workspace,
  ConfigurationTarget,
} from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";
import store from "../store";

export default ({ subscriptions }: ExtensionContext) => {
  $LOG("Build Mode Commands", LOG_TYPES.SYSTEM);
  const soloConfig = workspace.getConfiguration("solo");
  const filesConfig = workspace.getConfiguration("files");
  subscriptions.push(
    commands.registerCommand("solo.mode.enable", () => {
      // Set the solo mode to true
      soloConfig.update("soloMode", true, ConfigurationTarget.Global);
      commands.executeCommand("setContext", "solo.soloMode", true);
      // Update the exclude list to be an empty object
      filesConfig.update("exclude", {}, ConfigurationTarget.Workspace);
      $LOG("mode enabled");
    }),
    commands.registerCommand("solo.mode.disable", () => {
      // Set the solo mode to false
      soloConfig.update("soloMode", false, ConfigurationTarget.Global);
      commands.executeCommand("setContext", "solo.soloMode", false);
      // Update the exclude list to be the current exclude list
      filesConfig.update(
        "exclude",
        store.get("excludeList"),
        ConfigurationTarget.Workspace
      );
      $LOG("mode disabled");
    })
  );
};
