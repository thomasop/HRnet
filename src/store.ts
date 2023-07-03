import { configureStore } from "@reduxjs/toolkit";
import Array from "./features/Array";
import Modal from "./features/Modal";

export const store = configureStore({
  reducer: {
    Array: Array.reducer,
    Modal: Modal.reducer,
  },
  middleware: (getDefaultMiddleware) => [
      ...getDefaultMiddleware({
          serializableCheck: false
      }),
  ],
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;