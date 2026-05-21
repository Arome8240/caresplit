import { useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';
import { CARESPLIT_ADDRESS, CARESPLIT_ABI } from '../config/contract';
import { useWallet } from '../contexts/WalletContext';

export interface ProtocolStats {
  activeGroups: number;
  totalSaved: string; // formatted in CELO
  members: number;
}

export interface UserGroup {
  id: number;
  creator: string;
  contributionAmount: string; // formatted in CELO
  maxMembers: number;
  votingThreshold: number;
  totalBalance: string; // formatted in CELO
  memberCount: number;
  isActive: boolean;
  createdAt: number;
  myContribution: string; // formatted in CELO
}

export const useCareSplit = () => {
  const { provider, address } = useWallet();
  const [stats, setStats] = useState<ProtocolStats>({
    activeGroups: 0,
    totalSaved: '0',
    members: 0,
  });
  const [userGroups, setUserGroups] = useState<UserGroup[]>([]);
  const [isLoadingStats, setIsLoadingStats] = useState<boolean>(true);
  const [isLoadingUserGroups, setIsLoadingUserGroups] = useState<boolean>(false);
  const [isTransacting, setIsTransacting] = useState<boolean>(false);

  // Fetch global protocol stats
  const fetchStats = useCallback(async () => {
    try {
      setIsLoadingStats(true);
      const readProvider = new ethers.JsonRpcProvider('https://forno.celo.org');
      const contract = new ethers.Contract(CARESPLIT_ADDRESS, CARESPLIT_ABI, readProvider);

      const totalGroupsBigInt = await contract.getTotalGroups();
      const totalGroups = Number(totalGroupsBigInt);

      let activeCount = 0;
      let totalMembers = 0;
      let totalSavedWei = 0n;

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
        activeGroups: activeCount,
        totalSaved: ethers.formatEther(totalSavedWei),
        members: totalMembers,
      });
    } catch (error) {
      console.error('Failed to fetch protocol stats:', error);
    } finally {
      setIsLoadingStats(false);
    }
  }, []);

  // Fetch User Groups
  const fetchUserGroups = useCallback(async () => {
    if (!address) {
      setUserGroups([]);
      return;
    }
    
    try {
      setIsLoadingUserGroups(true);
      const readProvider = new ethers.JsonRpcProvider('https://forno.celo.org');
      const contract = new ethers.Contract(CARESPLIT_ADDRESS, CARESPLIT_ABI, readProvider);
      
      const totalGroupsBigInt = await contract.getTotalGroups();
      const totalGroups = Number(totalGroupsBigInt);
      
      const startId = Math.max(1, totalGroups - 99);
      
      const promises = [];
      for (let i = startId; i <= totalGroups; i++) {
        promises.push(
          Promise.all([
            contract.getGroup(i).catch(() => null),
            contract.getMember(i, address).catch(() => null)
          ]).then(([group, member]) => ({ id: i, group, member }))
        );
      }
      
      const results = await Promise.all(promises);
      const myGroups: UserGroup[] = [];
      
      for (const res of results) {
        if (res.group && res.member && res.member.isActive) {
          myGroups.push({
            id: res.id,
            creator: res.group.creator,
            contributionAmount: ethers.formatEther(res.group.contributionAmount),
            maxMembers: Number(res.group.maxMembers),
            votingThreshold: Number(res.group.votingThreshold),
            totalBalance: ethers.formatEther(res.group.totalBalance),
            memberCount: Number(res.group.memberCount),
            isActive: res.group.isActive,
            createdAt: Number(res.group.createdAt),
            myContribution: ethers.formatEther(res.member.totalContributed)
          });
        }
      }
      
      setUserGroups(myGroups.reverse()); // Show newest first
    } catch (error) {
      console.error('Failed to fetch user groups:', error);
    } finally {
      setIsLoadingUserGroups(false);
    }
  }, [address]);

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [fetchStats]);

  useEffect(() => {
    fetchUserGroups();
    const interval = setInterval(fetchUserGroups, 30000);
    return () => clearInterval(interval);
  }, [fetchUserGroups]);

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
      await fetchStats();
      await fetchUserGroups();
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
      await fetchUserGroups();
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
      await fetchUserGroups();
      return tx;
    } finally {
      setIsTransacting(false);
    }
  };

  return {
    stats,
    userGroups,
    isLoadingStats,
    isLoadingUserGroups,
    isTransacting,
    createGroup,
    joinGroup,
    contribute,
    refreshStats: fetchStats,
    refreshUserGroups: fetchUserGroups
  };
};
