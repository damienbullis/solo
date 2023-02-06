import * as vs from "vscode";
import { $LOG, LOG_TYPES } from ".";

const { workspace } = vs;

const { getConfiguration } = workspace;

//#region Types

type FilesExcludeType = Record<string, boolean> | undefined;
type SoloModeType = boolean;
type SoloSolodFilesType = string[];
type SoloInitialExcludeType = Record<string, boolean> | false;

type FirstKey = "solo" | "files";
type SecondKey<FK = string> = FK extends "solo"
  ? "soloMode" | "solodFiles" | "initialExclude"
  : FK extends "files"
  ? "exclude"
  : never;

type getType<First, Second> = First extends "solo"
  ? Second extends "soloMode"
    ? SoloModeType
    : Second extends "solodFiles"
    ? SoloSolodFilesType
    : Second extends "initialExclude"
    ? SoloInitialExcludeType
    : never
  : First extends "files"
  ? Second extends "exclude"
    ? FilesExcludeType
    : never
  : never;

//#endregion

export function inspectConfig<K extends FirstKey, S extends SecondKey<K>>(
  key: `${K}.${S}`
) {
  const [config, prop] = key.split(".");
  const configObject = getConfiguration(config);
  const { globalValue, defaultValue } =
    configObject.inspect<getType<K, S>>(prop) || {};
  $LOG("inspectConfig ▼ ▼ ▼", LOG_TYPES.STORE, {
    config,
    prop,
    globalValue,
    defaultValue,
  });
  if (key === "files.exclude") {
    // Dont return default values for files.exclude
    return globalValue as getType<K, S>;
  }
  return (globalValue ?? defaultValue) as getType<K, S>;
}

export async function updateConfig<K extends FirstKey, S extends SecondKey<K>>(
  key: `${K}.${S}`,
  value: getType<K, S>
) {
  const [config, prop] = key.split(".");
  const configObject = getConfiguration(config);
  try {
    await configObject.update(prop, value, vs.ConfigurationTarget.Global);
    $LOG("updateConfig ▼ ▼ ▼", LOG_TYPES.STORE, {
      config,
      prop,
      value,
    });
  } catch (error) {
    $LOG("updateConfig ▼ ▼ ▼", LOG_TYPES.SYSTEM_ERROR, {
      config,
      prop,
      value,
      error,
    });
  }
}
