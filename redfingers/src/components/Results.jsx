// src/components/Results.jsx

export default function Results({ userInput, targetText, duration }) {
  const totalChars = userInput.length;
  const correctChars = userInput.split("").filter((char, idx) => char === targetText[idx]).length;
  const incorrectChars = totalChars - correctChars;

  const wordsTyped = userInput.trim().split(" ").length;
  const wpm = Math.round((wordsTyped / duration) * 60);
  const accuracy = totalChars > 0 ? Math.round((correctChars / totalChars) * 100) : 0;

  return (
    <div className="results-box">
      <h2>📊 Your Results</h2>
      <p><strong>WPM:</strong> {wpm}</p>
      <p><strong>Accuracy:</strong> {accuracy}%</p>
      <p><strong>Characters Typed:</strong> {totalChars}</p>
      <p><strong>Correct Characters:</strong> {correctChars}</p>
      <p><strong>Incorrect Characters:</strong> {incorrectChars}</p>
    </div>
  );
}