import React, { useState } from 'react';
import { useCareSplit } from '../../hooks/useCareSplit';
import type { UserGroup } from '../../hooks/useCareSplit';
import { useWallet } from '../../contexts/WalletContext';
import { ContributeModal } from '../modals/ContributeModal';

export const UserGroupsSection: React.FC = () => {
  const { isConnected } = useWallet();
  const { userGroups, isLoadingUserGroups } = useCareSplit();
  const [selectedGroup, setSelectedGroup] = useState<UserGroup | null>(null);

  if (!isConnected) return null;

  return (
    <section className="features-section" style={{ padding: '60px 0' }} id="my-groups">
      <div className="container">
        <div className="section-header" style={{ marginBottom: '40px', textAlign: 'left' }}>
          <h2 className="section-title" style={{ fontSize: '32px' }}>My Dashboard</h2>
          <p className="section-description">Manage the groups you have joined and make contributions.</p>
        </div>

        {isLoadingUserGroups ? (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text)' }}>
            Loading your groups...
          </div>
        ) : userGroups.length === 0 ? (
          <div style={{
            background: 'var(--glass-bg)',
            border: '1px solid var(--border)',
            borderRadius: '24px',
            padding: '48px',
            textAlign: 'center',
            backdropFilter: 'blur(10px)'
          }}>
            <h3 style={{ color: 'var(--text-h)', marginBottom: '16px', fontSize: '20px' }}>No Groups Found</h3>
            <p style={{ color: 'var(--text)' }}>You haven't joined any groups yet. Create or join one to get started!</p>
          </div>
        ) : (
          <div className="features-grid">
            {userGroups.map((group) => (
              <div key={group.id} className="feature-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--text-h)' }}>Group #{group.id}</h3>
                  <span style={{
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    background: 'var(--accent-bg)',
                    color: 'var(--accent)'
                  }}>
                    {group.memberCount} / {group.maxMembers} Members
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text)', fontSize: '14px' }}>Requirement:</span>
                    <span style={{ color: 'var(--text-h)', fontWeight: 'bold' }}>{group.contributionAmount} CELO</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text)', fontSize: '14px' }}>Group Balance:</span>
                    <span style={{ color: 'var(--text-h)', fontWeight: 'bold' }}>{group.totalBalance} CELO</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span style={{ color: 'var(--text)', fontSize: '14px' }}>My Total:</span>
                    <span style={{ color: 'var(--accent)', fontWeight: 'bold' }}>{group.myContribution} CELO</span>
                  </div>
                </div>

                <button
                  className="btn-primary"
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={() => setSelectedGroup(group)}
                >
                  Contribute
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedGroup && (
        <ContributeModal
          isOpen={true}
          onClose={() => setSelectedGroup(null)}
          groupId={selectedGroup.id}
          requiredAmount={selectedGroup.contributionAmount}
        />
      )}
    </section>
  );
};
