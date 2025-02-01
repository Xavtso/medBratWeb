import React from "react";
import "./Sidebar.scss";

const Sidebar: React.FC = () => {
  const chats = ["Chat 1", "Chat 2", "Chat 3"]; // Просто тестові чати

  return (
    <aside className="sidebar">
      <button className="new-chat-button">+ New Chat</button>
      <div className="chats">
        {chats.map((chat, index) => (
          <div key={index} className="chat-item">
            {chat}
          </div>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
