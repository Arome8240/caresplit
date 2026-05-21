import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCareSplit } from '../../hooks/useCareSplit';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose }) => {
  const { createGroup, isTransacting } = useCareSplit();
  const [amount, setAmount] = useState('0.01');
  const [maxMembers, setMaxMembers] = useState('5');
  const [threshold, setThreshold] = useState('60');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!amount || !maxMembers || !threshold) {
        throw new Error("All fields are required");
      }
      
      await createGroup(
        amount, 
        parseInt(maxMembers, 10), 
        parseInt(threshold, 10)
      );
      
      onClose();
    } catch (err: any) {
      setError(err.shortMessage || err.message || "Failed to create group");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a Group">
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: '#ff4444', marginBottom: '16px', fontSize: '14px', padding: '8px', background: 'rgba(255,68,68,0.1)', borderRadius: '8px' }}>
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label">Contribution Amount (CELO)</label>
          <input 
            type="number" 
            step="0.0001"
            min="0.0001"
            className="form-input" 
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            disabled={isTransacting}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Max Members</label>
          <input 
            type="number" 
            min="2"
            max="100"
            className="form-input" 
            value={maxMembers}
            onChange={(e) => setMaxMembers(e.target.value)}
            disabled={isTransacting}
            required
          />
        </div>
        
        <div className="form-group">
          <label className="form-label">Voting Threshold (%)</label>
          <input 
            type="number" 
            min="1"
            max="100"
            className="form-input" 
            value={threshold}
            onChange={(e) => setThreshold(e.target.value)}
            disabled={isTransacting}
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-primary form-submit" 
          disabled={isTransacting}
        >
          {isTransacting ? 'Confirming in Wallet...' : 'Create Group'}
        </button>
      </form>
    </Modal>
  );
};
