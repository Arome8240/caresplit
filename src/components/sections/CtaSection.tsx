import React from 'react';
import { useCareSplit } from '../../hooks/useCareSplit';

export const CtaSection: React.FC = () => {
  const { createGroup, isTransacting } = useCareSplit();

  const handleCreateGroup = async () => {
    try {
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

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <h2 className="cta-title">Ready to Start Saving Together?</h2>
          <p className="cta-description">
            Join thousands of people building financial security through community support
          </p>
          <div className="cta-actions">
            <button className="btn-primary btn-large" onClick={handleCreateGroup} disabled={isTransacting}>
              {isTransacting ? 'Processing...' : 'Get Started Now'}
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
