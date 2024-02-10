import React, { useState } from 'react';
import Papa from 'papaparse';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

import './App.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

function CSVLinePlot() {
  const [chartData, setChartData] = useState({});
  const [score, setScore] = useState(0); // State for the score

  const handleFileUpload = (event) => {
    const file = event.target.files[0];

    Papa.parse(file, {
      complete: (result) => {
        console.log(result.data[1][0])
        const baseValue = parseFloat(result.data[1][0]); // Assuming the first value is the baseline
        const labels = result.data.map((item, index) => {
          // Convert each value to float, subtract the baseValue, and return the result
          // This assumes the first column contains numerical values
          const currentValue = parseFloat(item[0]);
          return (currentValue - baseValue).toFixed(2); // Adjust precision as needed
        });
        
        // const labels = result.data.map((item) => item[0]).slice(1);
        const datasets = [];
        const seriesNames = result.data[0].slice(1);

        seriesNames.forEach((name, index) => {
          const data = result.data.map((row) => row[index + 1]).slice(1);
          datasets.push({
            label: name,
            data: data,
            fill: false,
            borderColor: `hsl(${(index * 360) / seriesNames.length}, 100%, 50%)`,
            tension: 0.1
          });
        });

        // Generate a random score from 1 to 10
        const randomScore = Math.floor(Math.random() * 10) + 1;
        setScore(randomScore);

        setChartData({
          labels: labels,
          datasets: datasets,
        });
      },
      header: false,
    });
  };

  return (
    <div className="container">
      <label className="fileUploadContainer">
        <span className="fileUploadButton">Choose File</span>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="fileInput"
        />
      </label>
      {chartData.labels ? (
        <div className="chartContainer">
          <Line
            data={chartData}
            options={{
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
          {/* Display the score and message */}
          <p>Score: {score}</p>
          {score > 5 ? (
            <p>You have done a very good job!</p>
          ) : (
            <p>Please visit the physician for guidance.</p>
          )}
        </div>
      ) : null}
    </div>
  );
}

export default CSVLinePlot;
