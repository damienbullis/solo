import * as vs from "vscode";
import initializeMode from "./mode";
import initializeExclude from "./exclude";
import initializeSolodFiles from "./solodFiles";
import { $LOG, LOG_TYPES } from "../helpers";

const { workspace } = vs;

export default function (context: vs.ExtensionContext) {
  $LOG("Initialize Extension", LOG_TYPES.SYSTEM);

  initializeMode();
  initializeExclude();
  initializeSolodFiles();

  $LOG("Initialize Extension - Complete", LOG_TYPES.SYSTEM_SUCCESS);
}
