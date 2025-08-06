import { useEffect, useState } from "react";

export default function Timer({ isTyping, duration, onComplete }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (!isTyping || timeLeft === 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isTyping, timeLeft, onComplete]);

  return (
    <div className="timer-display">
      ⏱ Time Left: <strong>{timeLeft}s</strong>
    </div>
  );
}