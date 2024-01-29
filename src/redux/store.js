import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/AuthSlice";
import eventReducer from "./features/EventSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
});

export default store;
