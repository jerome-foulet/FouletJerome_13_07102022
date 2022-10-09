export const selectIsAuthenticatedUser = (state) => state.auth.status;
export const selectAuthToken = (state) => state.auth.token;

export const selectUser = (state) => state.user;
export const selectUserFirstName = (state) =>
  state.user.data ? state.user.data.body.firstName : "";
export const selectUserLastName = (state) =>
  state.user.data ? state.user.data.body.lastName : "";
