import { useState } from "react";
import ModeSelector from "./components/ModeSelector";
import TypingBox from "./components/TypingBox";
import Timer from "./components/Timer";
import Results from "./components/Results";
import "./styles/main.css";
import { modeData } from "./data/data";

export default function App() {
  const [selectedMode, setSelectedMode] = useState("Chants");
  const [isTyping, setIsTyping] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [sampleText, setSampleText] = useState(getRandomText("Chants"));

  const duration = 30; // seconds

  const handleTypingStart = () => {
    if (!isTyping) setIsTyping(true);
  };

  const handleTestComplete = () => {
    setIsTyping(false);
    setTestEnded(true);
  };

  const handleModeChange = (mode) => {
    setSelectedMode(mode);
    setSampleText(getRandomText(mode));
    setUserInput("");
    setTestEnded(false);
    setIsTyping(false);
  };

  const handleRestart = () => {
    setIsTyping(false);
    setTestEnded(false);
    setUserInput("");
  };

  const getRandomText = (mode) => {
    const options = modeData[mode];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };

  return (
    <div className="container" onClick={handleTypingStart}>
      <h1>🔴 RedFingers</h1>
      <p>You’ll Never Type Alone.</p>

      <ModeSelector selectedMode={selectedMode} onSelectMode={handleModeChange} />

      {!testEnded && (
        <>
          <Timer isTyping={isTyping} duration={duration} onComplete={handleTestComplete} />
          <TypingBox
            text={sampleText}
            onStart={() => setIsTyping(true)}
            userInput={userInput}
            setUserInput={setUserInput}
          />
        </>
      )}

      {testEnded && (
        <>
          <Results userInput={userInput} targetText={sampleText} duration={duration} />
          <button className="button" onClick={handleRestart} style={{ marginTop: "2rem" }}>
            🔁 Restart
          </button>
        </>
      )}
    </div>
  );
}