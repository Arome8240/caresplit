import React from 'react';
import { useWallet } from '../../contexts/WalletContext';

export const Header: React.FC = () => {
  const { address, isConnected, connectWallet, connectWalletConnect, error, isMiniPay, isConnecting } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <header className="header">
      {error && (
        <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'red', padding: '8px', textAlign: 'center', fontSize: '14px' }}>
          {error}
        </div>
      )}
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.1"/>
              <path d="M16 8v8l5.66 3.27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <span className="logo-text">CareSplit</span>
          </div>
          <nav className="nav">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <a href="#about">About</a>
          </nav>
          
          <div style={{ display: 'flex', gap: '12px' }}>
            {isConnected && address ? (
              <button className="btn-primary">
                {formatAddress(address)}
              </button>
            ) : isMiniPay ? (
              <button className="btn-primary" onClick={connectWallet} disabled={isConnecting}>
                {isConnecting ? 'Connecting...' : 'Connect MiniPay'}
              </button>
            ) : (
              <>
                <button className="btn-secondary" onClick={connectWalletConnect} disabled={isConnecting}>
                  WalletConnect
                </button>
                <button className="btn-primary" onClick={connectWallet} disabled={isConnecting}>
                  Browser Wallet
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
