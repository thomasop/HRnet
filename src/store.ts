import DataTableFilter from "./features/DataTableFilter";
import Modal from "./features/Modal";
import {
  persistReducer,
  persistStore,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
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
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export let persistor = persistStore(store);
