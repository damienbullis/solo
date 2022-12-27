import * as vscode from "vscode";

const store: {
  rootFolders: [string, vscode.FileType, vscode.Uri][];
  workspaceExclude: string[];
  solodFiles: [string, vscode.Uri][];
} = {
  rootFolders: [],
  workspaceExclude: [],
  solodFiles: [],
};

const updateExclude = () => {
  const { workspaceExclude, solodFiles, rootFolders } = store;
  const filesConfig = vscode.workspace.getConfiguration("files");
  const next = workspaceExclude.reduce<{ [k: string]: boolean }>(
    (acc, file) => {
      acc[file] = true;
      return acc;
    },
    {}
  );

  const newExclude = rootFolders.reduce<{ [k: string]: boolean }>(
    (acc, [name, , uri]) => {
      const checkSolod = solodFiles.find(
        ([file, _uri]) => uri.path === _uri.path
      );
      if (!checkSolod) {
        acc[name] = true;
      }
      return acc;
    },
    next
  );
  // const newExclude = solodFiles.reduce<{ [k: string]: boolean }>(
  //   (acc, [name, uri]) => {
  //     acc[name] = true;
  //     return acc;
  //   },
  //   next
  // );

  filesConfig.update(
    "exclude",
    newExclude,
    vscode.ConfigurationTarget.Workspace
  );
};

const getExcluded = async () => {
  // get current workspace
  const workspace = vscode.workspace.workspaceFolders;
  console.log({ workspace });
  const path = workspace?.[0].uri;
  // get folders for a given path
  if (path !== undefined) {
    const _folders = await vscode.workspace.fs.readDirectory(
      vscode.Uri.from(path)
    );
    // for each folder map the uri to the name and type
    const folders = _folders.map((folder) => {
      const [name, type] = folder;
      const uri = vscode.Uri.joinPath(path, name);
      return [name, type, uri];
    });

    store.rootFolders = folders as [string, vscode.FileType, vscode.Uri][];
  }
};

const currentlyVisible = () => {
  const filesConfig = vscode.workspace.getConfiguration("files");
  const res = filesConfig.inspect("exclude");
  const { defaultValue, globalValue, workspaceValue } = res || {};

  const currentExclude = Object.keys(globalValue || defaultValue || {});
  const workspaceExclude = Object.keys(workspaceValue || {});
  const combinedExclude = [...currentExclude, ...workspaceExclude];

  Object.assign(store, {
    workspaceExclude: combinedExclude,
  });

  console.log({ store });
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
      console.log("solo mode disabled");
    }
  );

  const modeEnable = vscode.commands.registerCommand("solo.mode.enable", () => {
    toggleSoloMode();
    console.log("solo mode enabled");
  });
  const configOnChange = vscode.workspace.onDidChangeConfiguration((e) => {
    if (e.affectsConfiguration("files.exclude")) {
      console.log("do something when exclude changes");
    }
  });
  const test = vscode.commands.registerCommand(
    "solo.test",
    async (uri: vscode.Uri) => {
      // check if uri is a file or folder
      const { path } = uri;
      // using fs api to check if path is a file or folder
      const { type } = await vscode.workspace.fs.stat(uri);
      // convert type to readable string
      const uriType = vscode.FileType[type];

      // if (uriType === "Directory") {
      //   // look through the store rootFolders and filter out any folder that is not the same as the path
      //   // then add those folders to the exclude list
      //   const filtered = store.rootFolders.filter((folder) => {
      //     const [name, , uri] = folder;
      //     console.log({ name, uri });
      //     return uri.path !== path;
      //   });
      //   // console.log({ filtered });
      // }
      const alreadyExcluded = store.solodFiles.find(
        ([file, uri]) => uri.path === path
      );
      if (!alreadyExcluded) {
        const name = path.split("/").pop();
        if (name) {
          store.solodFiles = [...store.solodFiles, [name, uri]];
        }
      }
      updateExclude();
      console.log({ path, store });
    }
  );

  // Subscribe to commands
  context.subscriptions.push(modeDisable, modeEnable, test, configOnChange);
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
