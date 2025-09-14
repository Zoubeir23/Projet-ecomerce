import React from 'react';
import './SalesChart.css';

interface SalesChartProps {
  title: string;
  data: {
    income: number;
    expenses: number;
    balance: number;
  };
  period?: string;
}

const SalesChart: React.FC<SalesChartProps> = ({
  title,
  data,
  period = 'Jul 2023'
}) => {
  // Données simulées pour le graphique
  const chartData = [
    { date: '21 Jul', value: 45 },
    { date: '22 Jul', value: 52 },
    { date: '23 Jul', value: 48 },
    { date: '24 Jul', value: 65 },
    { date: '25 Jul', value: 58 },
    { date: '26 Jul', value: 72 },
    { date: '27 Jul', value: 68 },
    { date: '28 Jul', value: 75 }
  ];

  const maxValue = Math.max(...chartData.map(item => item.value));

  return (
    <div className="sales-chart">
      <div className="chart-header">
        <h3 className="chart-title">{title}</h3>
        <div className="chart-period">
          <select value={period} onChange={() => {}}>
            <option value="Jul 2023">Jul 2023</option>
            <option value="Jun 2023">Jun 2023</option>
            <option value="May 2023">May 2023</option>
          </select>
        </div>
      </div>

      <div className="chart-metrics">
        <div className="metric-item income">
          <div className="metric-label">
            <span className="metric-dot"></span>
            Income
          </div>
          <div className="metric-amount">
            {data.income.toLocaleString('fr-FR')}€
            <span className="metric-trend positive">+2.5%</span>
          </div>
        </div>
        
        <div className="metric-item expenses">
          <div className="metric-label">
            <span className="metric-dot"></span>
            Expenses
          </div>
          <div className="metric-amount">
            {data.expenses.toLocaleString('fr-FR')}€
            <span className="metric-trend negative">-1.2%</span>
          </div>
        </div>
        
        <div className="metric-item balance">
          <div className="metric-label">
            <span className="metric-dot"></span>
            Balance
          </div>
          <div className="metric-amount">
            {data.balance.toLocaleString('fr-FR')}€
            <span className="metric-trend positive">+8.2%</span>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <svg className="chart-svg" viewBox="0 0 400 200">
          {/* Grille */}
          <defs>
            <pattern id="grid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#f1f5f9" strokeWidth="1"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {/* Graphique en aire */}
          <defs>
            <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#4ade80" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="#4ade80" stopOpacity="0.05"/>
            </linearGradient>
          </defs>
          
          {/* Ligne du graphique */}
          <path
            d={`M ${chartData.map((item, index) => 
              `${(index * 400) / (chartData.length - 1)},${200 - (item.value / maxValue) * 160}`
            ).join(' L ')}`}
            fill="none"
            stroke="#4ade80"
            strokeWidth="3"
            strokeLinecap="round"
          />
          
          {/* Zone sous la courbe */}
          <path
            d={`M 0,200 L ${chartData.map((item, index) => 
              `${(index * 400) / (chartData.length - 1)},${200 - (item.value / maxValue) * 160}`
            ).join(' L ')} L 400,200 Z`}
            fill="url(#chartGradient)"
          />
          
          {/* Points */}
          {chartData.map((item, index) => (
            <circle
              key={index}
              cx={(index * 400) / (chartData.length - 1)}
              cy={200 - (item.value / maxValue) * 160}
              r="4"
              fill="#4ade80"
              stroke="white"
              strokeWidth="2"
              className="chart-point"
            />
          ))}
        </svg>
        
        {/* Labels des dates */}
        <div className="chart-labels">
          {chartData.map((item, index) => (
            <span key={index} className="chart-label">
              {item.date}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SalesChart;