import Array from "./features/Array";
import Modal from "./features/Modal";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  persistStore,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit";
import Data from "./features/Data";

const reducers = combineReducers({
  Array: Array.reducer,
    Modal: Modal.reducer,
    Data: Data.reducer,
});

export const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["Data"]
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  })
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export let persistor = persistStore(store);