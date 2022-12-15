// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

const state: { [key: string]: any } = {};

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("solo", () => {});

  let init = vscode.commands.registerCommand("solo.initialize", () => {
    console.log("solo.initialize");
    const { workspaceFolders } = vscode.workspace;
    const files = workspaceFolders?.map((folder) => folder.uri.fsPath);
    console.log({ files });
    state["files"] = files;
  });

  // initialize the extension with a execute command solo.initialize

  let active: boolean = false;
  let mode = vscode.commands.registerCommand("solo.controlMode", () => {
    const { workspace, window } = vscode;
    const { workspaceFolders } = workspace;

    active = !active;
    // check if sidebar is open
    const isSidebarOpen = window.activeTextEditor?.viewColumn === 1;
    console.log({
      isSidebarOpen,
      active,
      state,
    });
  });

  context.subscriptions.push(disposable, init, mode);

  // execute solo.initialize command
  vscode.commands.executeCommand("solo.initialize");
}

// This method is called when your extension is deactivated
export function deactivate() {}
