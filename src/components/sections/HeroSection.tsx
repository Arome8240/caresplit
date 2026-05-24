import React, { useState } from 'react';
import { useCareSplit } from '../../hooks/useCareSplit';
import { useAnimatedCounter } from '../../hooks/useAnimatedCounter';
import { CreateGroupModal } from '../modals/CreateGroupModal';
import { JoinGroupModal } from '../modals/JoinGroupModal';
import { StatSkeleton } from '../ui/Skeleton';
import { formatCelo } from '../../utils/format';

const AnimatedStatValue: React.FC<{ value: number; isLoading: boolean; prefix?: string; suffix?: string }> = ({
  value, isLoading, prefix = '', suffix = '',
}) => {
  const animated = useAnimatedCounter(value, 1500, !isLoading);
  if (isLoading) return <StatSkeleton />;
  return <div className="stat-value">{prefix}{animated.toLocaleString()}{suffix}</div>;
};

export const HeroSection: React.FC = () => {
  const { stats, isLoadingStats, isTransacting } = useCareSplit();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot" aria-hidden="true" />
            Built on Celo Blockchain
          </div>
          <h1 className="hero-title">
            Save Together,
            <br />
            <span className="gradient-text">Support Each Other</span>
          </h1>
          <p className="hero-description">
            Join a trusted community savings group where members contribute together
            and support each other during emergencies through democratic voting.
          </p>
          <div className="hero-actions">
            <button
              className="btn-primary btn-large"
              onClick={() => setIsCreateModalOpen(true)}
              disabled={isTransacting}
              aria-label="Create a new savings group"
            >
              {isTransacting ? 'Processing...' : 'Create a Group'}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="btn-secondary btn-large"
              onClick={() => setIsJoinModalOpen(true)}
              disabled={isTransacting}
              aria-label="Join an existing savings group"
            >
              Join Existing Group
            </button>
          </div>

          <div className="hero-stats" role="region" aria-label="Protocol statistics">
            <div className="stat">
              {isLoadingStats ? (
                <StatSkeleton />
              ) : (
                <>
                  <AnimatedStatValue value={stats.activeGroups} isLoading={isLoadingStats} />
                  <div className="stat-label">Active Groups</div>
                </>
              )}
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat">
              {isLoadingStats ? (
                <StatSkeleton />
              ) : (
                <>
                  <div className="stat-value">{formatCelo(stats.totalSaved, 2)} CELO</div>
                  <div className="stat-label">Total Saved</div>
                </>
              )}
            </div>
            <div className="stat-divider" aria-hidden="true" />
            <div className="stat">
              {isLoadingStats ? (
                <StatSkeleton />
              ) : (
                <>
                  <AnimatedStatValue value={stats.members} isLoading={isLoadingStats} />
                  <div className="stat-label">Members</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <CreateGroupModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <JoinGroupModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </section>
  );
};
