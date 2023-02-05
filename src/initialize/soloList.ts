import * as vs from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";
import { inspectConfig } from "../helpers/inspectConfig";

const { commands } = vs;

export default function () {
  $LOG("Initialize Solo List", LOG_TYPES.SYSTEM);

  const solodFiles = inspectConfig("solo.solodFiles");

  // Might need to a check here to see if the workspace is the previous workspace??
  $LOG("set context for solodFiles", LOG_TYPES.SYSTEM_WARN, { solodFiles });
  commands.executeCommand("setContext", "solo.solodFiles", solodFiles);

  $LOG("Initialize Solo List Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
