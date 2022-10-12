import { selectUser, selectAuthToken } from "../utils/selectors";
import { createAction, createReducer } from "@reduxjs/toolkit";
import { authLogout } from "../features/auth";

const initialState = {
  status: "void",
  data: null,
  error: null,
};

export const userFetching = createAction("user/fetching");
export const userResolved = createAction("user/resolved");
export const userRejected = createAction("user/rejected");

export const userUpdate = createAction("user/update");

export async function fetchUser(store) {
  const status = selectUser(store.getState()).status;
  const token = selectAuthToken(store.getState());
  if (status === "pending" || status === "updating") {
    return;
  }
  store.dispatch(userFetching());
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/user/profile",
      requestOptions
    );
    const data = await response.json();
    store.dispatch(userResolved(data));
  } catch (error) {
    store.dispatch(userRejected(error.toString()));
  }
}

export async function updateUser(store, payload) {
  const token = selectAuthToken(store.getState());
  try {
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify({
        firstName: payload.firstName,
        lastName: payload.lastName,
      }),
    };
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/user/profile",
      requestOptions
    );
    const data = await response.json();
    if (data.status !== 200) return;
    store.dispatch(userUpdate());
    fetchUser(store, token);
  } catch (error) {
    console.log(error);
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
    .addCase(authLogout, (draft, action) => {
      draft.error = initialState.error;
      draft.data = initialState.data;
      draft.status = initialState.status;
    })
    .addCase(userUpdate, (draft, action) => {})
);
