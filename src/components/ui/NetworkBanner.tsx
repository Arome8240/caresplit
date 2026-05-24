import React from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { SUPPORTED_CHAIN_ID } from '../../config/network';

export const NetworkBanner: React.FC = () => {
  const { chainId, isConnected } = useWallet();

  if (!isConnected || !chainId || chainId === SUPPORTED_CHAIN_ID) return null;

  return (
    <div className="network-banner" role="alert">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
        <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      <span>Wrong network detected. Please switch to <strong>Celo Mainnet</strong> to use CareSplit.</span>
    </div>
  );
};
