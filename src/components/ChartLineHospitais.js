import React from 'react';
import { Line } from 'react-chartjs-2';

const LineChart = ({ data }) => {


  console.log(data);
  const chartData = {
    labels: Object.keys(data["A.C. Camargo"]).map(String),
    datasets: Object.entries(data).map(([clinic, values]) => ({
      label: clinic,
      data: Object.values(values),
      fill: false,
      borderColor: getRandomColor(),
    })),
  };

  
  console.log(chartData);

  return <Line data={chartData} />;
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export default LineChart;
