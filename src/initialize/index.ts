import initializeMode from "./mode";
import initializeExcludeList from "./excludeList";
import initializeSoloList from "./soloList";
import { ConfigurationTarget, ExtensionContext, Uri, workspace } from "vscode";

export type StoreType = {
  mode: boolean;
  workspaceDir: [string, Uri][];
  initialExclude: unknown;
  initialSolo: unknown;
  excludeList: unknown;
  soloList: unknown;
};

const store: StoreType = {
  mode: false,
  workspaceDir: [],
  // for resetting the exclude list
  initialExclude: [],
  // for resetting the solo list
  initialSolo: [],
  excludeList: [],
  soloList: [],
};

export default function initializeExtension(context: ExtensionContext) {
  console.log("initializing extension");
  // set up listener on workspace config change on files.exclude
  context.subscriptions.push(
    workspace.onDidChangeConfiguration((e) => {
      if (
        e.affectsConfiguration(
          "files.exclude",
          workspace.workspaceFolders?.[0].uri
        )
      ) {
        console.log("files.exclude changed", { store });
      }
    })
  );

  initializeMode(store);
  initializeExcludeList(store);
  initializeSoloList(store);
}
