import { combineReducers } from "redux";
import { tasksReducer } from "../reducers";

const reducer = combineReducers({
  tasks: tasksReducer,
});

export default reducer;
