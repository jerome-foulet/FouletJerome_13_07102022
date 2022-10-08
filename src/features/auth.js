const authReducer = (state = false, action) => {
  if (action.type === "loginUser") {
    return !state;
  }
  if (action.type === "logoutUser") {
    return !state;
  }
  return state;
};

export default authReducer;
