import React from "react";
import AnimatedText from "../AnimatedText";
import "./Message.scss";

interface MessageProps {
  text: string;
  sender: string;
  animate?: boolean;
  onAnimationComplete?: () => void;
}

const Message: React.FC<MessageProps> = ({
  text,
  sender,
  animate = false,
  onAnimationComplete,
}) => {
  if (sender === "bot" && animate) {
    return (
      <div className={`message ${sender}`}>
        <AnimatedText text={text} speed={50} onComplete={onAnimationComplete} />
      </div>
    );
  }

  return <div className={`message ${sender}`}>{text}</div>;
};

export default Message;
