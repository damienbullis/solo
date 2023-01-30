import {
  commands,
  ExtensionContext,
  workspace,
  ConfigurationTarget,
} from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";

export default ({ subscriptions }: ExtensionContext) => {
  $LOG("Build Mode Commands", LOG_TYPES.SYSTEM);

  // Check Global Config for Solo Mode and File Excludes
  const soloConfig = workspace.getConfiguration("solo");
  const filesConfig = workspace.getConfiguration("files");

  // Register Mode Commands

  subscriptions.push(
    commands.registerCommand("solo.mode.enable", () => {
      // Set the solo mode to true

      soloConfig.update("soloMode", true, ConfigurationTarget.Global);
      commands.executeCommand("setContext", "solo.soloMode", true);

      // Set the exclude list to be empty
      filesConfig.update("exclude", {}, ConfigurationTarget.Global);

      $LOG("mode enabled", LOG_TYPES.SYSTEM_SUCCESS, { excludeList: {} });
    }),
    commands.registerCommand("solo.mode.disable", () => {
      // Set the solo mode to false

      soloConfig.update("soloMode", false, ConfigurationTarget.Global);
      commands.executeCommand("setContext", "solo.soloMode", false);

      // Trigger the update command to reset the exclude list
      commands.executeCommand("solo.mode.update");

      $LOG("mode disabled", LOG_TYPES.SYSTEM_SUCCESS, {});
    })
  );
  $LOG("Build Mode Commands Complete", LOG_TYPES.SYSTEM_SUCCESS);
};
