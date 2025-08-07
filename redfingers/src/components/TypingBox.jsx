import { useEffect, useRef } from "react";
export default function TypingBox({ text, userInput, setUserInput, onStart, onRestart }) {
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
      <div className="typing-header">
        <div className="restart-icon" onClick={onRestart} title="Restart">
          <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <polyline points="1 4 1 10 7 10"></polyline>
            <path d="M3.51 15a9 9 0 1 0 .49-5.99L1 10"></path>
          </svg>
        </div>
      </div>
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