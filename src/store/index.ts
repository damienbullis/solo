import { Uri } from "vscode";

export type TypeInitStore = {
  mode: boolean;
  workspaceDir: [string, Uri][];
  workspaceUri: Uri;
  initialExclude: { [key: string]: boolean };
  initialSolo: unknown;
  excludeList: unknown;
  soloList: unknown;
};

// FIXME: fix some of the types
const initStore: TypeInitStore = {
  mode: false,
  workspaceDir: [],
  workspaceUri: {} as Uri,
  // for resetting the exclude list
  initialExclude: {},
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

export type TypeStore = ReturnType<typeof createStore>;
export default store;
