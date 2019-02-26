import { combineReducers } from "redux";
import columns from "./columns";
import tasks from "./tasks";

export default combineReducers({
  columns,
  tasks
});
