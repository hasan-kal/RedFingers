import { useState } from "react";
import ModeSelector from "./components/ModeSelector";
import TypingBox from "./components/TypingBox";
import "./styles/main.css";

export default function App() {
  const [selectedMode, setSelectedMode] = useState("Chants");

  // Temporary mock text (we'll replace this with real data soon)
  const sampleText = "You’ll Never Walk Alone";

  return (
    <div className="container">
      <h1>🔴 RedFingers</h1>
      <p>You’ll Never Type Alone.</p>

      <ModeSelector selectedMode={selectedMode} onSelectMode={setSelectedMode} />

      <TypingBox text={sampleText} />
    </div>
  );
}