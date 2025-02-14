import { configureStore } from "@reduxjs/toolkit";
import chatsSlice from "./slices/chats.slice";

const store = configureStore({
  reducer: {
    chats: chatsSlice,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
