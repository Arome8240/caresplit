import React from 'react';

interface SkeletonProps {
  width?: string | number;
  height?: string | number;
  borderRadius?: string;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width = '100%',
  height = '16px',
  borderRadius = '8px',
  className = '',
}) => (
  <div
    className={`skeleton ${className}`}
    style={{ width, height, borderRadius }}
    aria-hidden="true"
  />
);

export const StatSkeleton: React.FC = () => (
  <div style={{ textAlign: 'center' }}>
    <Skeleton width="80px" height="36px" borderRadius="8px" />
    <div style={{ marginTop: '8px' }}>
      <Skeleton width="100px" height="14px" borderRadius="4px" />
    </div>
  </div>
);

export const GroupCardSkeleton: React.FC = () => (
  <div className="feature-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Skeleton width="120px" height="24px" />
      <Skeleton width="80px" height="24px" borderRadius="20px" />
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      <Skeleton width="100%" height="16px" />
      <Skeleton width="100%" height="16px" />
      <Skeleton width="80%" height="16px" />
    </div>
    <Skeleton width="100%" height="44px" borderRadius="12px" />
  </div>
);
