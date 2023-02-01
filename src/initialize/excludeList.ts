import { ConfigurationTarget, Uri, workspace } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";

const { getConfiguration, fs, workspaceFolders } = workspace;

type ExcludeListType = { [key: string]: boolean };

export default async function () {
  $LOG("Initialize Exclude List", LOG_TYPES.SYSTEM);

  // get the files and solo configurations
  // TODO: turn this into a helper function with types to prevent mistakes
  const filesConfig = getConfiguration("files");
  const soloConfig = getConfiguration("solo");

  // get the current exclude list

  const currentExcludeList = filesConfig.inspect<ExcludeListType>("exclude");

  const soloMode = soloConfig.inspect("mode");

  const { globalValue, defaultValue } = currentExcludeList || {};

  // if the current exclude list is null, then set the exclude list to the default exclude list
  if (globalValue === null) {
    $LOG("no exclude list to initialize, setting to default");

    await filesConfig.update(
      "exclude",
      defaultValue,
      ConfigurationTarget.Global
    );
  } else {
    // add the current exclude list to the initial exclude list
    $LOG("initializing exclude list");
    const { globalValue: initialGV, defaultValue: initialDV } =
      soloConfig.inspect<ExcludeListType | null>("initialExclude") || {};
    const then = await soloConfig.update(
      "initialExclude",
      initialGV || initialDV || null,
      ConfigurationTarget.Global
    );
    $LOG("then", LOG_TYPES.SYSTEM_WARN, {
      then,
      globalValue,
      defaultValue,
      initialGV,
      initialDV,
      soloMode,
    });

    // if mode is solo, than set the exclude list to {}
    if (soloMode?.globalValue) {
      $LOG("mode is solo, setting exclude list to empty");

      await filesConfig.update("exclude", {}, ConfigurationTarget.Global);
    } else {
      // if mode is not solo, than set the exclude list to the initial exclude list
      $LOG(
        "mode is not solo, no need to set exclude list because it is already set to the initial exclude list"
      );
    }
  }

  return Promise.resolve();
}
