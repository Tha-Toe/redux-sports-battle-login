import { configureStore } from "@reduxjs/toolkit";

import userReducer from "./feature/userSlice";
import thunk from "redux-thunk";
import logger from "redux-logger";
export const store = configureStore({
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware({
  //     thunk: {
  //       extraArgument: myCustomApiService,
  //     },
  //     serializableCheck: false,
  //   }),
  middleware: [thunk],

  reducer: {
    user: userReducer,
  },
});
