import React, { useEffect, useState } from "react";
import "./Sidebar.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  createChat,
  deleteChat,
  getAllChats,
} from "../../services/chat.service";
import { AppDispatch } from "../../store";
import { Chat } from "../../types";
import { useNavigate } from "react-router-dom";
import { TbLayoutSidebarLeftExpand } from "react-icons/tb";
import { BsChatSquareHeartFill } from "react-icons/bs";
import { AiOutlineDelete } from "react-icons/ai";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import { useParams } from "react-router-dom";

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  isSidebarOpen,
  setIsSidebarOpen,
}) => {
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [menuOpenChatId, setMenuOpenChatId] = useState<string | null>(null);

  const { chatId } = useParams<{ chatId?: string }>();

  const { chats } = useSelector((state: any) => state.chats);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleNewChat = async () => {
    try {
      const newChat = await dispatch(createChat()).unwrap();
      navigate(`/chat/${newChat._id}`);
      setSelectedChatId(newChat._id);
    } catch (error) {
      console.error("Помилка при створенні нового чату:", error);
    }
  };

  const handleClickOnChat = (chatId: string) => {
    setSelectedChatId(chatId);
    navigate(`/chat/${chatId}`);
  };

  const handleDeleteChat = async (chatId: string) => {
    try {
      console.log(chatId, "delete chat");

      await dispatch(deleteChat(chatId)).unwrap();
      if (selectedChatId === chatId) {
        setSelectedChatId(null);
        navigate("/");
      }
      setMenuOpenChatId(null);
      dispatch(getAllChats());
    } catch (err) {
      console.error("Помилка при видаленні чату:", err);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      if (!target.closest(".chat-menu") && !target.closest(".chat-menu-icon")) {
        setMenuOpenChatId(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(getAllChats());
  }, [dispatch]);

  useEffect(() => {
    if (chatId) {
      setSelectedChatId(chatId);
    }
  }, [chatId]);

  if (!isSidebarOpen) {
    return (
      <aside className="sidebar collapsed">
        <button
          className="toggle-button"
          onClick={() => setIsSidebarOpen(true)}
        >
          <TbLayoutSidebarLeftExpand size={25} />
        </button>
      </aside>
    );
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button
          className="toggle-button"
          onClick={() => setIsSidebarOpen(false)}
        >
          <TbLayoutSidebarLeftExpand size={25} />
        </button>
        <button onClick={handleNewChat} className="new-chat-button">
          <span>New Chat</span>
          <BsChatSquareHeartFill />
        </button>
      </div>

      <div className="chats">
        {chats?.map((chat: Chat, index: number) => (
          <div
            key={chat._id || index}
            className={`chat-item ${
              selectedChatId === chat._id ? "active" : ""
            }`}
            onClick={() => handleClickOnChat(chat._id)}
          >
            <div className="chat-title">
              {chat.title || `Chat ${index + 1}`}
            </div>

            <div className="chat-actions">
              <BiDotsHorizontalRounded
                size={18}
                className="chat-menu-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  setMenuOpenChatId(
                    menuOpenChatId === chat._id ? null : chat._id
                  );
                }}
              />

              {menuOpenChatId === chat._id && (
                <div
                  className="chat-menu"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(chat._id);
                  }}
                >
                  <button className="delete-chat-button">
                    <span>Delete</span>
                    <AiOutlineDelete color="ff4d4f" size={15} />
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
