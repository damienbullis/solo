import { ConfigurationTarget, Uri, workspace } from "vscode";
import store from "../store";

export default async function () {
  const filesConfig = workspace.getConfiguration("files");
  const res = filesConfig.inspect("exclude");

  // check workspace settings in res
  const { defaultValue, globalValue, workspaceValue } = res || {};
  // get the uri of the workspace folder
  const workspaceUri = workspace.workspaceFolders?.[0].uri;
  // get the root uri
  if (workspaceUri) {
    store.set("workspaceUri", workspaceUri);
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
  }
  store.set(
    "initialExclude",
    (workspaceValue as { [key: string]: boolean }) || {}
  );
  store.set("excludeList", workspaceValue || {});
}
