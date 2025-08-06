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
      let className = "char";
      if (index < userInput.length) {
        className += char === userInput[index] ? " correct" : " incorrect";
      }
      if (index === userInput.length) {
        className += " typing";
      }
      return (
        <span key={index} className={className}>
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