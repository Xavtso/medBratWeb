import React, { useState, useEffect, useRef } from "react";
import "./Chat.scss";

import Input from "../Input";
import Message from "../Message";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { Message as MessageProps } from "../../types";
import { addMessage, getMessages } from "../../services/chat.service";
import AnimatedDots from "../AnimatedDots";
import { useParams } from "react-router-dom";

const Chat: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { currentChat } = useSelector((state: RootState) => state.chats);
  const { chatId } = useParams();

  const [messages, setMessages] = useState<MessageProps[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  // Зберігаємо _id_ нового бот-повідомлення, яке треба анімувати
  const [animatingBotMessageId, setAnimatingBotMessageId] = useState<
    number | null
  >(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Отримуємо чат при завантаженні
  useEffect(() => {
    if (chatId) {
      dispatch(getMessages(chatId));
    }
  }, [chatId, dispatch]);

  // Синхронізуємо локальний стан повідомлень з Redux-станом
  useEffect(() => {
    if (currentChat && currentChat.messages) {
      setMessages(currentChat.messages);
    }
  }, [currentChat]);

  // Автоскрол до останнього повідомлення
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (message: string) => {
    // Опціонально: оптимістичне додавання повідомлення користувача
    setMessages((prev) => [...prev, { message, sender: "user" }]);

    setIsTyping(true);
    try {
      // Відправляємо повідомлення; сервер повертає об'єкт з userMessage та botMessage
      const result = await dispatch(
        addMessage({ chatId: chatId!, message })
      ).unwrap();
      // Встановлюємо _id_ нового бот-повідомлення для анімації
      setAnimatingBotMessageId(result.botMessage._id);
      setIsTyping(false);
    } catch (error) {
      console.error("Помилка при відправці повідомлення:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { message: "Помилка при відправці повідомлення", sender: "bot" },
      ]);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat">
        <div className="messages">
          {messages?.map((msg, index) => {
            // Анімувати лише повідомлення від бота, якщо його _id співпадає з animatingBotMessageId
            const animate =
              msg.sender === "bot" && msg.id === animatingBotMessageId;
            return (
              <Message
                key={index}
                text={msg.message}
                sender={msg.sender}
                animate={animate}
                onAnimationComplete={
                  animate ? () => setAnimatingBotMessageId(null) : undefined
                }
              />
            );
          })}
          {isTyping && <AnimatedDots />}
          <div ref={messagesEndRef} />
        </div>
        <Input onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default Chat;
