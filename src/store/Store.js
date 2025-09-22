import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

/**
 * Redux store configuration
 * Combines all reducers for the app
 */
export const store = configureStore({
  reducer: {
    // "user" slice of state is handled by userReducer
    user: userReducer,
  },
});


