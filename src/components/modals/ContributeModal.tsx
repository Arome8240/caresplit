import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCareSplit } from '../../hooks/useCareSplit';
import { useToast } from '../../contexts/ToastContext';
import { getTxExplorerUrl } from '../../config/network';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  requiredAmount: string;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({
  isOpen, onClose, groupId, requiredAmount,
}) => {
  const { contribute, isTransacting } = useCareSplit();
  const { addToast } = useToast();
  const [txHash, setTxHash] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tx = await contribute(groupId, requiredAmount);
      setTxHash(tx.hash);
      setSuccess(true);
      addToast(`Contribution of ${requiredAmount} CELO confirmed!`, 'success');
    } catch (err: any) {
      addToast(err.shortMessage || err.message || 'Contribution failed', 'error');
    }
  };

  const handleClose = () => {
    setTxHash(null);
    setSuccess(false);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} title={`Contribute to Group #${groupId}`}>
      {success ? (
        <div className="tx-success">
          <div className="tx-success-icon">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
              <path d="M8 12l3 3 5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h3 className="tx-success-title">Contribution Successful!</h3>
          <p className="tx-success-amount">{requiredAmount} CELO sent to Group #{groupId}</p>
          {txHash && (
            <a
              className="tx-hash-link"
              href={getTxExplorerUrl(txHash)}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Celoscan
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          )}
          <button className="btn-primary form-submit" onClick={handleClose}>Done</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="contribute-summary">
            <div className="contribute-amount-display">
              <span className="contribute-amount-value">{requiredAmount}</span>
              <span className="contribute-amount-unit">CELO</span>
            </div>
            <p className="contribute-description">
              This contribution will be added to Group #{groupId}'s savings pool.
              Members vote democratically on any withdrawal requests.
            </p>
          </div>
          <button type="submit" className="btn-primary form-submit" disabled={isTransacting}>
            {isTransacting ? (
              <><span className="spinner-inline" />Confirming in Wallet...</>
            ) : `Confirm ${requiredAmount} CELO`}
          </button>
        </form>
      )}
    </Modal>
  );
};
