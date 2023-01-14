import { FileType, workspace } from "vscode";
import { $LOG } from ".";
import store from "../store";

export default async function (
  solodFiles: string[],
  excludedFiles: Record<string, boolean> | undefined
) {
  const dir = store.get("workspaceDir"),
    rootUri = store.get("workspaceUri");

  if (!dir || !rootUri) {
    $LOG("No workspace directory or root uri found", "WARN");
    return;
  }

  const prep = [];
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
        complete.push(d);
      }
    });
    $LOG(`Processed: `, "WARN", { complete, current });
    // This is everything inside of the current solod dir
    const _currentDir = await workspace.fs.readDirectory(current[0][1]);
    $LOG(`Current Dir: `, "WARN", { _currentDir, excludedFiles });
  }
}
