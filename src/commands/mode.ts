import * as vs from "vscode";
import { log, updateConfig } from "../helpers";

const { commands } = vs;

export default ({ subscriptions }: vs.ExtensionContext) => {
  log.info("Registering Mode Commands");

  // Register Mode Commands
  subscriptions.push(
    commands.registerCommand("solo.mode.enable", async () => {
      // Set the solo mode to true
      await updateConfig("solo.soloMode", true);
      await commands.executeCommand("setContext", "solo.soloMode", true);

      // Trigger the update command to reset the exclude list
      await commands.executeCommand("solo.solo.update");

      log.debug("Setting Mode -> TRUE (after solo.update)");
    }),
    commands.registerCommand("solo.mode.disable", async () => {
      // Set the solo mode to false
      await updateConfig("solo.soloMode", false);
      await commands.executeCommand("setContext", "solo.soloMode", false);

      // Set the exclude list to be empty
      await updateConfig("files.exclude", {});

      log.debug("Setting Mode -> FALSE (after solo.update)");
    })
  );
};
