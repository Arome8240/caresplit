import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ReactNode } from 'react';
import { ethers, BrowserProvider } from 'ethers';
import { EthereumProvider } from '@walletconnect/ethereum-provider';

declare global {
  interface Window {
    ethereum?: any;
  }
}

interface WalletContextType {
  address: string | null;
  provider: BrowserProvider | null;
  chainId: number | null;
  isMiniPay: boolean;
  isConnecting: boolean;
  error: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isMiniPay, setIsMiniPay] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

  useEffect(() => {
    if (window.ethereum && window.ethereum.isMiniPay) {
      setIsMiniPay(true);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    setAddress(null);
    setProvider(null);
    setChainId(null);
    setError(null);
  }, []);

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);
      if (!window.ethereum) {
        setError('No injected wallet detected. Please use WalletConnect.');
        return;
      }
      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await browserProvider.send('eth_requestAccounts', []);
      const network = await browserProvider.getNetwork();
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setProvider(browserProvider);
        setChainId(Number(network.chainId));
      }
    } catch (err: any) {
      setError(err.message || 'Failed to connect wallet');
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const connectWalletConnect = useCallback(async () => {
    try {
      setIsConnecting(true);
      setError(null);
      const projectId = import.meta.env.VITE_WC_PROJECT_ID || '3fcc6bba6f1de962d911bb5b5c3dba68';
      const wcProvider = await EthereumProvider.init({
        projectId,
        showQrModal: true,
        chains: [42220],
        metadata: {
          name: 'CareSplit',
          description: 'Community Savings on Celo',
          url: window.location.origin,
          icons: ['https://celo.org/favicon.ico'],
        },
      });
      await wcProvider.connect();
      const browserProvider = new ethers.BrowserProvider(wcProvider);
      const accounts = await browserProvider.send('eth_accounts', []);
      const network = await browserProvider.getNetwork();
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setProvider(browserProvider);
        setChainId(Number(network.chainId));
      }
      wcProvider.on('accountsChanged', (accs: string[]) => {
        if (accs.length > 0) setAddress(accs[0]);
        else disconnectWallet();
      });
      wcProvider.on('chainChanged', () => window.location.reload());
      wcProvider.on('disconnect', disconnectWallet);
    } catch (err: any) {
      setError(err.message || 'Failed to connect WalletConnect');
    } finally {
      setIsConnecting(false);
    }
  }, [disconnectWallet]);

  useEffect(() => {
    if (!window.ethereum) return;
    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) disconnectWallet();
      else setAddress(accounts[0]);
    };
    const handleChainChanged = () => window.location.reload();
    window.ethereum.on('accountsChanged', handleAccountsChanged);
    window.ethereum.on('chainChanged', handleChainChanged);
    return () => {
      if (window.ethereum.removeListener) {
        window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
        window.ethereum.removeListener('chainChanged', handleChainChanged);
      }
    };
  }, [disconnectWallet]);

  return (
    <WalletContext.Provider value={{
      address, provider, chainId, isMiniPay, isConnecting, error,
      isConnected: !!address, connectWallet, connectWalletConnect, disconnectWallet,
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within a WalletProvider');
  return ctx;
};
