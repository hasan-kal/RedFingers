import AboutModal from "./components/AboutModal";
import { useState, useEffect } from "react";
import StatsTracker from "./components/StatsTracker";
import DifficultySelector from "./components/DifficultySelector";
import TypingBox from "./components/TypingBox";
import Timer from "./components/Timer";
import Results from "./components/Results";
import CustomTimeSelector from "./components/customTimeSelector";
import "./styles/main.css";
import { wordBank } from "./data/data";

export default function App() {
  const [isTyping, setIsTyping] = useState(false);
  const [testEnded, setTestEnded] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [difficulty, setDifficulty] = useState("Medium");
  const [customTime, setCustomTime] = useState(null);

  const getWordCount = () => {
    if (difficulty === "custom") return 50;
    switch (difficulty) {
      case "Easy": return 75;
      case "Hard": return 75;
      default: return 75;
    }
  };

  const getRandomText = () => {
    const difficultyKey = difficulty.toLowerCase(); // 'easy', 'medium', 'hard', or 'custom'
    const options = wordBank[difficultyKey] || wordBank["medium"]; // fallback to medium
    const targetWords = getWordCount();
    let words = [];

    while (words.join(" ").split(" ").length < targetWords) {
      const word = options[Math.floor(Math.random() * options.length)];
      words.push(word);
    }

    return words.join(" ");
  };

  const [sampleText, setSampleText] = useState(getRandomText());

  const getTime = () => customTime || 30;

  const duration = getTime(); // dynamic duration based on difficulty

useEffect(() => {
  const newSampleText = getRandomText();
  setSampleText(newSampleText);
  setIsTyping(false);
  setTestEnded(false);
  setUserInput("");
  document.querySelector("input")?.focus();
}, [difficulty]);

useEffect(() => {
  setCustomTime(null); // clear selected custom time when difficulty changes
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
    <>
      <div className="container">
        <div className="logo-container">
          <svg id="logoRF" className="logo-svg" width="140" height="140" viewBox="0 0 100 100">
            <circle className="logo-ring" cx="50" cy="50" r="40" stroke="#c8102e" strokeWidth="6" fill="none" />
            <text className="logo-text" x="50%" y="55%" textAnchor="middle" fill="#ffffff" fontSize="32px" fontFamily="'Inter', sans-serif" dy=".3em">RF</text>
          </svg>
          <div className="about-wrapper">
            <AboutModal />
          </div>
        </div>
        <h1>Red Fingers</h1>
        <p>You’ll Never Type Alone.</p>

        <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
        <CustomTimeSelector onSelect={(time) => {
          setCustomTime(time);
          setSampleText(getRandomText());
          setIsTyping(false);
          setTestEnded(false);
          setUserInput("");
          document.querySelector("input")?.focus();
        }} />

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
    </>
  );
}