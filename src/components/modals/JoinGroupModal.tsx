import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCareSplit } from '../../hooks/useCareSplit';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ isOpen, onClose }) => {
  const { joinGroup, isTransacting } = useCareSplit();
  const [groupId, setGroupId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    try {
      if (!groupId) {
        throw new Error("Group ID is required");
      }
      
      await joinGroup(parseInt(groupId, 10));
      onClose();
    } catch (err: any) {
      setError(err.shortMessage || err.message || "Failed to join group");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join a Group">
      <form onSubmit={handleSubmit}>
        {error && (
          <div style={{ color: '#ff4444', marginBottom: '16px', fontSize: '14px', padding: '8px', background: 'rgba(255,68,68,0.1)', borderRadius: '8px' }}>
            {error}
          </div>
        )}
        
        <div className="form-group">
          <label className="form-label">Group ID</label>
          <input 
            type="number" 
            min="1"
            className="form-input" 
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            disabled={isTransacting}
            placeholder="e.g. 1"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="btn-primary form-submit" 
          disabled={isTransacting}
        >
          {isTransacting ? 'Confirming in Wallet...' : 'Join Group'}
        </button>
      </form>
    </Modal>
  );
};
