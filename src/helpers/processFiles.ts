import * as vs from "vscode";
import { $LOG, LOG_TYPES } from ".";
import { inspectConfig, updateConfig } from "./inspectConfig";

const { workspace } = vs;

export default async function () {
  $LOG("Processing Solod Files", LOG_TYPES.SYSTEM);

  const solodFiles = inspectConfig("solo.solodFiles");
  const soloMode = inspectConfig("solo.soloMode");
  const initialExclude = inspectConfig("solo.initialExclude");

  const excludeList = initialExclude || {};

  if (soloMode === false) {
    $LOG("Solo Mode is disabled");

    await updateConfig("files.exclude", excludeList);
  } else {
    $LOG("Solo Mode is enabled");

    if (solodFiles !== undefined) {
      const exclude: Record<string, boolean> = { ...excludeList };
      const workspaceFolders = workspace.workspaceFolders;

      if (workspaceFolders !== undefined) {
        for (const folder of workspaceFolders) {
          const folderPath = folder.uri.fsPath;

          const files = await workspace.fs.readDirectory(folder.uri);

          $LOG("---->", "SYSTEM_WARN", { folderPath, files, solodFiles });
          if (solodFiles.length > 0) {
            for (const file of files) {
              const [fileName, fileType] = file;

              if (fileType === 1) {
                // Directory
                if (!solodFiles.includes(fileName)) {
                  exclude[fileName] = true;
                }
              } else {
                // File
                if (!solodFiles.includes(fileName)) {
                  exclude[fileName] = true;
                }
              }
            }
          } else {
            exclude["**"] = true;
          }
        }
      }

      $LOG("files.exclude", "SYSTEM_WARN", exclude);
      await updateConfig("files.exclude", exclude);
    }
  }

  $LOG("Processing Solod Files Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
