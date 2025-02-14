import { createAsyncThunk } from "@reduxjs/toolkit";
import client from "../axios";
import { API_ENDPOINTS } from "../constants/endpoints";

export const createChat = createAsyncThunk("chats/createChat", async () => {
  try {
    const { data } = await client.get(API_ENDPOINTS.createChat);
    return data;
  } catch (error) {
    throw error;
  }
});

export const addMessage = createAsyncThunk(
  "chats/addMessage",
  async ({ chatId, message }: { chatId: string; message: string }) => {
    try {
      const { data } = await client.post(API_ENDPOINTS.addMessage, {
        chatId,
        message,
        sender: "user",
      });

      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getMessages = createAsyncThunk(
  "chats/getChat",
  async (id: string) => {
    try {
      const { data } = await client.get(API_ENDPOINTS.getChat + id);
      return data;
    } catch (error) {
      throw error;
    }
  }
);

export const getAllChats = createAsyncThunk("chats/getAllChats", async () => {
  try {
    const { data } = await client.get(API_ENDPOINTS.getAllChats);
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
});
