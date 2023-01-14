import { ConfigurationTarget, Uri, workspace } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";
import store from "../store";

const { getConfiguration, fs, workspaceFolders } = workspace;

export default async function () {
  $LOG("initializeExcludeList", LOG_TYPES.SYSTEM);
  // check workspace settings in res
  const res = getConfiguration("files").inspect<{ [key: string]: boolean }>(
    "exclude"
  );
  const { workspaceValue } = res || {};
  // get the uri of the workspace folder
  const workspaceUri = workspaceFolders?.[0].uri;
  // get the root uri
  if (workspaceUri) {
    // set the root uri
    store.set("workspaceUri", workspaceUri);
    // get the workspace directory
    const workspaceDirectory = await fs.readDirectory(workspaceUri);

    // REFACTOR: possibly dont care about the mapping of the workspace directory???
    // map the workspace directory to a tuple of [name, uri]
    const next = workspaceDirectory.map(([name]) => {
      // get the uri
      const uri = workspaceUri.with({ path: `${workspaceUri.path}/${name}` });
      return [name, uri] as [string, Uri];
    });
    // set the workspace dir
    store.set("workspaceDir", next);
  }
  if (workspaceValue) {
    // set the initial exclude list
    store.set("excludeList", workspaceValue);
    await workspace
      .getConfiguration("solo")
      .update("initialExclude", workspaceValue, ConfigurationTarget.Workspace);
  }

  return Promise.resolve();
}
