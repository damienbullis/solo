import * as vs from "vscode";
import initializeMode from "./mode";
import initializeExclude from "./exclude";
import initializeSolodFiles from "./solodFiles";
import { log } from "../helpers";

const { workspace } = vs;

export default async function (context: vs.ExtensionContext) {
  log.info("Initialize Extension");

  await initializeMode();
  await initializeExclude();
  await initializeSolodFiles();
}
