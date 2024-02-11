import React, { useState, useEffect } from 'react';
import Papa from 'papaparse';
import CSVLineChart from './CSVLinechart';
import ScoreDisplay from './scoreDisplay';
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
import { normalizeValues, averageParts, customRound, dateTimeArray } from './util';

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
  const [averagedPredictions, setAveragedPredictions] = useState([]);


  useEffect(() => {
    const loadModel = async () => {
      const loadedModel = await loadLayersModel('/model/model.json');
      setModel(loadedModel);
    };
    loadModel().catch(console.error);
    document.title = "Tooth Fairy";
  }, []);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    Papa.parse(file, {
      complete: (result) => {
        
        //const labels = dateTimeArray(result.data.map((item) => item[0]).slice(1)); // data in first column
        const labels = result.data.map((item) => item[1]).slice(1).map((sec) => Math.trunc(sec));

        const datasets = [];
        const seriesNames = result.data[0].slice(2); // z,y,x

        console.log("seriesNames:", seriesNames);

        const allData = {};
        seriesNames.forEach((name, index) => {
          const data = result.data.map((row) => row[index + 2]).slice(1); // ignoring two colums for timestam and time elapsed
          allData[name] = data
          datasets.push({
            label: `${name}-Axis`,
            data: data,
            fill: false,
            borderColor: `hsl(${(index * 360) / seriesNames.length}, 100%, 50%)`,
            tension: 0.1,
          });
        });
        console.log("alldata", allData);
        const tensorData = csvDataToTensor(allData);
        console.log(tensorData.print());

        if (model) {
          const prediction = model.predict(tensorData);
          // Handle prediction here, e.g., by setting state

          // console.log(prediction.then((result) => console.log(result)));

          
          prediction.array().then(array => {
            const flattenedPredictions = array.flat().filter(value => !Number.isNaN(value));
            const normalizedPredictions = normalizeValues(flattenedPredictions);
            const averagedPredictions = averageParts(normalizedPredictions);
            setAveragedPredictions(averagedPredictions); // Update the state here
            const overAllScore = averagedPredictions.reduce((acc, curr) => acc + curr, 0) / averagedPredictions.length;
            setScore(customRound(overAllScore));
          });
                   
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
      <h1>Tooth Fairy - Analyze your brushing pattern</h1> {/* On-page title */}
      <div>
      <label className="fileUploadContainer">
        <span className="fileUploadButton"><strong>Upload File</strong></span>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="fileInput"
        />
      </label>
      </div>
      {chartData.labels ? (
        <>
          <CSVLineChart chartData={chartData} />
          <ScoreDisplay score={score} averagePredictions={averagedPredictions} />

        </>
      ) : null}
    </div>
  );
}

export default CSVLinePlot;
