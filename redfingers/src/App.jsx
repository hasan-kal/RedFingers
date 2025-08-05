import { useState } from "react";
import ModeSelector from "./components/ModeSelector";
import "./styles/main.css"; // Ensure CSS is imported

export default function App() {
  const [selectedMode, setSelectedMode] = useState("Chants");

  return (
    <div className="container">
      <h1>🔴 RedFingers</h1>
      <p>You’ll Never Type Alone.</p>

      <ModeSelector selectedMode={selectedMode} onSelectMode={setSelectedMode} />

      <p style={{ marginTop: "2rem" }}>
        <strong>Current Mode:</strong> {selectedMode}
      </p>
    </div>
  );
}