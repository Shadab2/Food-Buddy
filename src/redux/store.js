import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./userSlice";

const rootReducer = combineReducers({ user: userReducer });
const persistorConfig = {
  key: "root",
  storage,
};
const persistedReducer = persistReducer(persistorConfig, rootReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

const persistedStore = persistStore(store);

export { store, persistedStore };
