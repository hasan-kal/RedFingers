import { useState } from "react";
import DifficultySelector from "./components/DifficultySelector";
import TypingBox from "./components/TypingBox";
import Timer from "./components/Timer";
import Results from "./components/Results";
import "./styles/main.css";
import { wordBank } from "./data/data";

export default function App() {
  const [isTyping, setIsTyping] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");

  const getWordCount = () => {
    switch (difficulty) {
      case "Easy": return 30;
      case "Hard": return 60;
      default: return 45;
    }
  };

  const getRandomText = () => {
    const targetWords = getWordCount();
    let words = [];

    for (let i = 0; i < targetWords; i++) {
      const randomWord = wordBank[Math.floor(Math.random() * wordBank.length)];
      words.push(randomWord);
    }

    return words.join(" ");
  };

  const [sampleText, setSampleText] = useState(getRandomText());

  const getTime = () => {
    switch (difficulty) {
      case "Easy": return 45;
      case "Hard": return 20;
      default: return 30;
    }
  };

  const duration = getTime(); // dynamic duration based on difficulty

  const handleTypingStart = () => {
    if (!isTyping) setIsTyping(true);
  };

  const handleTestComplete = () => {
    setIsTyping(false);
    setTestEnded(true);
  };

  const handleRestart = () => {
    setIsTyping(false);
    setTestEnded(false);
    setUserInput("");
  };


  return (
    <div className="container" onClick={handleTypingStart}>
      <h1>🔴 RedFingers</h1>
      <p>You’ll Never Type Alone.</p>

      <DifficultySelector selected={difficulty} onSelect={setDifficulty} />

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