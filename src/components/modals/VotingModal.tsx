import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCareSplit } from '../../hooks/useCareSplit';
import { useToast } from '../../contexts/ToastContext';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  requestId: number;
  groupId: number;
  requesterAddress: string;
  amount: string;
  reason: string;
}

export const VotingModal: React.FC<Props> = ({
  isOpen, onClose, requestId, groupId, requesterAddress, amount, reason,
}) => {
  const { voteOnRequest, isTransacting } = useCareSplit();
  const { addToast } = useToast();
  const [voted, setVoted] = useState<boolean | null>(null);

  const handleVote = async (approve: boolean) => {
    try {
      await voteOnRequest(requestId, approve);
      setVoted(approve);
      addToast(approve ? 'Vote to approve submitted!' : 'Vote to reject submitted!', 'success');
      setTimeout(onClose, 1500);
    } catch (err: any) {
      addToast(err.shortMessage || err.message || 'Vote failed', 'error');
    }
  };

  const shortAddr = (addr: string) => `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Vote on Request #${requestId}`}>
      <div className="voting-modal-body">
        <div className="voting-info-card">
          <div className="voting-info-row">
            <span className="voting-label">Group</span>
            <span className="voting-value">#{groupId}</span>
          </div>
          <div className="voting-info-row">
            <span className="voting-label">Requester</span>
            <span className="voting-value mono">{shortAddr(requesterAddress)}</span>
          </div>
          <div className="voting-info-row">
            <span className="voting-label">Amount</span>
            <span className="voting-value accent">{amount} CELO</span>
          </div>
        </div>

        <div className="voting-reason">
          <p className="voting-reason-label">Reason</p>
          <p className="voting-reason-text">{reason}</p>
        </div>

        {voted !== null ? (
          <div className={`vote-result ${voted ? 'vote-approve' : 'vote-reject'}`}>
            {voted ? '✓ Approved' : '✗ Rejected'}
          </div>
        ) : (
          <div className="voting-actions">
            <button
              className="btn-vote btn-approve"
              onClick={() => handleVote(true)}
              disabled={isTransacting}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Approve
            </button>
            <button
              className="btn-vote btn-reject"
              onClick={() => handleVote(false)}
              disabled={isTransacting}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
              </svg>
              Reject
            </button>
          </div>
        )}
      </div>
    </Modal>
  );
};
