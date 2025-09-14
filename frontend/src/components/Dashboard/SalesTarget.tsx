import React from 'react';
import './SalesTarget.css';

interface SalesTargetProps {
  dailyTarget: number;
  dailyAchieved: number;
  monthlyTarget: number;
  monthlyAchieved: number;
}

const SalesTarget: React.FC<SalesTargetProps> = ({
  dailyTarget,
  dailyAchieved,
  monthlyTarget,
  monthlyAchieved
}) => {
  const dailyPercentage = Math.min((dailyAchieved / dailyTarget) * 100, 100);
  const monthlyPercentage = Math.min((monthlyAchieved / monthlyTarget) * 100, 100);

  return (
    <div className="sales-target">
      <h3 className="target-title">Sales Target</h3>
      
      <div className="target-chart">
        <div className="circular-progress">
          <svg className="progress-ring" width="120" height="120">
            <circle
              className="progress-ring-background"
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#f1f5f9"
              strokeWidth="8"
            />
            <circle
              className="progress-ring-progress daily"
              cx="60"
              cy="60"
              r="50"
              fill="none"
              stroke="#4ade80"
              strokeWidth="8"
              strokeDasharray={`${(dailyPercentage * 314) / 100} 314`}
              strokeDashoffset="78.5"
              transform="rotate(-90 60 60)"
            />
            <circle
              className="progress-ring-progress monthly"
              cx="60"
              cy="60"
              r="42"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="6"
              strokeDasharray={`${(monthlyPercentage * 264) / 100} 264`}
              strokeDashoffset="66"
              transform="rotate(-90 60 60)"
            />
          </svg>
          <div className="progress-center">
            <div className="progress-value">{Math.round(monthlyPercentage)}%</div>
            <div className="progress-label">Complete</div>
          </div>
        </div>
      </div>

      <div className="target-metrics">
        <div className="target-metric">
          <div className="metric-header">
            <span className="metric-indicator daily"></span>
            <span className="metric-label">Daily Target</span>
          </div>
          <div className="metric-value">{dailyTarget}</div>
          <div className="metric-achievement">
            {dailyAchieved} / {dailyTarget}
          </div>
        </div>
        
        <div className="target-metric">
          <div className="metric-header">
            <span className="metric-indicator monthly"></span>
            <span className="metric-label">Monthly Target</span>
          </div>
          <div className="metric-value">{monthlyTarget.toLocaleString()}</div>
          <div className="metric-achievement">
            {monthlyAchieved.toLocaleString()} / {monthlyTarget.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesTarget;