import React, { useState, useEffect, useRef } from "react";
import "./Chat.scss";

import Input from "../Input";
import Message from "../Message";

const Chat: React.FC = () => {
  const [messages, setMessages] = useState([
    { text: "Hello, how can I help you?", sender: "bot" },
    {
      text: "Hello, i feel bad, my throat is dry and i have a sore throat. What can  help me?",
      sender: "user",
    },
  ]);

  // Реф для контейнера повідомлень
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Хендлер відправки повідомлення
  const handleSendMessage = (text: string) => {
    setMessages([...messages, { text, sender: "user" }]);
  };

  // Ефект для автоскролу вниз
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="chat-container">
      <div className="chat">
        <div className="messages">
          {messages.map((message, index) => (
            <Message
              key={index}
              text={message.text}
              sender={message.sender as "bot" | "user"}
            />
          ))}
          {/* Невидимий елемент, щоб прокрутити вниз */}
          <div ref={messagesEndRef} />
        </div>
        <Input onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
