import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { useCareSplit } from '../../hooks/useCareSplit';
import { useToast } from '../../contexts/ToastContext';
import { validateContributionAmount, validateWithdrawalReason } from '../../utils/validation';
import type { UserGroup } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  group: UserGroup;
}

export const WithdrawalRequestModal: React.FC<Props> = ({ isOpen, onClose, group }) => {
  const { requestWithdrawal, isTransacting } = useCareSplit();
  const { addToast } = useToast();
  const [amount, setAmount] = useState('');
  const [reason, setReason] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const amountResult = validateContributionAmount(amount);
    if (!amountResult.isValid) newErrors.amount = amountResult.error;
    const reasonResult = validateWithdrawalReason(reason);
    if (!reasonResult.isValid) newErrors.reason = reasonResult.error;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await requestWithdrawal(group.id, amount, reason);
      addToast('Withdrawal request submitted!', 'success');
      onClose();
    } catch (err: any) {
      addToast(err.shortMessage || err.message || 'Failed to submit request', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Request Withdrawal — Group #${group.id}`}>
      <form onSubmit={handleSubmit}>
        <p className="modal-description">
          Pool balance: <strong>{group.totalBalance} CELO</strong>. Requests require {group.votingThreshold}% member approval.
        </p>

        <div className="form-group">
          <label className="form-label">Amount (CELO)</label>
          <input
            type="number"
            step="0.0001"
            min="0.0001"
            className={`form-input ${errors.amount ? 'form-input-error' : ''}`}
            value={amount}
            onChange={e => setAmount(e.target.value)}
            placeholder="0.00"
            disabled={isTransacting}
          />
          {errors.amount && <span className="form-error">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label" htmlFor="withdrawal-reason">Reason</label>
            <span className={`char-counter ${reason.length > 450 ? 'char-counter-warn' : ''}`}>
              {reason.length}/500
            </span>
          </div>
          <textarea
            id="withdrawal-reason"
            className={`form-input form-textarea ${errors.reason ? 'form-input-error' : ''}`}
            value={reason}
            onChange={e => setReason(e.target.value)}
            placeholder="Describe your emergency or reason for withdrawal..."
            disabled={isTransacting}
            rows={4}
            maxLength={500}
            aria-describedby={errors.reason ? 'reason-error' : undefined}
          />
          {errors.reason && <span id="reason-error" className="form-error" role="alert">{errors.reason}</span>}
        </div>

        <button type="submit" className="btn-primary form-submit" disabled={isTransacting}>
          {isTransacting ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </Modal>
  );
};
