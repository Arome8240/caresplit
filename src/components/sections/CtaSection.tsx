import React from 'react';

export const CtaSection: React.FC = () => {
  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <h2 className="cta-title">Ready to Start Saving Together?</h2>
          <p className="cta-description">
            Join thousands of people building financial security through community support
          </p>
          <div className="cta-actions">
            <button className="btn-primary btn-large">
              Get Started Now
            </button>
            <button className="btn-secondary btn-large">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
