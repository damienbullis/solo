import { Uri } from "vscode";

export type TypeInitStore = {
  mode: boolean;
  workspaceDir: [string, Uri][];
  initialExclude: unknown;
  initialSolo: unknown;
  excludeList: unknown;
  soloList: unknown;
};
// FIXME: fix some of the types
const initStore: TypeInitStore = {
  mode: false,
  workspaceDir: [],
  // for resetting the exclude list
  initialExclude: [],
  // for resetting the solo list
  initialSolo: [],
  excludeList: [],
  soloList: [],
};

function createStore() {
  const store = { ...initStore };
  return {
    resetStore: () => {
      return { ...initStore };
    },
    set: <K extends keyof TypeInitStore>(key: K, value: TypeInitStore[K]) => {
      store[key] = value;
    },
    get: (key: keyof TypeInitStore) => {
      return store[key];
    },
  };
}

export type TypeStore = ReturnType<typeof createStore>;
export default createStore();
