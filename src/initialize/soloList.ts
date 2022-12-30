import { commands, ConfigurationTarget, workspace } from "vscode";
import store from "../store";

export default async function () {
  console.log("initializing solo list");

  const soloConfig = workspace.getConfiguration("solo");
  const init = soloConfig.inspect<string[]>("solodFiles");
  console.log("solo config", { init });
  const { workspaceValue } = init || {};
  if (workspaceValue) {
    store.set("initialSolo", workspaceValue);
    soloConfig.update(
      "initial solodFiles",
      workspaceValue,
      ConfigurationTarget.Workspace
    );
    commands.executeCommand("setContext", "solo.solodFiles", workspaceValue);
    console.log("solo list initialized with", workspaceValue);
  } else {
    soloConfig.update("solodFiles", [], ConfigurationTarget.Workspace);
    commands.executeCommand("setContext", "solo.solodFiles", []);
  }
}
