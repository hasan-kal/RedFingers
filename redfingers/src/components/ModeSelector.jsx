// src/components/ModeSelector.jsx

export default function ModeSelector({ selectedMode, onSelectMode }) {
  const modes = ["Chants", "Quotes", "Players"];

  return (
    <div className="mode-selector">
      {modes.map((mode) => (
        <button
          key={mode}
          className={`mode-button ${selectedMode === mode ? "active" : ""}`}
          onClick={() => onSelectMode(mode)}
        >
          {mode}
        </button>
      ))}
    </div>
  );
}