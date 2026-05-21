import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCareSplit } from '../../hooks/useCareSplit';

interface ContributeModalProps {
  isOpen: boolean;
  onClose: () => void;
  groupId: number;
  requiredAmount: string;
}

export const ContributeModal: React.FC<ContributeModalProps> = ({ isOpen, onClose, groupId, requiredAmount }) => {
  const { contribute, isTransacting } = useCareSplit();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      await contribute(groupId, requiredAmount);
      onClose();
    } catch (err: any) {
      setError(err.shortMessage || err.message || "Failed to contribute to group");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Contribute to Group #${groupId}`}>
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: '#ff4444', marginBottom: '16px', fontSize: '14px', padding: '8px', background: 'rgba(255,68,68,0.1)', borderRadius: '8px' }}>
            {error}
          </div>
        )}
        
        <p style={{ color: 'var(--text)', marginBottom: '24px', lineHeight: '1.5' }}>
          This group requires a contribution of <strong style={{ color: 'var(--text-h)' }}>{requiredAmount} CELO</strong> per deposit. 
          Please confirm your transaction below.
        </p>
        
        <button 
          type="submit" 
          className="btn-primary form-submit" 
          disabled={isTransacting}
        >
          {isTransacting ? 'Confirming in Wallet...' : `Pay ${requiredAmount} CELO`}
        </button>
      </form>
    </Modal>
  );
};
