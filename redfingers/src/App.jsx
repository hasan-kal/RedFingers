import { useState, useEffect } from "react";
import StatsTracker from "./components/StatsTracker";
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
    const difficultyKey = difficulty.toLowerCase(); // 'easy', 'medium', 'hard'
    const options = wordBank[difficultyKey];
    const targetWords = getWordCount();
    let words = [];

    while (words.join(" ").split(" ").length < targetWords) {
      const word = options[Math.floor(Math.random() * options.length)];
      words.push(word);
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

useEffect(() => {
  const newSampleText = getRandomText();
  setSampleText(newSampleText);
  setIsTyping(false);
  setTestEnded(false);
  setUserInput("");
  // Reset input state fully on difficulty change
  document.querySelector("input")?.focus();
}, [difficulty]);

  useEffect(() => {
    const handleKeydown = () => {
      const text = document.querySelector('.logo-text');
      if (text) {
        text.classList.add('pulsing');
        setTimeout(() => text.classList.remove('pulsing'), 300);
      }
    };

    document.addEventListener('keydown', handleKeydown);
    return () => document.removeEventListener('keydown', handleKeydown);
  }, []);

  const handleTestComplete = () => {
    setIsTyping(false);
    setTestEnded(true);

    const totalChars = userInput.length;
    const correctChars = userInput.split('').filter((char, idx) => char === sampleText[idx]).length;
    const accuracy = ((correctChars / totalChars) * 100).toFixed(2);
    const wpm = ((correctChars / 5) / (duration / 60)).toFixed(2);

    const newStat = {
      date: new Date().toLocaleString(),
      wpm,
      accuracy,
      total: totalChars,
      correct: correctChars,
    };

    const existingStats = JSON.parse(localStorage.getItem("typingStats")) || [];
    existingStats.unshift(newStat);
    localStorage.setItem("typingStats", JSON.stringify(existingStats));
  };

  const handleRestart = () => {
    setIsTyping(false);
    setTestEnded(false);
    setUserInput("");
    setSampleText(getRandomText());
  };


  return (
    <div className="container">
      <div className="logo-container">
        <svg id="logoRF" className="logo-svg" width="140" height="140" viewBox="0 0 100 100">
          <circle className="logo-ring" cx="50" cy="50" r="40" stroke="#c8102e" strokeWidth="6" fill="none" />
          <text className="logo-text" x="50%" y="55%" textAnchor="middle" fill="#ffffff" fontSize="32px" fontFamily="'Inter', sans-serif" dy=".3em">RF</text>
        </svg>
      </div>
      <h1>Red Fingers</h1>
      <p>You’ll Never Type Alone.</p>

      <DifficultySelector selected={difficulty} onSelect={setDifficulty} />

      {!testEnded && (
        <>
          <Timer isTyping={isTyping} duration={duration} onComplete={handleTestComplete} />
          <TypingBox
            key={sampleText}
            text={sampleText}
            onStart={() => setIsTyping(true)}
            userInput={userInput}
            setUserInput={setUserInput}
            onRestart={handleRestart}
          />
        </>
      )}

      {testEnded && (
        <>
          <Results userInput={userInput} targetText={sampleText} duration={duration} />
          <button className="button" onClick={handleRestart} style={{ marginTop: "2rem" }}>
            🔁 Restart
          </button>
          <StatsTracker />
        </>
      )}
    </div>
  );
}