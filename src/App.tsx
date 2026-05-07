import './App.css'

function App() {
  return (
    <div className="app">
      {/* Header */}
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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-badge">
              <span className="badge-dot"></span>
              Built on Celo Blockchain
            </div>
            <h1 className="hero-title">
              Save Together,
              <br />
              <span className="gradient-text">Support Each Other</span>
            </h1>
            <p className="hero-description">
              Join a trusted community savings group where members contribute together
              and support each other during emergencies through democratic voting.
            </p>
            <div className="hero-actions">
              <button className="btn-primary btn-large">
                Create a Group
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M7.5 15l5-5-5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
              <button className="btn-secondary btn-large">
                Join Existing Group
              </button>
            </div>
            <div className="hero-stats">
              <div className="stat">
                <div className="stat-value">1,234</div>
                <div className="stat-label">Active Groups</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <div className="stat-value">$2.5M</div>
                <div className="stat-label">Total Saved</div>
              </div>
              <div className="stat-divider"></div>
              <div className="stat">
                <div className="stat-value">8,456</div>
                <div className="stat-label">Members</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Why Choose CareSplit?</h2>
            <p className="section-description">
              A modern approach to traditional community savings with blockchain security
            </p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Group Savings</h3>
              <p className="feature-description">
                Create or join savings groups with customizable contribution amounts and member limits
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Democratic Voting</h3>
              <p className="feature-description">
                Members vote on emergency withdrawal requests ensuring fair and transparent decisions
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="11" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="2"/>
                  <path d="M7 11V7a5 5 0 0110 0v4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Secure & Transparent</h3>
              <p className="feature-description">
                Smart contracts on Celo blockchain ensure your funds are safe and all transactions are transparent
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Emergency Access</h3>
              <p className="feature-description">
                Request emergency withdrawals when you need support, backed by community approval
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                  <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Community Driven</h3>
              <p className="feature-description">
                Built on trust and mutual support, bringing traditional Esusu to the blockchain
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="feature-title">Low Fees</h3>
              <p className="feature-description">
                Powered by Celo's low-cost infrastructure, making savings accessible to everyone
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Get started in four simple steps
            </p>
          </div>
          <div className="steps-grid">
            <div className="step-card">
              <div className="step-number">01</div>
              <h3 className="step-title">Create or Join a Group</h3>
              <p className="step-description">
                Start a new savings group or join an existing one that matches your goals
              </p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">02</div>
              <h3 className="step-title">Make Contributions</h3>
              <p className="step-description">
                Contribute regularly to build your group's savings pool together
              </p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">03</div>
              <h3 className="step-title">Request When Needed</h3>
              <p className="step-description">
                Submit emergency withdrawal requests with your reason when you need support
              </p>
            </div>
            <div className="step-arrow">→</div>
            <div className="step-card">
              <div className="step-number">04</div>
              <h3 className="step-title">Vote & Support</h3>
              <p className="step-description">
                Members vote on requests, and funds are released when threshold is met
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-card">
            <h2 className="cta-title">Ready to Start Saving Together?</h2>
            <p className="cta-description">
              Join thousands of people building financial security through community support
            </p>
            <div className="cta-actions">
              <button className="btn-primary btn-large">
                Get Started Now
              </button>
              <button className="btn-secondary btn-large">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
    </div>
  )
}

export default App
