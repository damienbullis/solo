import * as vs from "vscode";
import { $LOG, inspectConfig, LOG_TYPES } from "../helpers";

const { commands } = vs;

export default async function () {
  $LOG("Initialize Solo List", LOG_TYPES.SYSTEM);

  const solodFiles = inspectConfig("solo.solodFiles");

  // Might need to a check here to see if the workspace is the previous workspace??
  $LOG("set context for solodFiles", LOG_TYPES.SYSTEM_WARN, { solodFiles });
  await commands.executeCommand("setContext", "solo.solodFiles", solodFiles);

  $LOG("Initialize Solo List - Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
