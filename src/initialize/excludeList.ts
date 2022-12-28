import { ConfigurationTarget, Uri, workspace } from "vscode";
import { TypeStore } from "../store";

export default async function (store: TypeStore) {
  console.log("initializing exclude list", { store });
  //
  const filesConfig = workspace.getConfiguration("files");
  const res = filesConfig.inspect("exclude");

  // check workspace settings in res
  const { defaultValue, globalValue, workspaceValue } = res || {};
  let shouldAdd = !workspaceValue;
  // get the uri of the workspace folder
  const workspaceUri = workspace.workspaceFolders?.[0].uri;
  // get the root uri
  if (workspaceUri) {
    const _workDir = await workspace.fs.readDirectory(workspaceUri);
    const checkFor = {
      ...(defaultValue as object),
      ...(globalValue as object),
      ...(workspaceValue as object),
    };
    const c = Object.keys(checkFor) as string[];
    const workDir = _workDir.filter(([name]) => {
      const has = c.find((n) => n.includes(name));
      return has === undefined;
    });
    const next = workDir.map(([name]) => {
      // get the uri
      const uri = workspaceUri.with({ path: `${workspaceUri.path}/${name}` });
      return [name, uri] as [string, Uri];
    });
    store.set("workspaceDir", next);
    const [name, type] = workDir.find(([name]) => name === ".vscode") || [];
    if (name === ".vscode" && type === 2) {
      shouldAdd = false;
    }
  }
  if (shouldAdd) {
    const initialList = {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      ".vscode": true,
    };

    console.log(
      "trigger should add true, setting initial exclude to empty object"
    );
    store.set("initialExclude", initialList);
    store.set("excludeList", initialList);
    filesConfig.update("exclude", initialList, ConfigurationTarget.Workspace);
  } else {
    console.log(
      "trigger should add false, setting initial exclude to workspace value"
    );
    store.set("initialExclude", workspaceValue || {});
    store.set("excludeList", workspaceValue || {});
  }
}
