import { Uri, workspace } from "vscode";
import { $LOG, LOG_TYPES } from ".";
import store from "../store";

export default async function (solodFiles: string[]) {
  const dir = store.get("workspaceDir"),
    rootUri = store.get("workspaceUri");

  if (!dir || !rootUri) {
    $LOG("No workspace directory or root uri found", LOG_TYPES.WARN);
    return;
  }

  const next: { [key: string]: boolean } = {};
  const path = rootUri.path + "/";
  for (const file of solodFiles) {
    const _file = file.replace(path, "");
    const _split = _file.split("/");
    const complete: typeof dir = [],
      current: typeof dir = [];
    dir.forEach((d) => {
      const [name] = d;
      if (_split[0] === name) {
        current.push(d);
      } else {
        next[name] = true;
      }
    });
    $LOG(`Processed: `, LOG_TYPES.WARN, { complete, current, next });
    // This is everything inside of the current solod dir
    const _currentDir = await workspace.fs.readDirectory(current[0][1]);
    for (const [name, type] of _currentDir) {
      $LOG(`Current Dir: `, "INFO", { name, type });
    }
    $LOG(`Current Dir: `, "WARN", { _currentDir });
  }
}

const recurrExclude = async (
  dirArr: [string, Uri][],
  pathArr: string[],
  next = {}
) => {
  // given a solod file (pathArr) and a directory (dirArr) and a next object to store the next files to exclude

  // if the pathArr is empty, return the next object
  if (!pathArr.length) {
    return next;
  }

  // if the pathArr is not empty, get the first item in the pathArr
  const [first, ...rest] = pathArr;
  for (const [name, uri] of dirArr) {
    if (name === first) {
      // if the first item in the pathArr matches the name of the dirArr, get the contents of the directory
      const contents = await workspace.fs.readDirectory(uri);

      $LOG(`Contents of ${name}: `, LOG_TYPES.WARN, { contents });
      //
    }
  }
};
