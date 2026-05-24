import React from 'react';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';

const steps = [
  {
    number: '01',
    title: 'Create or Join a Group',
    desc: 'Start a new savings group or join an existing one that matches your goals',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Make Contributions',
    desc: 'Contribute regularly to build your group\'s savings pool together',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Request When Needed',
    desc: 'Submit emergency withdrawal requests with your reason when you need support',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 8v4M12 16h.01" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Vote & Support',
    desc: 'Members vote on requests, and funds are released when threshold is met',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export const HowItWorksSection: React.FC = () => {
  const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

  return (
    <section id="how-it-works" className="how-it-works-section" ref={ref as React.RefObject<HTMLElement>}>
      <div className="container">
        <div className={`section-header fade-in-section ${isVisible ? 'visible' : ''}`}>
          <h2 className="section-title">How It Works</h2>
          <p className="section-description">Get started in four simple steps</p>
        </div>
        <div className="steps-grid">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div
                className={`step-card fade-in-section ${isVisible ? 'visible' : ''}`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="step-icon" aria-hidden="true">{step.icon}</div>
                <div className="step-number">{step.number}</div>
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="step-arrow" aria-hidden="true">→</div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};
