import * as vs from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";
import { inspectConfig, updateConfig } from "../helpers/inspectConfig";

const { commands } = vs;

export default ({ subscriptions }: vs.ExtensionContext) => {
  $LOG("Build Mode Commands", LOG_TYPES.SYSTEM);

  // Register Mode Commands
  subscriptions.push(
    commands.registerCommand("solo.mode.enable", async () => {
      // Set the solo mode to true
      await updateConfig("solo.soloMode", true);
      await commands.executeCommand("setContext", "solo.soloMode", true);

      // Trigger the update command to reset the exclude list
      await commands.executeCommand("solo.solo.update");

      $LOG(
        "Setting Mode -> TRUE (after solo.update)",
        LOG_TYPES.SYSTEM_SUCCESS
      );
    }),
    commands.registerCommand("solo.mode.disable", async () => {
      const initExclude = inspectConfig("solo.initialExclude");
      // Set the solo mode to false
      await updateConfig("solo.soloMode", false);
      await commands.executeCommand("setContext", "solo.soloMode", false);

      // Set the exclude list to be empty
      await updateConfig("files.exclude", initExclude || {});

      $LOG(
        "Setting Mode -> FALSE (after solo.update)",
        LOG_TYPES.SYSTEM_SUCCESS
      );
    })
  );
  $LOG("Build Mode Commands - Complete", LOG_TYPES.SYSTEM_SUCCESS);
};
