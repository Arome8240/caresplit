import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CARESPLIT_ADDRESS, CARESPLIT_ABI } from '../config/contract';
import { useWallet } from '../contexts/WalletContext';
import type { ProtocolStats, UserGroup } from '../types';

export type { ProtocolStats, UserGroup };

export const useCareSplit = () => {
  const { provider, address } = useWallet();
  const [stats, setStats] = useState<ProtocolStats>({ activeGroups: 0, totalSaved: '0', members: 0 });
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(true);
  const [isLoadingUserGroups, setIsLoadingUserGroups] = useState<boolean>(false);
  const [isTransacting, setIsTransacting] = useState<boolean>(false);
  const [lastTxHash, setLastTxHash] = useState<string | null>(null);

  const fetchStats = useCallback(async () => {
    try {
      setIsLoadingStats(true);
      const readProvider = new ethers.JsonRpcProvider('https://forno.celo.org');
      const contract = new ethers.Contract(CARESPLIT_ADDRESS, CARESPLIT_ABI, readProvider);
      const totalGroups = Number(await contract.getTotalGroups());
      let activeCount = 0, totalMembers = 0, totalSavedWei = 0n;
      const startId = Math.max(1, totalGroups - 99);
      const results = await Promise.all(
        Array.from({ length: totalGroups - startId + 1 }, (_, i) =>
          contract.getGroup(startId + i).catch(() => null)
        )
      );
      for (const g of results) {
        if (g?.isActive) {
          activeCount++;
          totalMembers += Number(g.memberCount);
          totalSavedWei += g.totalBalance;
        }
      }
      setStats({ activeGroups: activeCount, totalSaved: ethers.formatEther(totalSavedWei), members: totalMembers });
    } catch (err) {
      console.error('Failed to fetch stats:', err);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  const fetchUserGroups = useCallback(async () => {
    if (!address) { setUserGroups([]); return; }
    try {
      setIsLoadingUserGroups(true);
      const readProvider = new ethers.JsonRpcProvider('https://forno.celo.org');
      const contract = new ethers.Contract(CARESPLIT_ADDRESS, CARESPLIT_ABI, readProvider);
      const totalGroups = Number(await contract.getTotalGroups());
      const startId = Math.max(1, totalGroups - 99);
      const results = await Promise.all(
        Array.from({ length: totalGroups - startId + 1 }, (_, i) => {
          const id = startId + i;
          return Promise.all([
            contract.getGroup(id).catch(() => null),
            contract.getMember(id, address).catch(() => null),
          ]).then(([group, member]) => ({ id, group, member }));
        })
      );
      const myGroups: UserGroup[] = results
        .filter(r => r.group && r.member?.isActive)
        .map(r => ({
          id: r.id,
          creator: r.group.creator,
          contributionAmount: ethers.formatEther(r.group.contributionAmount),
          maxMembers: Number(r.group.maxMembers),
          votingThreshold: Number(r.group.votingThreshold),
          totalBalance: ethers.formatEther(r.group.totalBalance),
          memberCount: Number(r.group.memberCount),
          isActive: r.group.isActive,
          createdAt: Number(r.group.createdAt),
          myContribution: ethers.formatEther(r.member.totalContributed),
        }));
      setUserGroups(myGroups.reverse());
    } catch (err) {
      console.error('Failed to fetch user groups:', err);
    } finally {
      setIsLoadingUserGroups(false);
    }
  }, [address]);

  useEffect(() => {
    fetchStats();
    const i = setInterval(fetchStats, 30000);
    return () => clearInterval(i);
  }, [fetchStats]);

  useEffect(() => {
    fetchUserGroups();
    const i = setInterval(fetchUserGroups, 30000);
    return () => clearInterval(i);
  }, [fetchUserGroups]);

  const getContract = async () => {
    if (!provider || !address) throw new Error('Wallet not connected');
    const signer = await provider.getSigner();
    return new ethers.Contract(CARESPLIT_ADDRESS, CARESPLIT_ABI, signer);
  };

  const withTransaction = async <T>(fn: () => Promise<T>): Promise<T> => {
    setIsTransacting(true);
    setLastTxHash(null);
    try {
      return await fn();
    } finally {
      setIsTransacting(false);
    }
  };

  const createGroup = (contributionAmountEth: string, maxMembers: number, votingThreshold: number) =>
    withTransaction(async () => {
      const contract = await getContract();
      const tx = await contract.createGroup(
        ethers.parseEther(contributionAmountEth), maxMembers, votingThreshold
      );
      await tx.wait();
      setLastTxHash(tx.hash);
      await Promise.all([fetchStats(), fetchUserGroups()]);
      return tx;
    });

  const joinGroup = (groupId: number) =>
    withTransaction(async () => {
      const contract = await getContract();
      const tx = await contract.joinGroup(groupId);
      await tx.wait();
      setLastTxHash(tx.hash);
      await Promise.all([fetchStats(), fetchUserGroups()]);
      return tx;
    });

  const contribute = (groupId: number, amountEth: string) =>
    withTransaction(async () => {
      const contract = await getContract();
      const tx = await contract.contribute(groupId, { value: ethers.parseEther(amountEth) });
      await tx.wait();
      setLastTxHash(tx.hash);
      await Promise.all([fetchStats(), fetchUserGroups()]);
      return tx;
    });

  const requestWithdrawal = (groupId: number, amountEth: string, reason: string) =>
    withTransaction(async () => {
      const contract = await getContract();
      const tx = await contract.requestWithdrawal(groupId, ethers.parseEther(amountEth), reason);
      await tx.wait();
      setLastTxHash(tx.hash);
      return tx;
    });

  const voteOnRequest = (requestId: number, approve: boolean) =>
    withTransaction(async () => {
      const contract = await getContract();
      const tx = await contract.voteOnRequest(requestId, approve);
      await tx.wait();
      setLastTxHash(tx.hash);
      return tx;
    });

  const executeWithdrawal = (requestId: number) =>
    withTransaction(async () => {
      const contract = await getContract();
      const tx = await contract.executeWithdrawal(requestId);
      await tx.wait();
      setLastTxHash(tx.hash);
      await Promise.all([fetchStats(), fetchUserGroups()]);
      return tx;
    });

  return {
    stats, userGroups, isLoadingStats, isLoadingUserGroups, isTransacting, lastTxHash,
    createGroup, joinGroup, contribute, requestWithdrawal, voteOnRequest, executeWithdrawal,
    refreshStats: fetchStats, refreshUserGroups: fetchUserGroups,
  };
};
