import * as vs from "vscode";
import {
  $LOG,
  inspectConfig,
  LOG_TYPES,
  processFiles,
  updateConfig,
} from "../helpers";

const { commands, workspace, Uri } = vs;

const getPaths = (selected: vs.Uri[]) => {
  const workspacePath = workspace.workspaceFolders?.[0].uri.fsPath;
  if (workspacePath === undefined) {
    $LOG("Error: Workspace path undefined", LOG_TYPES.SYSTEM_ERROR);
    return [];
  }
  const results: string[] = [];
  for (const _item of selected) {
    const { path } = Uri.parse(_item.toString());
    results.push(path);
  }
  return results;
};

export default function (context: vs.ExtensionContext) {
  $LOG("Build Solo Commands", LOG_TYPES.SYSTEM);
  const { subscriptions } = context;
  subscriptions.push(
    commands.registerCommand("solo.solo.add", async (...args) => {
      const soloMode = inspectConfig("solo.soloMode");
      const solodFiles = inspectConfig("solo.solodFiles");

      if (solodFiles.length === 0 && !soloMode) {
        await commands.executeCommand("solo.mode.enable");
      }

      const [, ...selected] = args;
      const results = getPaths(...(selected as [any]));
      const nextSolodFiles = [...solodFiles, ...results];

      await updateConfig("solo.solodFiles", nextSolodFiles);
      await commands.executeCommand(
        "setContext",
        "solo.solodFiles",
        nextSolodFiles
      );
      await commands.executeCommand("solo.solo.update");

      $LOG("solo.add", LOG_TYPES.INFO, { selected, results });
    }),
    commands.registerCommand("solo.solo.remove", async (...args) => {
      const solodFiles = inspectConfig("solo.solodFiles");

      const [, ...selected] = args;
      const results = getPaths(...(selected as [any]));
      const nextSolodFiles = solodFiles.filter(
        (file: string) => !results.includes(file)
      );

      await updateConfig("solo.solodFiles", nextSolodFiles);
      await commands.executeCommand(
        "setContext",
        "solo.solodFiles",
        nextSolodFiles
      );
      await commands.executeCommand("solo.solo.update");

      $LOG("solo.remove - complete", LOG_TYPES.SYSTEM_SUCCESS);
    }),
    commands.registerCommand("solo.solo.reset", async () => {
      await updateConfig("solo.soloMode", false);
      await updateConfig("solo.solodFiles", []);
      await updateConfig("files.exclude", undefined);
      await commands.executeCommand("setContext", "solo.solodFiles", []);
      await commands.executeCommand("setContext", "solo.solodMode", false);

      $LOG("solo.reset - reseting solo list", LOG_TYPES.SYSTEM_SUCCESS);
    }),

    commands.registerCommand("solo.solo.update", processFiles)
  );
  $LOG("Build Solo Commands - Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
