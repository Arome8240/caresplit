import React, { useState } from 'react';
import { useCareSplit } from '../../hooks/useCareSplit';
import { CreateGroupModal } from '../modals/CreateGroupModal';
import { JoinGroupModal } from '../modals/JoinGroupModal';

export const HeroSection: React.FC = () => {
  const { stats, isLoadingStats, isTransacting } = useCareSplit();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="badge-dot"></span>
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
            <button className="btn-primary btn-large" onClick={() => setIsCreateModalOpen(true)} disabled={isTransacting}>
              {isTransacting ? 'Processing...' : 'Create a Group'}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-secondary btn-large" onClick={() => setIsJoinModalOpen(true)} disabled={isTransacting}>
              Join Existing Group
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">{isLoadingStats ? '...' : stats.activeGroups.toLocaleString()}</div>
              <div className="stat-label">Active Groups</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-value">{isLoadingStats ? '...' : `${Number(stats.totalSaved).toFixed(2)} CELO`}</div>
              <div className="stat-label">Total Saved</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-value">{isLoadingStats ? '...' : stats.members.toLocaleString()}</div>
              <div className="stat-label">Members</div>
            </div>
          </div>
        </div>
      </div>
      
      <CreateGroupModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
      <JoinGroupModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
      />
    </section>
  );
};
