import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const AttendanceGraph = ({ data, label }) => {
  const chartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: data,
        backgroundColor: ['#235f5e', '#92e2a9'],
        hoverBackgroundColor: ['#2ecc71', '#e74c3c'],
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        position: 'bottom',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || '';
            const value = context.parsed;
            const sum = context.chart._metasets[0].total;
            const percentage = ((value / sum) * 100).toFixed(2) + '%';
            return `${label}: ${percentage}`;
          },
        },
      },
    },
  };

  return (
    <div style={{ width: '100%', maxWidth: '200px', margin: '0 auto' }}>
      <h3 style={{ textAlign: 'center', color: '#2c3e50' }}>{label}</h3>
      <Doughnut 
        data={chartData} 
        options={options} 
        width={150} // Adjust width as needed
        height={150} // Adjust height as needed
      />
    </div>
  );
};

export default AttendanceGraph;
