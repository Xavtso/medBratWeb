import React, { useEffect } from "react";
import "./Sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import { createChat, getAllChats } from "../../services/chat.service";
import { AppDispatch } from "../../store";
import { Chat } from "../../types";
import { useNavigate } from "react-router-dom";

const Sidebar: React.FC = () => {
  const { chats } = useSelector((state: any) => state.chats);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleNewChat = async () => {
    try {
      // Припускаємо, що createChat повертає проміс з даними нового чату
      const newChat = await dispatch(createChat()).unwrap();
      navigate(`/chat/${newChat._id}`);
    } catch (error) {
      console.error("Помилка при створенні нового чату:", error);
    }
  };

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  return (
    <aside className="sidebar">
      <button className="new-chat-button" onClick={handleNewChat}>
        + New Chat
      </button>
      <div className="chats">
        {chats?.map((chat: Chat, index: number) => (
          <div
            key={chat._id || index}
            className="chat-item"
            onClick={() => navigate(`/chat/${chat._id}`)}
          >
            {chat.title || `Chat ${index + 1}`}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
