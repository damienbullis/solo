import { Uri } from "vscode";
import { $LOG, LOG_TYPES } from "../helpers";

export type TypeInitStore = {
  workspaceDir: [string, Uri][];
  workspaceUri: Uri | null;
  initialExclude: { [key: string]: boolean } | undefined;
  initialSolo: string[];
  excludeList: { [key: string]: boolean };
};

const initStore: TypeInitStore = {
  workspaceDir: [],
  workspaceUri: null,
  // for resetting the exclude list
  initialExclude: undefined,
  // for resetting the solo list
  initialSolo: [],
  excludeList: {},
};

function createStore() {
  $LOG(`Creating Store`, LOG_TYPES.SYSTEM);
  const store = { ...initStore };
  return {
    set: <K extends keyof TypeInitStore>(key: K, value: TypeInitStore[K]) => {
      $LOG(`SET_STORE: `, LOG_TYPES.STORE, { [key]: value });
      store[key] = value;
    },
    get: <K extends keyof TypeInitStore>(key: K) => {
      $LOG(`STORE[${key}]: `, LOG_TYPES.STORE, store[key]);
      return store[key];
    },
  };
}

const store = createStore();

export default store;
