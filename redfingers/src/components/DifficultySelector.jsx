import React from "react";

export default function DifficultySelector({ selected, onSelect }) {
  const difficulties = ["Easy", "Medium", "Hard"];

  return (
    <div className="difficulty-selector" style={{ marginBottom: "1rem" }}>
      {difficulties.map((level) => (
        <button
          key={level}
          onClick={() => onSelect(level)}
          className={`difficulty-button ${selected === level ? "selected" : ""}`}
        >
          {level}
        </button>
      ))}
    </div>
  );
}