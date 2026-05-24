import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCareSplit } from '../../hooks/useCareSplit';
import { useToast } from '../../contexts/ToastContext';
import {
  validateContributionAmount,
  validateMaxMembers,
  validateVotingThreshold,
} from '../../utils/validation';

interface CreateGroupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CreateGroupModal: React.FC<CreateGroupModalProps> = ({ isOpen, onClose }) => {
  const { createGroup, isTransacting } = useCareSplit();
  const { addToast } = useToast();
  const [amount, setAmount] = useState('0.01');
  const [maxMembers, setMaxMembers] = useState('5');
  const [threshold, setThreshold] = useState('60');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const a = validateContributionAmount(amount);
    if (!a.isValid) newErrors.amount = a.error;
    const m = validateMaxMembers(maxMembers);
    if (!m.isValid) newErrors.maxMembers = m.error;
    const t = validateVotingThreshold(threshold);
    if (!t.isValid) newErrors.threshold = t.error;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await createGroup(amount, parseInt(maxMembers, 10), parseInt(threshold, 10));
      addToast('Group created successfully!', 'success');
      onClose();
    } catch (err: any) {
      addToast(err.shortMessage || err.message || 'Failed to create group', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create a Group">
      <form onSubmit={handleSubmit} noValidate>
        <p className="modal-description">
          Set up your savings group. Members can join with your Group ID after creation.
        </p>

        <div className="form-group">
          <label className="form-label" htmlFor="create-amount">
            Contribution Amount (CELO)
            <span className="form-hint">Per deposit</span>
          </label>
          <input
            id="create-amount"
            type="number"
            step="0.0001"
            min="0.0001"
            className={`form-input ${errors.amount ? 'form-input-error' : ''}`}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            disabled={isTransacting}
          />
          {errors.amount && <span className="form-error" role="alert">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="create-max-members">
            Max Members
            <span className="form-hint">2–100</span>
          </label>
          <input
            id="create-max-members"
            type="number"
            min="2"
            max="100"
            className={`form-input ${errors.maxMembers ? 'form-input-error' : ''}`}
            value={maxMembers}
            onChange={e => setMaxMembers(e.target.value)}
            disabled={isTransacting}
          />
          {errors.maxMembers && <span className="form-error" role="alert">{errors.maxMembers}</span>}
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="create-threshold">
            Voting Threshold (%)
            <span className="form-hint">% of members needed to approve withdrawals</span>
          </label>
          <input
            id="create-threshold"
            type="number"
            min="1"
            max="100"
            className={`form-input ${errors.threshold ? 'form-input-error' : ''}`}
            value={threshold}
            onChange={e => setThreshold(e.target.value)}
            disabled={isTransacting}
          />
          {errors.threshold && <span className="form-error" role="alert">{errors.threshold}</span>}
        </div>

        <button type="submit" className="btn-primary form-submit" disabled={isTransacting}>
          {isTransacting ? (
            <>
              <span className="spinner-inline" />
              Confirming in Wallet...
            </>
          ) : 'Create Group'}
        </button>
      </form>
    </Modal>
  );
};
