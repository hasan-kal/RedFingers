// src/components/AboutModal.jsx
import React, { useState } from 'react';
import '../styles/main.css';

const AboutModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="about-container">
      <button
        className="about-icon"
        onClick={() => setIsOpen(!isOpen)}
        title="About"
      >
        ℹ️
      </button>

      {isOpen && (
        <div className="about-modal">
          <p><strong>RedFingers</strong> is a Liverpool-themed typing challenge.</p>
          <p>Crafted with ❤️ by <strong>Hasan Ahmed</strong>, 2025.</p>
        </div>
      )}
    </div>
  );
};

export default AboutModal;