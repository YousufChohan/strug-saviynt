import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import customerReducer from "./features/CustomerSlice";

const persistConfig = {
  key: "root",
  storage,
  // Add any additional configuration options if needed
};

const persistedCustomerReducer = persistReducer(persistConfig, customerReducer);

const store = configureStore({
  reducer: {
    customers: persistedCustomerReducer,
  },
});

const persistor = persistStore(store);

export { store, persistor };
