const tf = require('@tensorflow/tfjs-node');
const Papa = require('papaparse');
const fs = require('fs');
const path = require('path');

// Function to asynchronously read and parse a CSV file
const readCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, csvString) => {
      if (err) {
        reject(err);
      } else {
        Papa.parse(csvString, {
          complete: (results) => resolve(results.data),
          header: true,
          dynamicTyping: true,
          skipEmptyLines: true,
          error: reject
        });
      }
    });
  });
};

// Function to load and prepare data from multiple CSV files, each in its ranked directory
const loadDataAndLabels = async (baseDir, ranks) => {
  let features = [];
  let labels = [];

  for (const rank of ranks) {
    const dirPath = path.join(baseDir, rank.toString());
    const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.csv'));

    for (const file of files) {
      const filePath = path.join(dirPath, file);
      const data = await readCSV(filePath);
      // Flatten data and append to features
      features = features.concat(data.map(d => [d.x, d.y, d.z]));
      // Append rank as label for each data point in the file
      labels = labels.concat(new Array(data.length).fill(parseInt(rank)));
    }
  }

  return {
    features: tf.tensor2d(features),
    labels: tf.tensor1d(labels)
  };
};

// Define the model (same as before)
const createModel = () => {
  const model = tf.sequential();
  model.add(tf.layers.dense({inputShape: [3], units: 64, activation: 'relu'}));
  model.add(tf.layers.dense({units: 1}));
  model.compile({
    optimizer: 'adam',
    loss: 'meanSquaredError',
    metrics: ['mse'],
  });
  return model;
};

// Train the model with data from multiple CSV files
const trainModel = async (baseDir, ranks) => {
  const { features, labels } = await loadDataAndLabels(baseDir, ranks);
  const model = createModel();

  await model.fit(features, labels, {
    epochs: 10,
    validationSplit: 0.2,
  });

  console.log('Training complete');

  // Save the model to the file system
  const savePath = 'file://./model.json';
  await model.save(savePath);
  console.log(`Model saved to ${savePath}`);
};

// Example usage
const baseDir = 'src/data'; // Base directory containing ranked subdirectories
const ranks = [1, 2, 3, 4, 5]; // Example ranks, adjust according to your dataset
trainModel(baseDir, ranks).catch(console.error);
