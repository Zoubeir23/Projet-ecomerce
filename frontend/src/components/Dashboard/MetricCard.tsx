import React from 'react';
import './MetricCard.css';

interface MetricCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: string;
  period?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  period = 'Last 30 days'
}) => {
  return (
    <div className="metric-card">
      <div className="metric-header">
        <div className="metric-info">
          <h3 className="metric-title">{title}</h3>
          <p className="metric-period">{period}</p>
        </div>
        <div className="metric-icon">
          <span>{icon}</span>
        </div>
      </div>
      
      <div className="metric-content">
        <div className="metric-value">{value}</div>
        {change && (
          <div className={`metric-change ${changeType}`}>
            <span className="change-icon">
              {changeType === 'positive' ? '↗' : changeType === 'negative' ? '↘' : '→'}
            </span>
            <span className="change-text">{change}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricCard;