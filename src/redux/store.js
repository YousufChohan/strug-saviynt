import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "./features/AuthSlice";
import eventReducer from "./features/EventSlice";

const persistConfig = {
  key: "root",
  storage,
  // Add any additional configuration options if needed
};

const persistedAuthReducer = persistReducer(persistConfig, authReducer);
const persistedEventReducer = persistReducer(persistConfig, eventReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    events: persistedEventReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };

// //Store before redux persist.

// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./features/AuthSlice";
// import eventReducer from "./features/EventSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     events: eventReducer,
//   },
// });

// export default store;
