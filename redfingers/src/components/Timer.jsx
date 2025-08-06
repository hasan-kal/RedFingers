import React, { useEffect, useState } from "react";

export default function Timer({ duration, isTyping, testEnded, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    let interval = null;

    if (isTyping && !testEnded) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            onComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isTyping, testEnded]);

  // Reset the timer when the duration changes (new test started)
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  return (
    <div className="timer">
      <h2>Time Left: {timeLeft}s</h2>
    </div>
  );
}