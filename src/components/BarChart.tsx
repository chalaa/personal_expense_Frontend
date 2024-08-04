// src/components/BarChart.tsx

import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface BarChartProps {
  datavalues : number[];
  label : string[];
}

const BarChart: React.FC<BarChartProps> = ({datavalues,label}) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: 'Expenses',
        data: datavalues,
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Expenses by Category',
      },
    },
  };

  return <Bar data={data} options={options} height={270}/>;
};

export default BarChart;
