import DataTableFilter from "./features/DataTableFilter";
import Modal from "./features/Modal";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import DataTable from "./features/DataTable";

const reducers = combineReducers({
  DataTableFilter: DataTableFilter.reducer,
  Modal: Modal.reducer,
  DataTable: DataTable.reducer,
});

export const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["DataTable"],
  blacklist: ["Modal", "DataTableFilter"],
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export let persistor = persistStore(store);
