import { createStore, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import { thunk } from "redux-thunk";
import reducer from "./rootReducer";

const logger = createLogger({});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;
