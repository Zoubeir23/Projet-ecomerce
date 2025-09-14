import React from 'react';

interface CircularProgressProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  color?: string;
  backgroundColor?: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  size = 120,
  strokeWidth = 8,
  color = '#198754',
  backgroundColor = '#e9ecef'
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = `${(percentage / 100) * circumference} ${circumference}`;

  return (
    <div className="position-relative d-inline-block">
      <svg
        width={size}
        height={size}
        className="transform-rotate-90"
        style={{ transform: 'rotate(-90deg)' }}
      >
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={strokeDasharray}
          strokeDashoffset="0"
          strokeLinecap="round"
          style={{
            transition: 'stroke-dasharray 1s ease-in-out',
          }}
        />
      </svg>
      
      {/* Center text */}
      <div 
        className="position-absolute top-50 start-50 translate-middle text-center"
      >
        <div className="fw-bold fs-4">{percentage}%</div>
        <small className="text-muted">Complete</small>
      </div>
    </div>
  );
};

export default CircularProgress;