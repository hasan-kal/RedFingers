// Inside App.jsx (or a suitable component file)
import React, { useState } from 'react';

const CustomTimeSelector = ({ onSelect }) => {
  const [selectedTime, setSelectedTime] = useState(null);

  const handleChange = (e) => {
    const value = parseInt(e.target.value);
    setSelectedTime(value);
    onSelect(value);
  };

  return (
    <div className="custom-time-section">
      <h3>Choose Custom Time Limit</h3>
      <div className="custom-time-options">
        {[15, 30, 45, 60, 90, 120].map((sec) => (
          <label key={sec}>
            <input
              type="radio"
              name="custom-time"
              value={sec}
              checked={selectedTime === sec}
              onChange={handleChange}
            />
            {sec}s
          </label>
        ))}
      </div>
    </div>
  );
};

export default CustomTimeSelector;