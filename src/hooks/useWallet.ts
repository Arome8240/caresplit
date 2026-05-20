import { useState, useEffect, useCallback } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

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
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  // Check if we are in MiniPay natively on load
  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setIsMiniPay(true);
    }
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);
      if (!window.ethereum) {
        setError('No injected wallet detected. Please use WalletConnect.');
        setIsConnecting(false);
        return;
      }

      // Initialize ethers provider
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      
      // Request account access
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setProvider(browserProvider);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
      console.error('Wallet connection error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const connectWalletConnect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);

      const projectId = import.meta.env.VITE_WC_PROJECT_ID || '3fcc6bba6f1de962d911bb5b5c3dba68'; // Default public testing ID if not set

      const wcProvider = await EthereumProvider.init({
        projectId,
        showQrModal: true,
        chains: [42220], // Celo Mainnet
        metadata: {
          name: 'CareSplit',
          description: 'Community Savings on Celo',
          url: window.location.origin,
          icons: ['https://celo.org/favicon.ico']
        }
      });

      await wcProvider.connect();
      
      const browserProvider = new ethers.BrowserProvider(wcProvider);
      const accounts = await browserProvider.send("eth_accounts", []);
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setProvider(browserProvider);
      }

      // Handle WC specific events
      wcProvider.on("accountsChanged", (accounts: string[]) => {
        if (accounts.length > 0) setAddress(accounts[0]);
        else setAddress(null);
      });

      wcProvider.on("chainChanged", () => {
        window.location.reload();
      });

      wcProvider.on("disconnect", () => {
        setAddress(null);
        setProvider(null);
      });

    } catch (err: any) {
      setError(err.message || 'Failed to connect WalletConnect');
      console.error('WalletConnect error:', err);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  // Handle standard injected account changes
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
    isConnecting,
    error,
    connectWallet,
    connectWalletConnect,
    isConnected: !!address,
  };
};
