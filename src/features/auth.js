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
    //console.log(response);
    const data = await response.json();
    //console.log(data);
    if (data.status === 400) return;
    store.dispatch(authLogin(data.body.token));
  } catch (error) {}
}

export function logout(store) {
  store.dispatch(authLogout());
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(authLogin, (draft, action) => {
      draft.status = !draft.status;
      draft.token = action.payload;
      return;
    })
    .addCase(authLogout, (draft, action) => {
      draft.status = !draft.status;
      draft.token = "";
      return;
    })
);
