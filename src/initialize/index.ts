import initializeMode from "./mode";
import initializeExcludeList from "./excludeList";
import initializeSoloList from "./soloList";

export default function initializeExtension() {
  console.log("initializing extension");
  initializeMode();
  initializeExcludeList();
  initializeSoloList();
}
