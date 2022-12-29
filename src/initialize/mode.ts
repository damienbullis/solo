import { workspace, ConfigurationTarget, commands } from "vscode";
import store from "../store";

export default function () {
  const check = workspace.getConfiguration("solo").inspect("soloMode");
  const v = check?.globalValue || check?.defaultValue || false;
  if (check?.globalValue === undefined) {
    // set workspace value to defaultvalue
    workspace
      .getConfiguration("solo")
      .update("soloMode", v, ConfigurationTarget.Global);
  }
  store.set("mode", v as boolean);
  commands.executeCommand("setContext", "solo.soloMode", v);
}
