import { configureStore } from "@reduxjs/toolkit";
import chatsSlice from "./slices/chats.slice";
import authReducer from "./slices/auth.slice";

const store = configureStore({
  reducer: {
    chats: chatsSlice,
    auth: authReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
