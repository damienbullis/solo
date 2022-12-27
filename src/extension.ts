import * as vscode from "vscode";
import buildCommands from "./commands";

// Initial state
// REFACTOR: create interface / type for store
const store = {
  soloMode: false,
  initialExcludedFiles: [] as string[],
  currentExcludedFiles: [] as string[],
  solodFiles: [] as string[],
};

const initializeExtension = () => {
  console.log("initializing extension");
  // NEXT: get excluded & store
  // check for current workspace settings for files.exclude
  // store those files as initial excluded files
  // add those files to the current exclude files
  // store those files as current excluded files
  // NEXT: set initial mode
  // enable solo mode for internal use
  // setContext for ext.soloMode for package.json to use
};

export function activate(context: vscode.ExtensionContext) {
  // const { globalState, workspaceState } = context;

  // Initialize state
  initializeExtension();

  // Build and subscribe to commands
  buildCommands(context);
}

export function deactivate() {
  // reset the exclude list
}
