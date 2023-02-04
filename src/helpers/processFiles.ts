import { Uri, workspace } from "vscode";
import { $LOG, LOG_TYPES } from ".";
import { inspectConfig, updateConfig } from "./inspectConfig";

export default async function () {
  $LOG("Processing Solod Files", LOG_TYPES.SYSTEM);

  // First check solodFiles
  // Second check if soloMode is enabled
  // If enabled then we need to update the exclude list
  // to be the opposite of the solodFiles list

  const solodFiles = inspectConfig("solo.solodFiles");

  if (solodFiles === null) {
    $LOG("Failed to retrieve solodFiles", LOG_TYPES.SYSTEM_ERROR);
    return;
  }

  const soloMode = inspectConfig("solo.soloMode");

  if (soloMode === null) {
    $LOG("Failed to retrieve soloMode", LOG_TYPES.SYSTEM_ERROR);
    return;
  }

  if (soloMode === false) {
    $LOG("Solo Mode is disabled");
    const initialExclude = inspectConfig("solo.initialExclude");

    if (initialExclude === null) {
      $LOG("Failed to retrieve initialExclude", LOG_TYPES.SYSTEM_ERROR);
      return;
    }
    updateConfig("files.exclude", initialExclude || undefined);
  } else {
    $LOG("Solo Mode is disabled");
    updateConfig("files.exclude", {
      "*.*": true,
    });
  }

  const excludeList = solodFiles.map((file: string) => {
    return `!${file}`;
  });
  $LOG("Exclude List", LOG_TYPES.SYSTEM_WARN, { excludeList });
}
