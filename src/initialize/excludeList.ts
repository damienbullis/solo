import { Uri, workspace } from "vscode";
import store from "../store";

const { getConfiguration, fs, workspaceFolders } = workspace;

export default async function () {
  // check workspace settings in res
  const res = getConfiguration("files").inspect<{ [key: string]: boolean }>(
    "exclude"
  );
  const { defaultValue, globalValue, workspaceValue } = res || {};
  // get the uri of the workspace folder
  const workspaceUri = workspaceFolders?.[0].uri;
  // get the root uri
  if (workspaceUri) {
    store.set("workspaceUri", workspaceUri);
    const _workDir = await fs.readDirectory(workspaceUri);
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
  }
  store.set("initialExclude", workspaceValue);
  // store.set("excludeList", workspaceValue || {});
}
