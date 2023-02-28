import * as vs from "vscode";
import { log, inspectConfig, updateConfig } from "../helpers";

const { commands } = vs;

export default async function () {
  log.info("Initialize Solo List");

  const solodFiles = inspectConfig("solo.solodFiles");

  // check for multiple instances of vscode open
  if (vs.workspace.workspaceFolders) {
    log.info("Checking for multiple instances of vscode open");
    const latestWorkspace = vs.workspace.workspaceFolders.slice(-1)[0];
    // check if solo'd files include the latest (active) workspace
    const soloingActiveWorkspace =
      solodFiles.length && solodFiles[0].includes(latestWorkspace.uri.fsPath);

    if (!soloingActiveWorkspace) {
      // Clear the solodFiles
      log.warn("Not soloing active workspace - Clearing solodFiles");
      await commands.executeCommand("setContext", "solo.solodFiles", []);
      await updateConfig("solo.solodFiles", []);
      return; // exit early
    }
  }

  // Might need to a check here to see if the workspace is the previous workspace??
  log.debug("set context for solodFiles");
  log.info({ solodFiles });
  await commands.executeCommand("setContext", "solo.solodFiles", solodFiles);
}
