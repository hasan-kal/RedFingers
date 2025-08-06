import React, { useEffect, useState } from "react";

const StatsTracker = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const savedStats = JSON.parse(localStorage.getItem("typingStats")) || [];
    setStats(savedStats);
  }, []);

  const clearStats = () => {
    localStorage.removeItem("typingStats");
    setStats([]);
  };

  return (
    <div className="results-box" style={{ marginTop: "3rem" }}>
      <h2 className="results-heading">📊 Past Typing Sessions</h2>
      {stats.length === 0 ? (
        <p>No stats available yet.</p>
      ) : (
        <div>
          {stats.map((entry, index) => (
            <div key={index} className="result-stat">
              <strong>{entry.date}</strong><br />
              WPM: {entry.wpm}, Accuracy: {entry.accuracy}%, Characters: {entry.correct}/{entry.total}
              <hr style={{ borderColor: "#ccc" }} />
            </div>
          ))}
        </div>
      )}
      {stats.length > 0 && (
        <button className="restart-button" onClick={clearStats}>
          Clear History
        </button>
      )}
    </div>
  );
};

export default StatsTracker;