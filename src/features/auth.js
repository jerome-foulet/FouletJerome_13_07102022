import { createAction, createReducer } from "@reduxjs/toolkit";

const initialState = {
  status: false,
  token: "",
};

export const authLogin = createAction("auth/login");
export const authLogout = createAction("auth/logout");

export async function postLogin(store, credentials) {
  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.userEmail,
        password: credentials.userPassword,
      }),
    };
    const response = await fetch(
      process.env.REACT_APP_BACKEND_URL + "/api/v1/user/login",
      requestOptions
    );
    const data = await response.json();
    if (data.status !== 200) return;
    store.dispatch(authLogin(data.body.token));
    return true;
  } catch (error) {}
}

export function logout(store) {
  store.dispatch(authLogout());
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(authLogin, (draft, action) => {
      draft.token = action.payload;
      draft.status = true;
      return;
    })
    .addCase(authLogout, (draft, action) => {
      draft.status = false;
      draft.token = "";
      return;
    })
);
