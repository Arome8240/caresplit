import React, { useState } from 'react';
import { useCareSplit } from '../../hooks/useCareSplit';
import { useWallet } from '../../contexts/WalletContext';
import { CreateGroupModal } from '../modals/CreateGroupModal';
import { JoinGroupModal } from '../modals/JoinGroupModal';

export const CtaSection: React.FC = () => {
  const { isTransacting } = useCareSplit();
  const { isConnected } = useWallet();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isJoinModalOpen, setIsJoinModalOpen] = useState(false);

  return (
    <section className="cta-section">
      <div className="container">
        <div className="cta-card">
          <div className="cta-badge">Start Today</div>
          <h2 className="cta-title">Ready to Start Saving Together?</h2>
          <p className="cta-description">
            Join thousands of people building financial security through community support on Celo
          </p>
          <div className="cta-actions">
            <button
              className="btn-primary btn-large cta-btn-primary"
              onClick={() => setIsCreateModalOpen(true)}
              disabled={isTransacting}
            >
              {isTransacting ? 'Processing...' : 'Create a Group'}
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            <button
              className="btn-secondary btn-large cta-btn-secondary"
              onClick={() => setIsJoinModalOpen(true)}
              disabled={isTransacting}
            >
              Join a Group
            </button>
          </div>
          {!isConnected && (
            <p className="cta-hint">Connect your wallet to get started — it takes less than 30 seconds</p>
          )}
        </div>
      </div>

      <CreateGroupModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} />
      <JoinGroupModal isOpen={isJoinModalOpen} onClose={() => setIsJoinModalOpen(false)} />
    </section>
  );
};
