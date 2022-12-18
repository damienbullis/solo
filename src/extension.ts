// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { TextEncoder } from "util";
import * as vscode from "vscode";

const emitter = new vscode.EventEmitter<boolean>();
let isActive = false;
const dontUse = [".vscode"];
async function toggleVisible() {
  isActive = !isActive;
  // get the current workspace folders open in the editor
  const workspaceFolders = vscode.workspace.workspaceFolders;
  const filesConfig = vscode.workspace.getConfiguration("files");
  // get the state of each of the workspace folders
  const dirPaths: string[] = [];
  workspaceFolders?.forEach((folder) => {
    dirPaths.push(folder.uri.fsPath);
  });
  // for each dirPaths, get the files in that directory
  const files: string[] = [];
  for (const dirPath of dirPaths) {
    const fileNames = await vscode.workspace.fs.readDirectory(
      vscode.Uri.file(dirPath)
    );
    fileNames.forEach((fileName) => {
      if (fileName[1] === vscode.FileType.Directory) {
        files.push(fileName[0]);
      }
    });
  }
  const prev = filesConfig.get("exclude") as { [key: string]: boolean };

  const mapped = files.reduce((acc, file) => {
    const tempExclude = `**/${file}`;
    if (tempExclude in prev || dontUse.includes(file)) {
      return acc;
    }
    return { ...acc, [tempExclude]: true };
  }, {});
  console.log({ mapped });

  filesConfig.update("exclude", mapped);
  // for each file hide it from the explorer
  // files.forEach((file) => {
  //   console.log("hidefiles", file);
  //   vscode.commands.executeCommand("workbench.files.action.hideFiles", file);
  // });
}
export function activate(context: vscode.ExtensionContext) {
  const mode = vscode.commands.registerCommand("solo.mode", toggleVisible);
  const menu = vscode.commands.registerCommand("solo.menu", () => {
    // reset the solo'd files
    const filesConfig = vscode.workspace.getConfiguration("files");
    filesConfig.update("exclude", {});
  });
  context.subscriptions.push(mode, menu);
}

export function deactivate() {}
