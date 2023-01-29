import { Uri, workspace } from "vscode";
import { $LOG, LOG_TYPES } from ".";
import store from "../store";

export default async function (solodFiles: string[]) {
  $LOG("Processing Solod Files Start", LOG_TYPES.SYSTEM);
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
