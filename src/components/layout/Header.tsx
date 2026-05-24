import React, { useState, useEffect } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { formatAddress } from '../../utils/format';

export const Header: React.FC = () => {
  const { address, isConnected, connectWallet, connectWalletConnect, disconnectWallet, error, isMiniPay, isConnecting } = useWallet();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showWalletMenu, setShowWalletMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#faq', label: 'FAQ' },
  ];

  return (
    <>
      {error && (
        <div className="error-banner" role="alert">{error}</div>
      )}
      <header className={`header ${scrolled ? 'header-scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <a href="#" className="logo" aria-label="CareSplit home">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.1"/>
                <path d="M16 8v8l5.66 3.27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="logo-text">CareSplit</span>
            </a>

            <nav className="nav" aria-label="Main navigation">
              {navLinks.map(link => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </nav>

            <div className="header-actions">
              {isConnected && address ? (
                <div className="wallet-menu-wrapper">
                  <button
                    className="btn-primary wallet-address-btn"
                    onClick={() => setShowWalletMenu(v => !v)}
                    aria-haspopup="true"
                    aria-expanded={showWalletMenu}
                  >
                    <span className="wallet-dot" />
                    {formatAddress(address)}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {showWalletMenu && (
                    <div className="wallet-dropdown" role="menu">
                      <button
                        className="wallet-dropdown-item"
                        onClick={() => { disconnectWallet(); setShowWalletMenu(false); }}
                        role="menuitem"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                          <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Disconnect
                      </button>
                    </div>
                  )}
                </div>
              ) : isMiniPay ? (
                <button className="btn-primary" onClick={connectWallet} disabled={isConnecting}>
                  {isConnecting ? 'Connecting...' : 'Connect MiniPay'}
                </button>
              ) : (
                <>
                  <button className="btn-secondary" onClick={connectWalletConnect} disabled={isConnecting} aria-label="Connect with WalletConnect">
                    WalletConnect
                  </button>
                  <button className="btn-primary" onClick={connectWallet} disabled={isConnecting} aria-label="Connect browser wallet">
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                </>
              )}

              <button
                className="hamburger-btn"
                onClick={() => setMobileOpen(v => !v)}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
              >
                {mobileOpen ? (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                ) : (
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <path d="M3 12h18M3 6h18M3 18h18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileOpen(false)}>
          <nav className="mobile-nav" onClick={e => e.stopPropagation()} aria-label="Mobile navigation">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} className="mobile-nav-link" onClick={() => setMobileOpen(false)}>
                {link.label}
              </a>
            ))}
            <div className="mobile-nav-wallet">
              {isConnected && address ? (
                <button className="btn-secondary" onClick={() => { disconnectWallet(); setMobileOpen(false); }}>
                  Disconnect {formatAddress(address)}
                </button>
              ) : (
                <>
                  <button className="btn-primary" onClick={() => { connectWallet(); setMobileOpen(false); }} disabled={isConnecting}>
                    {isConnecting ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                  <button className="btn-secondary" onClick={() => { connectWalletConnect(); setMobileOpen(false); }} disabled={isConnecting}>
                    WalletConnect
                  </button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </>
  );
};
