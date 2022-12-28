import { workspace, ConfigurationTarget, commands } from "vscode";
import { StoreType } from ".";

export default function (store: StoreType) {
  const check = workspace.getConfiguration("solo").inspect("soloMode");
  const v = check?.globalValue || check?.defaultValue || false;
  if (check?.globalValue === undefined) {
    // set workspace value to defaultvalue
    workspace
      .getConfiguration("solo")
      .update("soloMode", v, ConfigurationTarget.Global);
  }
  store.mode = v as boolean;
  commands.executeCommand("setContext", "solo.soloMode", v);
}
