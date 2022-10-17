import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./feature/userSlice";
export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  reducer: {
    user: userReducer,
  },
});
