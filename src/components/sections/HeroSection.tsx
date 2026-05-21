import React from 'react';
import { useCareSplit } from '../../hooks/useCareSplit';

export const HeroSection: React.FC = () => {
  const { stats, isLoadingStats, createGroup, joinGroup, isTransacting } = useCareSplit();

  const handleCreateGroup = async () => {
    try {
      // For MVP, using default parameters or prompt
      const amount = window.prompt("Enter contribution amount (in CELO)", "0.01");
      if (!amount) return;
      const maxMembers = parseInt(window.prompt("Enter max members", "5") || "5", 10);
      const threshold = parseInt(window.prompt("Enter voting threshold (1-100)", "60") || "60", 10);
      
      await createGroup(amount, maxMembers, threshold);
      alert("Group created successfully!");
    } catch (err: any) {
      alert("Failed to create group: " + (err.shortMessage || err.message));
    }
  };

  const handleJoinGroup = async () => {
    try {
      const groupId = parseInt(window.prompt("Enter Group ID to join", "1") || "0", 10);
      if (!groupId) return;
      await joinGroup(groupId);
      alert("Successfully joined group " + groupId);
    } catch (err: any) {
      alert("Failed to join group: " + (err.shortMessage || err.message));
    }
  };

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
            <button className="btn-primary btn-large" onClick={handleCreateGroup} disabled={isTransacting}>
              {isTransacting ? 'Processing...' : 'Create a Group'}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-secondary btn-large" onClick={handleJoinGroup} disabled={isTransacting}>
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
    </section>
  );
};
