import React, { useState, useMemo } from 'react';
import { useCareSplit } from '../../hooks/useCareSplit';
import type { UserGroup } from '../../types';
import { useWallet } from '../../contexts/WalletContext';
import { useDebounce } from '../../hooks/useDebounce';
import { ContributeModal } from '../modals/ContributeModal';
import { WithdrawalRequestModal } from '../modals/WithdrawalRequestModal';
import { GroupDetailsModal } from '../modals/GroupDetailsModal';
import { GroupCard } from '../common/GroupCard';
import { EmptyState } from '../ui/EmptyState';
import { GroupCardSkeleton } from '../ui/Skeleton';

type SortKey = 'id' | 'balance' | 'members';

export const UserGroupsSection: React.FC = () => {
  const { isConnected } = useWallet();
  const { userGroups, isLoadingUserGroups, refreshUserGroups } = useCareSplit();

  const [selectedForContribute, setSelectedForContribute] = useState<UserGroup | null>(null);
  const [selectedForWithdrawal, setSelectedForWithdrawal] = useState<UserGroup | null>(null);
  const [selectedForDetails, setSelectedForDetails] = useState<UserGroup | null>(null);
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('id');

  const debouncedSearch = useDebounce(search, 300);

  const filteredGroups = useMemo(() => {
    let result = [...userGroups];
    if (debouncedSearch) {
      result = result.filter(g => String(g.id).includes(debouncedSearch));
    }
    result.sort((a, b) => {
      if (sortKey === 'balance') return parseFloat(b.totalBalance) - parseFloat(a.totalBalance);
      if (sortKey === 'members') return b.memberCount - a.memberCount;
      return b.id - a.id;
    });
    return result;
  }, [userGroups, debouncedSearch, sortKey]);

  if (!isConnected) return null;

  return (
    <section className="features-section dashboard-section" id="my-groups">
      <div className="container">
        <div className="dashboard-header">
          <div>
            <h2 className="section-title dashboard-title">My Dashboard</h2>
            <p className="section-description">Manage your savings groups and contributions</p>
          </div>
          <button
            className="btn-secondary refresh-btn"
            onClick={() => refreshUserGroups()}
            disabled={isLoadingUserGroups}
            aria-label="Refresh groups"
            title="Refresh"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className={isLoadingUserGroups ? 'spin' : ''}
              aria-hidden="true"
            >
              <path d="M4 4v5h.582M20 20v-5h-.581M4.582 9A8 8 0 0119.419 15M19.419 9A8 8 0 014.582 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Refresh
          </button>
          {userGroups.length > 0 && (
            <div className="dashboard-controls">
              <div className="search-wrapper">
                <svg className="search-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <input
                  type="search"
                  className="search-input"
                  placeholder="Search by Group ID..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search groups"
                />
              </div>
              <select
                className="sort-select"
                value={sortKey}
                onChange={e => setSortKey(e.target.value as SortKey)}
                aria-label="Sort groups"
              >
                <option value="id">Newest First</option>
                <option value="balance">Highest Balance</option>
                <option value="members">Most Members</option>
              </select>
            </div>
          )}
        </div>

        {isLoadingUserGroups ? (
          <div className="features-grid">
            {[1, 2, 3].map(i => <GroupCardSkeleton key={i} />)}
          </div>
        ) : filteredGroups.length === 0 ? (
          <EmptyState
            icon={
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none">
                <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            }
            title={search ? 'No matching groups' : 'No Groups Yet'}
            description={search ? `No groups match "${search}"` : "You haven't joined any groups yet. Create or join one to get started!"}
          />
        ) : (
          <div className="features-grid">
            {filteredGroups.map(group => (
              <GroupCard
                key={group.id}
                group={group}
                onContribute={setSelectedForContribute}
                onRequestWithdrawal={setSelectedForWithdrawal}
                onViewDetails={setSelectedForDetails}
              />
            ))}
          </div>
        )}
      </div>

      {selectedForContribute && (
        <ContributeModal
          isOpen
          onClose={() => setSelectedForContribute(null)}
          groupId={selectedForContribute.id}
          requiredAmount={selectedForContribute.contributionAmount}
        />
      )}
      {selectedForWithdrawal && (
        <WithdrawalRequestModal
          isOpen
          onClose={() => setSelectedForWithdrawal(null)}
          group={selectedForWithdrawal}
        />
      )}
      {selectedForDetails && (
        <GroupDetailsModal
          isOpen
          onClose={() => setSelectedForDetails(null)}
          group={selectedForDetails}
        />
      )}
    </section>
  );
};
