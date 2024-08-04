// src/components/LineChart.tsx

import React from 'react';
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface LineChatProps {
  expensedatavalues : number[];
  incomedatavalue: number[],
  label : string[];
}

const LineChart: React.FC<LineChatProps> = ({expensedatavalues,label,incomedatavalue}) => {
  const data = {
    labels: label,
    datasets: [
      {
        label: 'Expenses',
        data: expensedatavalues,
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
      },
      {
        label: 'Income',
        data: incomedatavalue,
        borderColor: 'rgba(153, 102, 255, 1)',
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
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
        text: 'Income and Expenses Over Time',
      },
    },
  };

  return <Line data={data} options={options} height={270}/>;
};

export default LineChart;
