import * as vscode from "vscode";

const { log } = console;

const store: {
  rootFolders: [string, vscode.FileType][];
} = {
  rootFolders: [],
};

const getExcluded = async () => {
  // get current workspace
  const workspace = vscode.workspace.workspaceFolders;
  const path = workspace?.[0].uri;
  // get folders for a given path
  if (path !== undefined) {
    const folders = await vscode.workspace.fs.readDirectory(
      vscode.Uri.from(path)
    );

    store.rootFolders = folders;
  }
};

const currentlyVisible = () => {
  const filesConfig = vscode.workspace.getConfiguration("files");
  const res = filesConfig.inspect("exclude");
  const { defaultValue, globalValue, workspaceValue } = res || {};

  const currentExclude = Object.keys(globalValue || defaultValue || {});
  const workspaceExclude = Object.keys(workspaceValue || {});
  const combinedExclude = [...currentExclude, ...workspaceExclude];
  // copy workspaceValue to store
  const filtered = store.rootFolders.filter(([name]) => {
    return !combinedExclude.find((exclude) => exclude.includes(name));
  });
  Object.assign(store, {
    workspaceExclude: workspaceValue,
    filteredFolders: filtered,
  });

  log({ store, currentExclude, filtered });
};

export function activate(context: vscode.ExtensionContext) {
  const { globalState } = context;

  const toggleSoloMode = () => {
    const nextMode = !globalState.get("soloMode");
    // To pass state to package.json
    vscode.commands.executeCommand("setContext", "ext.soloMode", nextMode);
    // Internal extension state
    globalState.update("soloMode", nextMode);
  };

  // Register commands

  const modeDisable = vscode.commands.registerCommand(
    "solo.mode.disable",
    () => {
      toggleSoloMode();
      // getExcluded();
      console.log("solo mode disabled");
      // reset the solo'd files
      // const filesConfig = vscode.workspace.getConfiguration("files");
      // filesConfig.update("exclude", {});
    }
  );

  const modeEnable = vscode.commands.registerCommand("solo.mode.enable", () => {
    toggleSoloMode();
    // getExcluded();
    console.log("solo mode enabled");
  });

  // Subscribe to commands
  context.subscriptions.push(modeDisable, modeEnable);
  getExcluded();
  currentlyVisible();

  // FEATURE: on init check for workspace settings and check if files are excluded
  // if they are then store them in the soloContext, to be restored when solo mode is disabled
  // we also need to add those initial excluded files to the current exclude list that we will be using
  // to add new files to the exclude list

  // FEATURE: on init check for workspace settings for solo'd files
  // then we will start off with those files solo'd and solo mode disabled

  // FEATURE: add in a property to the configuration that is the starting state of the extension. Enabled or Disabled

  // FEATURE: add in a profile system that allows you to save a list of files to be excluded and
  // then you can switch between them, also the property in the configuration for current profile
}

export function deactivate() {}
