import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="header">
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
          <button className="btn-primary">Connect Wallet</button>
        </div>
      </div>
    </header>
  );
};
