import {
  commands,
  ConfigurationTarget,
  ExtensionContext,
  Uri,
  workspace,
} from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";
import store from "../store";

export default (context: ExtensionContext) => {
  $LOG("Build Solo Commands", LOG_TYPES.SYSTEM);
  const { subscriptions } = context;
  subscriptions.push(
    commands.registerCommand("solo.solo.add", (...args) => {
      // check if multiple items have been selected
      // if so, add all of them to the solo list
      // if not, add the current file to the solo list
      const [, ...rest] = args;
      const _soloList = [...store.get("initialSolo")];
      if (rest) {
        for (const uri of rest[0]) {
          if (!_soloList.includes(uri.path)) {
            _soloList.push(uri.path);
          }
        }
      }
      workspace
        .getConfiguration("solo")
        .update("solodFiles", _soloList, ConfigurationTarget.Workspace);
      commands.executeCommand("setContext", "solo.solodFiles", _soloList);
      $LOG("solo.add", LOG_TYPES.INFO, _soloList);
    }),
    commands.registerCommand("solo.solo.remove", () => {
      $LOG("solo.remove");
    }),
    commands.registerCommand("solo.solo.reset", () => {
      $LOG("solo.reset");
    }),
    commands.registerCommand("solo.solo.update", () => {
      // this is a command that will look at the solo list & the exclude list & the workspace folders
      const solodFiles = workspace
          .getConfiguration("solo")
          .get<string[]>("solodFiles"),
        { workspaceValue: excludeFiles } =
          workspace
            .getConfiguration("files")
            .inspect<Record<string, Uri>>("exclude") || {};
      const dir = store.get("workspaceDir"),
        rootUri = store.get("workspaceUri");
      $LOG("solo update command", LOG_TYPES.WARN, {
        solodFiles,
        excludeFiles,
        dir,
        rootUri,
      });
      // and build a new exclude list
      // then it will update the exclude list in the workspace config
      // then it will update the exclude list in the store
      // then it will update the context
    })
  );
};
