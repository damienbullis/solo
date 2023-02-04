import { ConfigurationTarget, workspace } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";

const { getConfiguration } = workspace;

//#region Types

export type FilesExcludeType = { [key: string]: boolean };
export type SoloModeType = boolean;
export type SoloSolodFilesType = string[];
export type SoloInitialExcludeType = { [key: string]: boolean } | false;
export type SoloTypes =
  | SoloModeType
  | SoloSolodFilesType
  | SoloInitialExcludeType
  | FilesExcludeType;

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
  $LOG("inspectConfig", LOG_TYPES.SYSTEM_SUCCESS, {
    config,
    prop,
    globalValue,
    defaultValue,
  });
  if (key === "files.exclude") {
    // Dont return default values for files.exclude
    return globalValue || null;
  }
  return globalValue ?? defaultValue ?? null;
}

export function updateConfig<K extends FirstKey, S extends SecondKey<K>>(
  key: `${K}.${S}`,
  value: getType<K, S>
) {
  const [config, prop] = key.split(".");
  const configObject = getConfiguration(config);
  try {
    configObject.update(prop, value, ConfigurationTarget.Global);
    $LOG("updateConfig", LOG_TYPES.SYSTEM_SUCCESS, {
      config,
      prop,
      value,
    });
  } catch (error) {
    $LOG("updateConfig", LOG_TYPES.SYSTEM_ERROR, {
      config,
      prop,
      value,
      error,
    });
  }
}
