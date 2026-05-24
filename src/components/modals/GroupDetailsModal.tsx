import React from 'react';
import { Modal } from '../ui/Modal';
import { ProgressBar } from '../ui/ProgressBar';
import { Badge } from '../ui/Badge';
import { formatCelo, formatDate, formatAddress } from '../../utils/format';
import { getAddressExplorerUrl } from '../../config/network';
import type { UserGroup } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  group: UserGroup;
}

export const GroupDetailsModal: React.FC<Props> = ({ isOpen, onClose, group }) => (
  <Modal isOpen={isOpen} onClose={onClose} title={`Group #${group.id} Details`}>
    <div className="group-details-body">
      <div className="group-details-status">
        <Badge variant={group.isActive ? 'success' : 'danger'}>
          {group.isActive ? 'Active' : 'Inactive'}
        </Badge>
        <span className="group-details-created">Created {formatDate(group.createdAt)}</span>
      </div>

      <ProgressBar
        value={group.memberCount}
        max={group.maxMembers}
        label={`Members (${group.memberCount}/${group.maxMembers})`}
        showPercent
      />

      <div className="details-grid">
        <div className="detail-item">
          <span className="detail-label">Contribution Amount</span>
          <span className="detail-value">{formatCelo(group.contributionAmount)} CELO</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Pool Balance</span>
          <span className="detail-value accent">{formatCelo(group.totalBalance)} CELO</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">My Contribution</span>
          <span className="detail-value">{formatCelo(group.myContribution)} CELO</span>
        </div>
        <div className="detail-item">
          <span className="detail-label">Voting Threshold</span>
          <span className="detail-value">{group.votingThreshold}%</span>
        </div>
      </div>

      <div className="detail-item">
        <span className="detail-label">Creator</span>
        <a
          className="detail-link"
          href={getAddressExplorerUrl(group.creator)}
          target="_blank"
          rel="noopener noreferrer"
        >
          {formatAddress(group.creator)}
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ marginLeft: 4 }}>
            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </div>
  </Modal>
);
