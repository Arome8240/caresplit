import React from 'react';
import { useCareSplit } from '../../hooks/useCareSplit';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import { formatNumber } from '../../utils/format';

const AnimatedStat: React.FC<{ value: number; label: string; prefix?: string; suffix?: string; isActive: boolean }> = ({
  value, label, prefix = '', suffix = '', isActive,
}) => {
  const animated = useAnimatedCounter(value, 1800, isActive);
  return (
    <div className="stats-section-stat">
      <div className="stats-section-value">
        {prefix}{formatNumber(animated)}{suffix}
      </div>
      <div className="stats-section-label">{label}</div>
    </div>
  );
};

export const StatsSection: React.FC = () => {
  const { stats, isLoadingStats } = useCareSplit();
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  const items = [
    { value: stats.activeGroups, label: 'Active Savings Groups', suffix: '+' },
    { value: stats.members, label: 'Community Members', suffix: '+' },
    { value: Math.round(parseFloat(stats.totalSaved) * 100) / 100, label: 'CELO Saved Together', suffix: ' CELO' },
    { value: 100, label: 'Blockchain Secured', suffix: '%' },
  ];

  return (
    <section ref={ref as React.RefObject<HTMLElement>} className="stats-section">
      <div className="container">
        <div className={`stats-section-grid fade-in-section ${isVisible ? 'visible' : ''}`}>
          {items.map((item, i) =>
            isLoadingStats ? (
              <div key={i} className="stats-section-stat">
                <div className="skeleton" style={{ width: '80px', height: '40px', borderRadius: '8px', margin: '0 auto' }} />
                <div className="skeleton" style={{ width: '120px', height: '14px', borderRadius: '4px', margin: '8px auto 0' }} />
              </div>
            ) : (
              <AnimatedStat key={i} {...item} isActive={isVisible} />
            )
          )}
        </div>
      </div>
    </section>
  );
};
