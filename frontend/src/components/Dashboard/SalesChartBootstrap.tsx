import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface SalesChartBootstrapProps {
  height?: number;
}

const SalesChartBootstrap: React.FC<SalesChartBootstrapProps> = ({ height = 200 }) => {
  const data = {
    labels: ['21 Jul', '22 Jul', '23 Jul', '24 Jul', '25 Jul', '26 Jul', '27 Jul', '28 Jul'],
    datasets: [
      {
        label: 'Sales',
        data: [45, 52, 48, 65, 58, 72, 68, 75],
        borderColor: '#198754',
        backgroundColor: 'rgba(25, 135, 84, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: '#198754',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#198754',
        borderWidth: 1,
        cornerRadius: 8,
        caretPadding: 10,
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6c757d',
          font: {
            size: 12,
          },
        },
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)',
          borderDash: [5, 5],
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#6c757d',
          font: {
            size: 12,
          },
          callback: function(value: any) {
            return value + 'k';
          },
        },
      },
    },
    elements: {
      point: {
        hoverBackgroundColor: '#198754',
      },
    },
  };

  return (
    <div style={{ height: height + 'px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default SalesChartBootstrap;