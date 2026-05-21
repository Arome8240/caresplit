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
  isMiniPay: boolean;
  isConnecting: boolean;
  error: string | null;
  isConnected: boolean;
  connectWallet: () => Promise<void>;
  connectWalletConnect: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export const WalletProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [address, setAddress] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);
  const [isMiniPay, setIsMiniPay] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState<boolean>(false);

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

      const browserProvider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await browserProvider.send("eth_requestAccounts", []);
      
      if (accounts && accounts.length > 0) {
        setAddress(accounts[0]);
        setProvider(browserProvider);
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
    } finally {
      setIsConnecting(false);
    }
  }, []);

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

  return (
    <WalletContext.Provider value={{
      address, provider, isMiniPay, isConnecting, error, isConnected: !!address, connectWallet, connectWalletConnect
    }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
};
