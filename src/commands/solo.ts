import {
  commands,
  ConfigurationTarget,
  ExtensionContext,
  workspace,
} from "vscode";
import store from "../store";

export default (context: ExtensionContext) => {
  const { subscriptions } = context;
  subscriptions.push(
    commands.registerCommand("solo.solo.add", (...args) => {
      // check if multiple items have been selected
      // if so, add all of them to the solo list
      // if not, add the current file to the solo list
      const [, ...rest] = args;
      const _soloList = [...store.get("initialSolo")];
      if (rest) {
        for (const uri of rest[0]) {
          if (!_soloList.includes(uri.path)) {
            _soloList.push(uri.path);
          }
        }
      }
      workspace
        .getConfiguration("solo")
        .update("solodFiles", _soloList, ConfigurationTarget.Workspace);
      commands.executeCommand("setContext", "solo.solodFiles", _soloList);
      console.log("solo.add", _soloList);
    }),
    commands.registerCommand("solo.solo.remove", () => {
      console.log("solo.remove");
    }),
    commands.registerCommand("solo.solo.reset", () => {
      console.log("solo.reset");
    }),
    commands.registerCommand("solo.solo.update", () => {
      console.log("solo.update");
      // this is a command that will look at the solo list & the exclude list & the workspace folders
      // and build a new exclude list
      // then it will update the exclude list in the workspace config
      // then it will update the exclude list in the store
      // then it will update the context
    })
  );
};
