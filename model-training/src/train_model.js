const fs = require('fs');
const Papa = require('papaparse');

const tf = require('@tensorflow/tfjs-node');

// Assuming you have a function to load and preprocess each CSV file

// Load and preprocess all files
const datasets = [];
const ranks = [];
const data = loadDataAndProcess(); // Replace with your loading function
datasets.push(data.features);
ranks.push(data.rank);

console.log("data sets loaded!");
// console.log('datasets:', datasets)
// Combine features and ranks into a single dataset
const combinedData = tf.concat(...datasets, 0); // Concatenate along axis 0 (rows)
console.log("Concat data complete");
const rankLabels = tf.tensor(ranks); // Convert ranks to int32 tensors



// Build and train your model (adapt based on your choice)
const model = tf.sequential();
console.log("Combined shape:", combinedData.shape);
// Example with MLP:
model.add(tf.layers.dense({units:64, activation: 'relu', inputShape: [1, 9]} ));
console.log("second started");
model.add(tf.layers.dense({units:10, activation: 'linear'})); // 1 output for predicted rank

console.log("model added!");
model.compile({
  optimizer: 'adam',
  loss: 'meanSquaredError', // or other ranking loss function
  metrics: ['mae']
});
console.log("model compiled!");
// console.log(rankLabels);
console.log(combinedData.transpose().dataSync);
const response = model.fit(combinedData.transpose().dataSync(), rankLabels, {
  epochs: 100, // adjust based on complexity and dataset size
  verbose: 1

});

// Use the model for prediction
// const newPoint = tf.tensor([/* features from a new data point */]);
// const prediction = model.predict(tf.expandDims(newPoint, 0));
// console.log('Predicted rank:', prediction.dataSync()[0][0]);

function loadDataAndProcess() {
  // Load data from CSV file

  // console.log('loading data');
  const csvData = fs.readFileSync('src/Accelerometer.csv', 'utf8');
  const parsedData = Papa.parse(csvData, { header: true });
  // console.log(' read data file.', parsedData);
  // Assuming data points are in the first 3 columns

  const features = parsedData.data.map(record => {
    // console.log("parsing row", record);
    return tf.tensor([parseFloat(record['x']), parseFloat(record['y']), parseFloat(record['z'])])
  }
);
  // console.log("features" , features);
  // Generate random rank between 1 and 10
  const rank = Math.floor(Math.random() * 10) + 1;

  return {
    features: features,
    rank: rank
  };
}

