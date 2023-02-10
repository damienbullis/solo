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
            // directories
            const d = new Set<string>();
            // files
            const f = new Set<string>();

            const drill = new Set<string>();

            const solod = new Set<string>(solodFiles);

            for (const file of files) {
              const [fileName, fileType] = file;

              if (fileType === 1) {
                // File
                f.add(fileName);
                // if (!solodFiles.includes(fileName)) {
                //   exclude[`${fileName}`] = true;
                // }
              } else {
                // Directory
                d.add(fileName + "/");
                // if (!solodFiles.includes(fileName)) {
                //   exclude[`${fileName}/`] = true;
                // }
              }
            }

            for (const file of solod) {
              const hasFile = f.has(file);
              if (hasFile) {
                $LOG("hasFile:", LOG_TYPES.INFO, { hasFile });
                exclude[file] = false;
                f.delete(file);
                continue;
              }
              for (const dir of [...d]) {
                if (file.includes(dir)) {
                  exclude[dir] = false;
                  d.delete(dir);

                  $LOG("file includes dir", LOG_TYPES.INFO, {
                    file,
                    dir,
                    exclude,
                  });
                }
              }
            }
            [...f, ...d].reduce((acc, cur) => {
              acc[cur] = true;
              return acc;
            }, exclude);
            $LOG("afterwards:", LOG_TYPES.INFO, {
              exclude,
            });
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
