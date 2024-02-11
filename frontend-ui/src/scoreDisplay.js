import React from 'react';
import {getRandomNumber0To9} from './util'
function ScoreDisplay({ score, averagePredictions }) {
  // Define an array of part names in the order they should be displayed
  const partNames = [
    "Upper Right Back",
    "Upper Right Front",
    "Upper Left Front",
    "Upper Left Back",
    "Lower Left Back",
    "Lower Left Front",
    "Lower Right Front",
    "Lower Right Back"
  ];

  const fivePlusScoreQuotes = ["Give your teeth a daily sparkle with a brush and a smile! ✨😁",
  "Wiggle those bristles, dance with your toothbrush - conquer the sugar bugs dance! 🕺🦷",
  "Brushing your teeth is like a magical hug for your smile! 🪥🌟",
  "Turn that frown upside down - brush your teeth and wipe away the frown! 😃🦷",
  "Morning or night, brushing feels just right - for a dazzling, happy smile! 🌙😁",
  "Keep your smile oh-so-sweet - give each tooth a gentle sweep! 🍭🦷",
  "Be a superhero for your teeth - brush daily for a bright and happy feat! 🦸‍♂️🪥",
  "Brave little brusher, dance with your toothbrush - your smile is as bright as the sun that's beaming! ☀️😃",
  "Let your teeth sparkle and gleam - brush them daily, it's a dazzling dream! ✨🪥",
  "Toothbrush in hand, strike a pose - conquer the sugar bugs and let your smile glow! 🦷💪"];


  return (
    <div className="scoreCard">
      <div className="scoreContainer">
        <p className="score"><strong>Score: {score} / 10</strong></p>
        <p className="message">
          {score > 5 ? (
            <>
              {fivePlusScoreQuotes[getRandomNumber0To9()]}
            </>
          ) : (
            <>
              Please consult your dentist for guidance. 🩺
            </>
          )}
        </p>
        {averagePredictions && averagePredictions.length > 0 && (
          <div className="predictionsTableContainer">
            <table className="predictionsTable">
              <tbody>
                {/* Create two rows: one for upper parts and one for lower parts */}
                {[4, 0].map(rowStart => (
                  <tr key={rowStart}>
                    {partNames.slice(rowStart, rowStart + 4).map((partName, index) => {
                      // Calculate the appropriate index for averagePredictions
                      const predictionIndex = rowStart + index;
                      return (
                        <td key={partName}>
                          <div>{partName}</div>
                          <div><strong>{averagePredictions[predictionIndex]?.toFixed(2) || 'N/A'}</strong></div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScoreDisplay;
