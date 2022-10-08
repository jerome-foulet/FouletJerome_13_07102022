import { combineReducers, createStore } from "redux";
import authReducer from "../features/auth";

const reduxDevtools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

const reducer = combineReducers({
  auth: authReducer,
});

const store = createStore(reducer, reduxDevtools);

export default store;
