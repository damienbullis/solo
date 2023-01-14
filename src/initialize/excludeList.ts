import { ConfigurationTarget, Uri, workspace } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";
import store from "../store";

const { getConfiguration, fs, workspaceFolders } = workspace;

export default async function () {
  $LOG("Initialize Exclude List", LOG_TYPES.SYSTEM);
  // check workspace settings in res
  const res = getConfiguration("files").inspect<{ [key: string]: boolean }>(
    "exclude"
  );
  const { globalValue, defaultValue, workspaceValue } = res || {};
  // get the uri of the workspace folder
  const workspaceUri = workspaceFolders?.[0].uri;
  // get the root uri
  if (workspaceUri) {
    // set the root uri
    store.set("workspaceUri", workspaceUri);
    // get the workspace directory
    const workspaceDirectory = await fs.readDirectory(workspaceUri);

    const removeDirs = {
      ...defaultValue,
      ...globalValue,
    };
    const filterTheseKeys = Object.keys(removeDirs) as string[];

    const next = workspaceDirectory
      .filter(([name]) => {
        const hasMatch = filterTheseKeys.findIndex((n) => n.includes(name));
        return hasMatch === -1;
      })
      .map(([name]) => {
        // get the uri
        const uri = workspaceUri.with({ path: `${workspaceUri.path}/${name}` });
        return [name, uri] as [string, Uri];
      });
    // set the workspace dir
    store.set("workspaceDir", next);
  }
  if (workspaceValue) {
    // set the initial exclude list
    // store.set("excludeList", workspaceValue);
    await workspace
      .getConfiguration("solo")
      .update("initialExclude", workspaceValue, ConfigurationTarget.Workspace);
  }

  return Promise.resolve();
}
