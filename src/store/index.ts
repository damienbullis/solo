import { Uri } from "vscode";

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
  console.log("creating store");
  const store = { ...initStore };
  return {
    set: <K extends keyof TypeInitStore>(key: K, value: TypeInitStore[K]) => {
      console.log(`SET_STORE: `, { [key]: value });
      store[key] = value;
    },
    get: <K extends keyof TypeInitStore>(key: K) => {
      console.log(`STORE[${key}]: `, store[key]);
      return store[key];
    },
  };
}

const store = createStore();

export default store;
