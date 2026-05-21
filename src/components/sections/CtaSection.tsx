import React, { useState } from 'react';
import { useCareSplit } from '../../hooks/useCareSplit';
import { CreateGroupModal } from '../modals/CreateGroupModal';

export const CtaSection: React.FC = () => {
  const { isTransacting } = useCareSplit();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <h2 className="cta-title">Ready to Start Saving Together?</h2>
          <p className="cta-description">
            Join thousands of people building financial security through community support
          </p>
          <div className="cta-actions">
            <button className="btn-primary btn-large" onClick={() => setIsCreateModalOpen(true)} disabled={isTransacting}>
              {isTransacting ? 'Processing...' : 'Get Started Now'}
            </button>
            <button className="btn-secondary btn-large">
              Learn More
            </button>
          </div>
        </div>
      </div>
      
      <CreateGroupModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
      />
    </section>
  );
};
