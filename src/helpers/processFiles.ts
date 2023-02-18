import * as vs from "vscode";
import { log } from ".";
import { inspectConfig, updateConfig } from "./config";

const { workspace } = vs;

const checkProcessed = (set: Set<string>) => {
  if (set.size > 0) {
    return [...set].join("/") + "/";
  }
  return "";
};

const getNestedFiles = async (
  solodFiles: Set<string>,
  directories: Set<string>,
  rootPath: string
) => {
  log.debug("getNestedFiles");
  log.info({
    solodFiles,
    directories,
    rootPath,
  });
  const root = rootPath + "/";
  const processed = new Set<string>();

  const results: Record<string, boolean> = {};

  for (const file of solodFiles) {
    const path = file.replace(root, "");
    const pathParts = path.split("/");
    // drop the last item in pathParts
    pathParts.pop();

    // make sure to remove the first item in pathParts from directories
    if (directories.has(pathParts[0])) {
      directories.delete(pathParts[0]);
    }

    for (const part of pathParts) {
      // using the root plus the part to read that directory and get the list of files
      const partialPath = checkProcessed(processed) + part;
      const uri = vs.Uri.file(root + partialPath);
      const files = await workspace.fs.readDirectory(uri);

      processed.add(part);

      for (const file of files) {
        const [fileName] = file;
        const filePath = partialPath + "/" + fileName;
        const isSolod = solodFiles.has(root + filePath);

        if (!isSolod) {
          results[filePath] = pathParts.includes(fileName) ? false : true;
        }
      }
      log.info({ results });
    }
  }
  return results;
};

export default async function (solod?: string[]) {
  log.group("Processing Solod Files");

  const solodFiles = inspectConfig("solo.solodFiles");
  const soloMode = inspectConfig("solo.soloMode");
  const initialExclude = inspectConfig("solo.initialExclude");

  const nextExclude = initialExclude || {};

  if (soloMode === false) {
    log.group("Solo Mode is disabled, setting exclude to initialExclude");
    await updateConfig("files.exclude", nextExclude);
    log.end();
  } else {
    log.group("Solo Mode is enabled, processing solodFiles");

    if (solodFiles !== undefined) {
      let exclude: Record<string, boolean> = {};
      const workspaceFolders = workspace.workspaceFolders;

      if (workspaceFolders !== undefined) {
        for (const folder of workspaceFolders) {
          const folderPath = folder.uri.fsPath;
          // TODO: add caching
          const files = await workspace.fs.readDirectory(folder.uri);

          if (solodFiles.length > 0) {
            exclude = { ...nextExclude };
            // directories
            const d = new Set<string>();
            // files
            const f = new Set<string>();

            const solod = new Set<string>(solodFiles);

            // Loop through files and determine if they are files or directories
            for (const file of files) {
              const [fileName, fileType] = file;
              const filePath = folderPath + "/" + fileName;
              const isSolod = solod.has(filePath);

              // Add file if not solo'd
              if (fileType === 1) {
                if (!isSolod) {
                  f.add(fileName);
                } else {
                  solod.delete(filePath);
                }
              }
              // Directory
              if (fileType === 2) {
                if (!isSolod) {
                  d.add(fileName);
                } else {
                  solod.delete(filePath);
                }
              }
            }
            const results = await getNestedFiles(solod, d, folderPath);
            log.info({
              d,
              f,
              results,
            });

            exclude = [...f, ...d].reduce(
              (acc, cur) => {
                acc[cur] = true;
                return acc;
              },
              { ...exclude, ...results }
            );
          } else {
            exclude["**"] = true;
          }
        }
      }

      log.debug("Setting exclude with:");
      log.info({ exclude });
      await updateConfig("files.exclude", exclude);
    }
    log.end();
  }

  log.end();
}
