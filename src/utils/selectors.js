export const selectIsAuthenticatedUser = () => {
  return (state) => state.auth;
};

export const selectUser = (state) => state.user;
