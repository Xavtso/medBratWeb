import React, { useState, useEffect } from "react";

interface AnimatedTextProps {
  text: string;
  speed?: number; // затримка між символами (мс)
  onComplete?: () => void;
}

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text,
  speed = 50,
  onComplete,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, currentIndex + 1));
      currentIndex++;
      if (currentIndex >= text.length) {
        clearInterval(interval);
        if (onComplete) onComplete();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, onComplete]);

  return <span>{displayedText}</span>;
};

export default AnimatedText;
