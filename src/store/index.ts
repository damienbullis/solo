import { Uri } from "vscode";

export type TypeInitStore = {
  mode: boolean;
  workspaceDir: [string, Uri][];
  workspaceUri: Uri | null;
  initialExclude: { [key: string]: boolean } | undefined;
  initialSolo: unknown;
  excludeList: { [key: string]: boolean };
  soloList: unknown;
};

// FIXME: fix some of the types
const initStore: TypeInitStore = {
  mode: false,
  workspaceDir: [],
  workspaceUri: null,
  // for resetting the exclude list
  initialExclude: undefined,
  // for resetting the solo list
  initialSolo: {},
  excludeList: {},
  soloList: {},
};

function createStore() {
  console.log("creating store");
  const store = { ...initStore };
  return {
    set: <K extends keyof TypeInitStore>(key: K, value: TypeInitStore[K]) => {
      console.log(`setting store with `, { [key]: value });
      store[key] = value;
    },
    get: <K extends keyof TypeInitStore>(key: K) => {
      console.log(`getting key in store ${key}`);
      return store[key];
    },
  };
}

const store = createStore();

export default store;
