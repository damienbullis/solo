import * as vs from "vscode";
import { log, inspectConfig } from "../helpers";

const { commands } = vs;

export default async function () {
  log.info("Initialize Solo List");

  const solodFiles = inspectConfig("solo.solodFiles");

  // Might need to a check here to see if the workspace is the previous workspace??
  log.debug("set context for solodFiles");
  log.info({ solodFiles });
  await commands.executeCommand("setContext", "solo.solodFiles", solodFiles);
}
