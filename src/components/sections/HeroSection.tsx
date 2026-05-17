import React from 'react';

export const HeroSection: React.FC = () => {
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
            <button className="btn-primary btn-large">
              Create a Group
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button className="btn-secondary btn-large">
              Join Existing Group
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-value">1,234</div>
              <div className="stat-label">Active Groups</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-value">$2.5M</div>
              <div className="stat-label">Total Saved</div>
            </div>
            <div className="stat-divider"></div>
            <div className="stat">
              <div className="stat-value">8,456</div>
              <div className="stat-label">Members</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
