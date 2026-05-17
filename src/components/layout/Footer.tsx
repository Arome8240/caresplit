import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" fill="currentColor" opacity="0.1"/>
                <path d="M16 8v8l5.66 3.27" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="2"/>
              </svg>
              <span className="logo-text">CareSplit</span>
            </div>
            <p className="footer-tagline">
              Community savings on the blockchain
            </p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h4>Product</h4>
              <a href="#features">Features</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#pricing">Pricing</a>
            </div>
            <div className="footer-column">
              <h4>Resources</h4>
              <a href="#docs">Documentation</a>
              <a href="#guides">Guides</a>
              <a href="#faq">FAQ</a>
            </div>
            <div className="footer-column">
              <h4>Community</h4>
              <a href="#discord">Discord</a>
              <a href="#twitter">Twitter</a>
              <a href="#github">GitHub</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 CareSplit. Built with ❤️ on Celo.</p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
