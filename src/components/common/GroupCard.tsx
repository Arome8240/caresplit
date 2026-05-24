import React, { useState } from 'react';
import type { UserGroup } from '../../types';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { copyToClipboard } from '../../utils/clipboard';
import { formatCelo, formatDate } from '../../utils/format';
import { useToast } from '../../contexts/ToastContext';

interface GroupCardProps {
  group: UserGroup;
  onContribute: (group: UserGroup) => void;
  onRequestWithdrawal: (group: UserGroup) => void;
  onViewDetails: (group: UserGroup) => void;
}

export const GroupCard: React.FC<GroupCardProps> = ({
  group,
  onContribute,
  onRequestWithdrawal,
  onViewDetails,
}) => {
  const { addToast } = useToast();
  const [copying, setCopying] = useState(false);

  const fillPercent = group.maxMembers > 0
    ? Math.round((group.memberCount / group.maxMembers) * 100)
    : 0;

  const handleCopyId = async () => {
    setCopying(true);
    const ok = await copyToClipboard(String(group.id));
    addToast(ok ? `Group ID #${group.id} copied!` : 'Failed to copy', ok ? 'success' : 'error');
    setTimeout(() => setCopying(false), 1000);
  };

  return (
    <div className="group-card feature-card">
      <div className="group-card-header">
        <div className="group-card-title-row">
          <h3 className="group-card-title">Group #{group.id}</h3>
          <Badge variant={group.isActive ? 'success' : 'danger'}>
            {group.isActive ? 'Active' : 'Inactive'}
          </Badge>
        </div>
        <button
          className="copy-id-btn"
          onClick={handleCopyId}
          title="Copy Group ID"
          aria-label="Copy group ID"
        >
          {copying ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/>
            </svg>
          )}
        </button>
      </div>

      <ProgressBar
        value={group.memberCount}
        max={group.maxMembers}
        label="Members"
        showPercent
        className="group-card-progress"
      />

      <div className="group-card-stats">
        <div className="group-stat-row">
          <span className="group-stat-label">Contribution</span>
          <span className="group-stat-value">{formatCelo(group.contributionAmount)} CELO</span>
        </div>
        <div className="group-stat-row">
          <span className="group-stat-label">Pool Balance</span>
          <span className="group-stat-value">{formatCelo(group.totalBalance)} CELO</span>
        </div>
        <div className="group-stat-row">
          <span className="group-stat-label">My Contribution</span>
          <span className="group-stat-value accent">{formatCelo(group.myContribution)} CELO</span>
        </div>
        <div className="group-stat-row">
          <span className="group-stat-label">Vote Threshold</span>
          <span className="group-stat-value">{group.votingThreshold}%</span>
        </div>
        <div className="group-stat-row">
          <span className="group-stat-label">Created</span>
          <span className="group-stat-value">{formatDate(group.createdAt)}</span>
        </div>
      </div>

      <div className="group-card-actions">
        <button
          className="btn-primary"
          style={{ flex: 1 }}
          onClick={() => onContribute(group)}
          aria-label={`Contribute to Group #${group.id}`}
        >
          Contribute
        </button>
        <button
          className="btn-secondary"
          onClick={() => onRequestWithdrawal(group)}
          title="Request withdrawal"
          aria-label={`Request withdrawal from Group #${group.id}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button
          className="btn-secondary"
          onClick={() => onViewDetails(group)}
          title="View details"
          aria-label={`View details for Group #${group.id}`}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4.35-4.35M11 8v3M11 14h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
};
