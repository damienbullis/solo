import { commands, ExtensionContext } from "vscode";

export default (context: ExtensionContext) => {
  const { subscriptions } = context;
  subscriptions.push(
    commands.registerCommand("solo.solo.add", (...args) => {
      console.log("solo.add", { args });
      // NEXT: solo.add
      // set the selected file/dir in `include`
      // add the selected file/dir to store.solodFiles
      // NEXT: check workspace
      // get all files and folders in the workspace
      // filter out the selected file/dir
      // combine the filtered files/folders with the current excluded files
      // NEXT: fn's to use
      // fn to get the current workspace files and folders
      // fn to take the current workspace files and folders and filter out the selected file/dir
      // fn to combine the filtered files/folders with the current excluded files
      // fn to update the exclude list
    }),
    commands.registerCommand("solo.solo.remove", () => {
      console.log("solo.remove");
      // NEXT: solo.remove
      // fn to remove the selected file/dir from store.solodFiles
      // fn to add the selected file/dir to the current excluded files
      // fn to update the exclude list
    }),
    commands.registerCommand("solo.solo.reset", () => {
      console.log("solo.reset");
      // NEXT: solo.reset
      // reset the exclude list to the initial excluded files
    })
  );
};
