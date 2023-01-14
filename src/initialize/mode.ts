import { workspace, ConfigurationTarget, commands } from "vscode";

export default function () {
  const check = workspace.getConfiguration("solo").inspect<boolean>("soloMode");
  const v = check?.globalValue || check?.defaultValue || false;
  if (check?.globalValue === undefined) {
    // set workspace value to defaultvalue
    workspace
      .getConfiguration("solo")
      .update("soloMode", v, ConfigurationTarget.Global);
  }
  commands.executeCommand("setContext", "solo.soloMode", v);
}
