import * as vscode from "vscode";

const soloContext = {
  /**
   * The Mode or State of the extension.
   * - `true` means that we are in solo mode and we are excluding files
   * - `false` means that we are not in solo mode and we are seeing all files except the ones that are workspace/settings excluded
   */
  soloEnabled: false,
};

const setSoloMode = (soloMode: boolean) => {
  soloContext.soloEnabled = soloMode;
  vscode.commands.executeCommand("setContext", "ext.soloMode", soloMode);
};

export function activate(context: vscode.ExtensionContext) {
  const modeDisable = vscode.commands.registerCommand(
    "solo.mode.disable",
    () => {
      setSoloMode(false);
      // reset the solo'd files
      // const filesConfig = vscode.workspace.getConfiguration("files");
      // filesConfig.update("exclude", {});
    }
  );

  const modeEnable = vscode.commands.registerCommand("solo.mode.enable", () =>
    setSoloMode(true)
  );

  // Subscribe to commands
  context.subscriptions.push(modeDisable, modeEnable);

  // Initialize
  setSoloMode(soloContext.soloEnabled);

  // FEATURE: on init check for workspace settings and check if files are excluded
  // if they are then store them in the soloContext, to be restored when solo mode is disabled
  // we also need to add those initial excluded files to the current exclude list that we will be using
  // to add new files to the exclude list

  // FEATURE: on init check for workspace settings for solo'd files
  // then we will start off with those files solo'd and solo mode disabled

  // FEATURE: add in a property to the configuration that is the starting state of the extension. Enabled or Disabled
}

export function deactivate() {}
