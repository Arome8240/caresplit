import React from 'react';

export const HowItWorksSection: React.FC = () => {
  return (
    <section id="how-it-works" className="how-it-works-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">
            Get started in four simple steps
          </p>
        </div>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">01</div>
            <h3 className="step-title">Create or Join a Group</h3>
            <p className="step-description">
              Start a new savings group or join an existing one that matches your goals
            </p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">02</div>
            <h3 className="step-title">Make Contributions</h3>
            <p className="step-description">
              Contribute regularly to build your group's savings pool together
            </p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">03</div>
            <h3 className="step-title">Request When Needed</h3>
            <p className="step-description">
              Submit emergency withdrawal requests with your reason when you need support
            </p>
          </div>
          <div className="step-arrow">→</div>
          <div className="step-card">
            <div className="step-number">04</div>
            <h3 className="step-title">Vote & Support</h3>
            <p className="step-description">
              Members vote on requests, and funds are released when threshold is met
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};


