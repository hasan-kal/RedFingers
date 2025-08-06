import { useEffect, useRef } from "react";
export default function TypingBox({ text, userInput, setUserInput, onStart }) {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleChange = (e) => {
    if (userInput.length === 0 && onStart) {
      onStart(); // start timer
    }
    setUserInput(e.target.value);
  };

  const renderText = () => {
    return text.split("").map((char, index) => {
      let color = "gray";
      if (index < userInput.length) {
        color = char === userInput[index] ? "green" : "red";
      }
      return (
        <span key={index} style={{ color: color }}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="typing-box">
      <div className="display-text">{renderText()}</div>
      <input
        ref={inputRef}
        value={userInput}
        onChange={handleChange}
        className="typing-input"
        placeholder="Start typing here..."
      />
    </div>
  );
}