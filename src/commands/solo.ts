import {
  commands,
  ConfigurationTarget,
  ExtensionContext,
  Uri,
  workspace,
} from "vscode";
import { $LOG, LOG_TYPES, processFiles } from "../helpers";

export default (context: ExtensionContext) => {
  $LOG("Build Solo Commands", LOG_TYPES.SYSTEM);
  const { subscriptions } = context;
  subscriptions.push(
    commands.registerCommand("solo.solo.add", (...args) => {
      // check if multiple items have been selected
      // if so, add all of them to the solo list
      // if not, add the current file to the solo list
      const [, ...rest] = args;
      // probably also want to check if solo mode is enabled
      // if it is then we need to update the exclude list as well

      $LOG("solo.add", LOG_TYPES.INFO, { args, rest });
    }),
    commands.registerCommand("solo.solo.remove", (...args) => {
      // check if multiple items have been selected
      const [, ...rest] = args;
      // if so, remove all of them from the solo list
      // if not, remove the current file from the solo list
      $LOG("solo.remove", LOG_TYPES.INFO, { args, rest });
    }),
    commands.registerCommand("solo.solo.reset", () => {
      // reset the solo list to be empty
      $LOG("solo.reset");
    }),

    commands.registerCommand("solo.solo.update", processFiles)
  );
  $LOG("Build Solo Commands - Complete", LOG_TYPES.SYSTEM_SUCCESS);
};
