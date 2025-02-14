// chatsSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { Chat } from "../../types";
import {
  createChat,
  getMessages,
  addMessage,
  getAllChats,
} from "../../services/chat.service";

const chatsSlice = createSlice({
  name: "chats",
  initialState: {
    chats: [] as Chat[],
    currentChat: null as Chat | null,
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createChat.fulfilled, (state, action) => {
        state.chats.push(action.payload);
        state.currentChat = action.payload;
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        console.log(action.payload);
        state.currentChat = action.payload;
      })
      .addCase(addMessage.fulfilled, (state, action) => {
        if (state.currentChat) {
          // Якщо повернувся об'єкт з двома повідомленнями, додаємо обидва
          if (action.payload.userMessage && action.payload.botMessage) {
            state.currentChat.messages.push(action.payload.userMessage);
            state.currentChat.messages.push(action.payload.botMessage);
          } else {
            // Якщо повернувся один об'єкт, просто додаємо його
            state.currentChat.messages.push(action.payload);
          }
        }
      })
      .addCase(getAllChats.fulfilled, (state, action) => {
        state.chats = action.payload;
      });
  },
});

export default chatsSlice.reducer;
