import authReducer from "../features/auth";
import userReducer from "../features/user";
import { configureStore } from "@reduxjs/toolkit";

export default configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});
