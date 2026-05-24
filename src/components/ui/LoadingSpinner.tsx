import React from 'react';

interface LoadingSpinnerProps {
  size?: number;
  label?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 32, label = 'Loading...' }) => (
  <div className="loading-spinner-wrapper" role="status" aria-label={label}>
    <svg
      className="loading-spinner"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeDasharray="31.416" strokeDashoffset="10" />
    </svg>
    <span className="sr-only">{label}</span>
  </div>
);
