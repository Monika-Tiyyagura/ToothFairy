// CSVLineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

function CSVLineChart({ chartData }) {
  return (
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
    </div>
  );
}

export default CSVLineChart;
