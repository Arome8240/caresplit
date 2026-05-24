import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { copyToClipboard } from '../../utils/clipboard';
import { useToast } from '../../contexts/ToastContext';
import type { UserGroup } from '../../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  group: UserGroup;
}

export const ShareGroupModal: React.FC<Props> = ({ isOpen, onClose, group }) => {
  const { addToast } = useToast();
  const [copied, setCopied] = useState(false);

  const shareText = `Join my CareSplit savings group!\nGroup ID: #${group.id}\nContribution: ${group.contributionAmount} CELO per deposit\nMembers: ${group.memberCount}/${group.maxMembers}`;

  const handleCopy = async () => {
    const ok = await copyToClipboard(shareText);
    setCopied(true);
    addToast(ok ? 'Invite details copied!' : 'Copy failed', ok ? 'success' : 'error');
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyId = async () => {
    const ok = await copyToClipboard(String(group.id));
    addToast(ok ? `Group ID #${group.id} copied!` : 'Copy failed', ok ? 'success' : 'error');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share Group">
      <div className="share-modal-body">
        <div className="share-id-display">
          <span className="share-id-label">Group ID</span>
          <div className="share-id-row">
            <span className="share-id-value">#{group.id}</span>
            <button className="btn-secondary btn-sm" onClick={handleCopyId}>Copy ID</button>
          </div>
        </div>

        <div className="share-preview">
          <pre className="share-text">{shareText}</pre>
        </div>

        <button className="btn-primary form-submit" onClick={handleCopy}>
          {copied ? '✓ Copied!' : 'Copy Invite Details'}
        </button>
      </div>
    </Modal>
  );
};
