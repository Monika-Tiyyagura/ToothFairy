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
              title: {
                display: true,
                text: 'Data (How much have you moved)'
              }
            },
            x: { // 'x' specifies the x-axis
              title: {
                  display: true,
                  text: 'Seconds' // Label for the x-axis
              }
          },
          },
        }}
      />
    </div>
  );
}

export default CSVLineChart;
