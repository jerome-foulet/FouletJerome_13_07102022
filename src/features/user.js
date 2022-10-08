import { selectUser } from "../utils/selectors";
import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  status: "void",
  data: null,
  error: null,
};

//const userFetching = () => ({ type: FETCHING });
export const userFetching = createAction("user/fetching");
//const userResolved = (data) => ({ type: RESOLVED, payload: data });
export const userResolved = createAction("user/resolved");
//const userRejected = (error) => ({ type: REJECTED, payload: error });
export const userRejected = createAction("user/rejected");

export async function fetchOrUpdateUser(store) {
  const status = selectUser(store.getState()).status;
  if (status === "pending" || status === "updating") {
    return;
  }
  store.dispatch(userFetching());
  try {
    const response = await fetch("http://localhost:3001/api/v1/user/profile");
    const data = await response.json();
    store.dispatch(userResolved(data));
  } catch (error) {
    store.dispatch(userRejected(error.toString()));
  }
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(userFetching, (draft, action) => {
      if (draft.status === "void") {
        draft.status = "pending";
        return;
      }
      if (draft.status === "rejected") {
        draft.error = null;
        draft.status = "pending";
        return;
      }
      if (draft.status === "resolved") {
        draft.status = "updating";
        return;
      }
      return;
    })
    .addCase(userResolved, (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.data = action.payload;
        draft.status = "resolved";
      }
      return;
    })
    .addCase(userRejected, (draft, action) => {
      if (draft.status === "pending" || draft.status === "updating") {
        draft.error = action.payload;
        draft.data = null;
        draft.status = "rejected";
      }
      return;
    })
);
