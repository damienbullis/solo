import { commands, ConfigurationTarget, workspace } from "vscode";
import store from "../store";

export default function () {
  const soloConfig = workspace.getConfiguration("solo");
  const { workspaceValue } = soloConfig.inspect<string[]>("solodFiles") || {};

  if (workspaceValue) {
    store.set("initialSolo", workspaceValue);
    soloConfig.update(
      "solodFiles",
      workspaceValue,
      ConfigurationTarget.Workspace
    );
    commands.executeCommand("setContext", "solo.solodFiles", workspaceValue);
  } else {
    soloConfig.update("solodFiles", [], ConfigurationTarget.Workspace);
    commands.executeCommand("setContext", "solo.solodFiles", []);
  }
}
