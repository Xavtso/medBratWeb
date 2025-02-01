import React from "react";
import "./Message.scss";

interface MessageProps {
  text: string;
  sender: "bot" | "user";
}

const Message: React.FC<MessageProps> = ({ text, sender }) => {
  return (
    <div className={`message ${sender}`}>
      <p>{text}</p>
    </div>
  );
};

export default Message;
