import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CARESPLIT_ADDRESS, CARESPLIT_ABI } from '../config/contract';
import { useWallet } from './useWallet';

export interface ProtocolStats {
  activeGroups: number;
  totalSaved: string; // formatted in CELO
  members: number;
}

export const useCareSplit = () => {
  const { provider, address } = useWallet();
  const [stats, setStats] = useState<ProtocolStats>({
    activeGroups: 0,
    totalSaved: '0',
    members: 0,
  });
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(true);
  const [isTransacting, setIsTransacting] = useState<boolean>(false);

  // Fetch global protocol stats
  const fetchStats = useCallback(async () => {
    try {
      setIsLoadingStats(true);
      // Use fallback provider to read data even without wallet connected
      const readProvider = new ethers.JsonRpcProvider('https://forno.celo.org');
      const contract = new ethers.Contract(CARESPLIT_ADDRESS, CARESPLIT_ABI, readProvider);

      const totalGroupsBigInt = await contract.getTotalGroups();
      const totalGroups = Number(totalGroupsBigInt);

      let activeCount = 0;
      let totalMembers = 0;
      let totalSavedWei = 0n;

      // Note: In a production app with thousands of groups, you'd use a subgraph/indexer.
      // For this MVP, we batch read the groups (up to the latest 100 to save RPC calls if it gets large).
      const startId = Math.max(1, totalGroups - 99);
      
      const promises = [];
      for (let i = startId; i <= totalGroups; i++) {
        promises.push(contract.getGroup(i).catch(() => null));
      }
      
      const groupResults = await Promise.all(promises);

      for (const group of groupResults) {
        if (group && group.isActive) {
          activeCount++;
          totalMembers += Number(group.memberCount);
          totalSavedWei += group.totalBalance;
        }
      }

      setStats({
        activeGroups: activeCount, // Or just use totalGroups if we want to show all
        totalSaved: ethers.formatEther(totalSavedWei),
        members: totalMembers,
      });
    } catch (error) {
      console.error('Failed to fetch protocol stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
    // Poll stats every 30 seconds
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  // Write Functions
  const createGroup = async (contributionAmountEth: string, maxMembers: number, votingThreshold: number) => {
    if (!provider || !address) throw new Error("Wallet not connected");
    setIsTransacting(true);
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CARESPLIT_ADDRESS, CARESPLIT_ABI, signer);
      
      const tx = await contract.createGroup(
        ethers.parseEther(contributionAmountEth),
        maxMembers,
        votingThreshold
      );
      
      await tx.wait();
      await fetchStats(); // Refresh stats
      return tx;
    } finally {
      setIsTransacting(false);
    }
  };

  const joinGroup = async (groupId: number) => {
    if (!provider || !address) throw new Error("Wallet not connected");
    setIsTransacting(true);
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CARESPLIT_ADDRESS, CARESPLIT_ABI, signer);
      
      const tx = await contract.joinGroup(groupId);
      await tx.wait();
      await fetchStats();
      return tx;
    } finally {
      setIsTransacting(false);
    }
  };

  const contribute = async (groupId: number, amountEth: string) => {
    if (!provider || !address) throw new Error("Wallet not connected");
    setIsTransacting(true);
    try {
      const signer = await provider.getSigner();
      const contract = new ethers.Contract(CARESPLIT_ADDRESS, CARESPLIT_ABI, signer);
      
      const tx = await contract.contribute(groupId, {
        value: ethers.parseEther(amountEth)
      });
      await tx.wait();
      await fetchStats();
      return tx;
    } finally {
      setIsTransacting(false);
    }
  };

  return {
    stats,
    isLoadingStats,
    isTransacting,
    createGroup,
    joinGroup,
    contribute,
    refreshStats: fetchStats
  };
};
