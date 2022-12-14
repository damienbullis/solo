// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand("solo.solo", () => {
    // The code you place here will be executed every time your command is executed
    // Display a message box to the user
    const { workspace, window } = vscode;
    const { workspaceFolders } = workspace;
    console.log({ vscode, workspaceFolders });

    if (workspaceFolders && workspaceFolders.length > 0) {
      const { uri } = workspaceFolders[0];
      const { fsPath } = uri;
      console.log({ fsPath, uri });
    }
  });

  let active: boolean = false;
  let mode = vscode.commands.registerCommand("solo.controlMode", () => {
    const { workspace, window } = vscode;
    const { workspaceFolders } = workspace;
    console.log({ workspaceFolders });
    active = !active;
    // check if sidebar is open
    const isSidebarOpen = window.activeTextEditor?.viewColumn === 1;
    console.log({ isSidebarOpen, active });
  });
  

  context.subscriptions.push(disposable, mode);
}

// This method is called when your extension is deactivated
export function deactivate() {}
