import { createStore } from "redux";
import produce from "immer";

const initialState = {
  isAuthenticatedUser: false,
};

export const loginUser = () => ({
  type: "loginUser",
});
export const logoutUser = () => ({
  type: "loginUser",
});

function reducer(state, action) {
  if (action.type === "loginUser") {
    return produce(state, (draft) => {
      draft.isAuthenticatedUser = !draft.isAuthenticatedUser;
    });
  }
  if (action.type === "logoutUser") {
    return produce(state, (draft) => {
      draft.isAuthenticatedUser = !draft.isAuthenticatedUser;
    });
  }
  return state;
}

export const store = createStore(reducer, initialState);
