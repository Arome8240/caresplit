export interface ProtocolStats {
  activeGroups: number;
  totalSaved: string;
  members: number;
}

export interface UserGroup {
  id: number;
  creator: string;
  contributionAmount: string;
  maxMembers: number;
  votingThreshold: number;
  totalBalance: string;
  memberCount: number;
  isActive: boolean;
  createdAt: number;
  myContribution: string;
}

export interface WithdrawalRequest {
  id: number;
  groupId: number;
  requester: string;
  amount: string;
  reason: string;
  approvals: number;
  isExecuted: boolean;
  createdAt: number;
}

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface NetworkConfig {
  chainId: number;
  name: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}
