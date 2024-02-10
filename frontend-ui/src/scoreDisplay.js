// ScoreDisplay.js
import React from 'react';

function ScoreDisplay({ score }) {
  return (
    <div className="scoreCard">
      <div className="scoreContainer">
        <p className="score">Score: {score}</p>
        <p className="message">
          {score > 5 ? (
            <>
              Great job! 🌟 Keep it up!
            </>
          ) : (
            <>
              Please consult a physician for guidance. 🩺
            </>
          )}
        </p>
      </div>
    </div>
  );
}

export default ScoreDisplay;
