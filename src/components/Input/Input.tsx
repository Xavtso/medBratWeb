import React, { useState } from "react";
import "./Input.scss";
import { IoArrowUpCircleSharp } from "react-icons/io5";

interface InputProps {
  onSendMessage: (message: string) => void;
}

const Input: React.FC<InputProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSendMessage(message);
        setMessage("");
      }
    }
  };

  return (
    <form className="input-form" onSubmit={handleSubmit}>
      <textarea
        placeholder="How do you feel today?"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button type="submit">
        <IoArrowUpCircleSharp size={20} />
      </button>
    </form>
  );
};

export default Input;
