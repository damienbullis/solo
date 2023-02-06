import * as vs from "vscode";
import { $LOG, LOG_TYPES } from ".";
import { inspectConfig, updateConfig } from "./config";

const { workspace } = vs;

export default async function () {
  $LOG("Processing Solod Files", LOG_TYPES.SYSTEM);

  const solodFiles = inspectConfig("solo.solodFiles");
  const soloMode = inspectConfig("solo.soloMode");
  const initialExclude = inspectConfig("solo.initialExclude");

  const nextExclude = initialExclude || {};

  if (soloMode === false) {
    $LOG("Solo Mode is disabled, setting exclude to initialExclude");
    await updateConfig("files.exclude", nextExclude);
  } else {
    $LOG("Solo Mode is enabled, processing solodFiles");

    if (solodFiles !== undefined) {
      let exclude: Record<string, boolean> = {};
      const workspaceFolders = workspace.workspaceFolders;

      if (workspaceFolders !== undefined) {
        for (const folder of workspaceFolders) {
          // const folderPath = folder.uri.fsPath;

          const files = await workspace.fs.readDirectory(folder.uri);

          if (solodFiles.length > 0) {
            exclude = { ...nextExclude };
            for (const file of files) {
              const [fileName, fileType] = file;

              if (fileType === 1) {
                // File
                if (!solodFiles.includes(fileName)) {
                  exclude[`${fileName}`] = true;
                }
              } else {
                // Directory
                if (!solodFiles.includes(fileName)) {
                  exclude[`${fileName}/`] = true;
                }
              }
            }
          } else {
            exclude["**"] = true;
          }
        }
      }

      $LOG("Processed Files:", LOG_TYPES.SYSTEM_SUCCESS, { exclude });
      await updateConfig("files.exclude", exclude);
    }
  }

  $LOG("Processing Solod Files Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
