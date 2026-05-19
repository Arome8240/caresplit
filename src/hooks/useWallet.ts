import { useState, useEffect, useCallback } from 'react';
import { ethers, BrowserProvider } from 'ethers';

// Extend window object to include ethereum
declare global {
  interface Window {
    ethereum?: any;
  }
}

export const useWallet = () => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isMiniPay, setIsMiniPay] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const connectWallet = useCallback(async () => {
    try {
      if (!window.ethereum) {
        setError('No wallet detected. Please install a Web3 wallet or use MiniPay.');
        return;
      }

      // Detect MiniPay specifically
      if (window.ethereum.isMiniPay) {
        setIsMiniPay(true);
      }

      // Initialize ethers provider
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setProvider(browserProvider);
        setError(null);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    }
  }, []);

  // Handle account changes natively
  useEffect(() => {
    if (window.ethereum) {
      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length === 0) {
          setAddress(null);
          setProvider(null);
        } else {
          setAddress(accounts[0]);
        }
      };

      const handleChainChanged = () => {
        window.location.reload();
      };

      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

      return () => {
        if (window.ethereum.removeListener) {
          window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
          window.ethereum.removeListener('chainChanged', handleChainChanged);
        }
      };
    }
  }, []);

  return {
    address,
    provider,
    isMiniPay,
    error,
    connectWallet,
    isConnected: !!address,
  };
};
