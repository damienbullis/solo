import { commands, ConfigurationTarget, workspace } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";
import store from "../store";

export default function () {
  $LOG("Initialize Solo List", LOG_TYPES.SYSTEM);
  const soloConfig = workspace.getConfiguration("solo");
  const { workspaceValue } = soloConfig.inspect<string[]>("solodFiles") || {};

  if (workspaceValue) {
    store.set("initialSolo", workspaceValue);
    commands.executeCommand("setContext", "solo.solodFiles", workspaceValue);
  } else {
    soloConfig.update("solodFiles", [], ConfigurationTarget.Workspace);
    commands.executeCommand("setContext", "solo.solodFiles", []);
  }
}
