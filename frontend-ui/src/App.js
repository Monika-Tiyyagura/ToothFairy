import React, { useState, useEffect } from 'react';
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

import { tensor2d, loadLayersModel } from '@tensorflow/tfjs';
import { normalizeValues, averageParts } from './util';

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
  const [model, setModel] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await loadLayersModel('/model/model.json');
      setModel(loadedModel);
    };
    loadModel().catch(console.error);
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        console.log(result.data[1][0])
        // const baseValue = parseFloat(result.data[1][0]); // Assuming the first value is the baseline
        // const labels = result.data.map((item, index) => {
        //   // Convert each value to float, subtract the baseValue, and return the result
        //   // This assumes the first column contains numerical values
        //   const currentValue = parseFloat(item[0]);
        //   return (currentValue - baseValue).toFixed(2); // Adjust precision as needed
        // });
        
        const labels = result.data.map((item) => item[0]).slice(1); // data in first column
        const datasets = [];
        const seriesNames = result.data[0].slice(1); // z,y,x

        console.log("seriesNames:", seriesNames);

        const allData = {};
        seriesNames.forEach((name, index) => {
          const data = result.data.map((row) => row[index + 1]).slice(1);
          allData[name] = data
          // console.log("name", name);
          // console.log("data", data);
          datasets.push({
            label: name,
            data: data,
            fill: false,
            borderColor: `hsl(${(index * 360) / seriesNames.length}, 100%, 50%)`,
            tension: 0.1
          });
        });
        console.log("alldata", allData);
        const tensorData = csvDataToTensor(allData);
        console.log(tensorData.print());

        if (model) {
          const prediction = model.predict(tensorData);
          // Handle prediction here, e.g., by setting state

          // console.log(prediction.then((result) => console.log(result)));

          // Normalize predictions
          const normalizedPredictions = normalizeValues([]);
          // Average the normalized predictions by dividing into 8 parts
          const averagedPredictions = averageParts([]);
          console.log("Normalized Predictions:", normalizedPredictions);
          console.log("Averaged Predictions:", averagedPredictions);

        //   prediction.dataSync().then(array => {
        //     console.log("Prediction:", array);
        // });

          setScore(prediction.rank);
        }

        setChartData({
          labels: labels,
          datasets: datasets,
        });
      },
      header: false,
    });
  };

  const csvDataToTensor = (data) => {
    // Assuming data is an array of {x, y, z} objects
    // Convert each array from string to number
  const xNumbers = data.x.map(Number);
  const yNumbers = data.y.map(Number);
  const zNumbers = data.z.map(Number);

  // Combine the numeric arrays into a 2D array [numSamples, 3 features]
  const combinedData = xNumbers.map((_, i) => [xNumbers[i], yNumbers[i], zNumbers[i]]);

  // Create a tensor from the combined numeric data
  return tensor2d(combinedData);
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
      ) : null}
    </div>
  );
}

export default CSVLinePlot;
