import { commands, ExtensionContext } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";
import { updateConfig } from "../helpers/inspectConfig";

export default ({ subscriptions }: ExtensionContext) => {
  $LOG("Build Mode Commands", LOG_TYPES.SYSTEM);

  // Register Mode Commands
  subscriptions.push(
    commands.registerCommand("solo.mode.enable", async () => {
      // Set the solo mode to true
      updateConfig("solo.soloMode", true);
      commands.executeCommand("setContext", "solo.soloMode", true);

      // Set the exclude list to be empty
      updateConfig("files.exclude", {});

      $LOG("mode enabled", LOG_TYPES.SYSTEM_SUCCESS);
    }),
    commands.registerCommand("solo.mode.disable", async () => {
      // Set the solo mode to false
      updateConfig("solo.soloMode", false);
      commands.executeCommand("setContext", "solo.soloMode", false);

      // Trigger the update command to reset the exclude list
      commands.executeCommand("solo.solo.update");

      $LOG("mode disabled", LOG_TYPES.SYSTEM_SUCCESS);
    })
  );
  $LOG("Build Mode Commands Complete", LOG_TYPES.SYSTEM_SUCCESS);
};
