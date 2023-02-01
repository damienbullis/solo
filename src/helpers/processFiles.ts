import { Uri, workspace } from "vscode";
import { $LOG, LOG_TYPES } from ".";

export default async function (solodFiles: string[]) {
  $LOG("Processing Solod Files Start", LOG_TYPES.SYSTEM, { ...solodFiles });
}
