import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCareSplit } from '../../hooks/useCareSplit';
import { useToast } from '../../contexts/ToastContext';
import { validateGroupId } from '../../utils/validation';

interface JoinGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const JoinGroupModal: React.FC<JoinGroupModalProps> = ({ isOpen, onClose }) => {
  const { joinGroup, isTransacting } = useCareSplit();
  const { addToast } = useToast();
  const [groupId, setGroupId] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = validateGroupId(groupId);
    if (!result.isValid) { setError(result.error); return; }
    setError('');
    try {
      await joinGroup(parseInt(groupId, 10));
      addToast(`Joined Group #${groupId} successfully!`, 'success');
      onClose();
    } catch (err: any) {
      const msg = err.shortMessage || err.message || 'Failed to join group';
      setError(msg);
      addToast(msg, 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Join a Group">
      <form onSubmit={handleSubmit} noValidate>
        <p className="modal-description">
          Enter the Group ID shared by the group creator to join their savings group.
        </p>
        <div className="form-group">
          <label className="form-label" htmlFor="join-group-id">Group ID</label>
          <input
            id="join-group-id"
            type="number"
            min="1"
            className={`form-input ${error ? 'form-input-error' : ''}`}
            value={groupId}
            onChange={e => { setGroupId(e.target.value); setError(''); }}
            disabled={isTransacting}
            placeholder="Enter group ID (e.g. 42)"
            autoFocus
          />
          {error && <span className="form-error" role="alert">{error}</span>}
        </div>
        <button type="submit" className="btn-primary form-submit" disabled={isTransacting}>
          {isTransacting ? (
            <><span className="spinner-inline" />Confirming in Wallet...</>
          ) : 'Join Group'}
        </button>
      </form>
    </Modal>
  );
};
