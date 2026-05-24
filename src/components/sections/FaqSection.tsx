import React, { useState } from 'react';

const faqs = [
  {
    q: 'What is CareSplit?',
    a: 'CareSplit is a decentralized community savings platform on the Celo blockchain. It brings the traditional Esusu/Ajo concept on-chain — members contribute to a shared pool and democratically vote on emergency withdrawals.',
  },
  {
    q: 'How do I join a group?',
    a: 'Connect your wallet, click "Join Existing Group", and enter the Group ID shared by the group creator. You will become a member immediately after the transaction is confirmed.',
  },
  {
    q: 'How are withdrawals approved?',
    a: 'Any member can submit a withdrawal request with a reason. Other members vote to approve or reject it. If approvals meet the group\'s voting threshold percentage, the funds are released automatically.',
  },
  {
    q: 'Is my money safe?',
    a: 'All funds are held in a verified smart contract on Celo — no admin can access your money. Withdrawals require democratic approval from group members, and all transactions are fully transparent on the blockchain.',
  },
  {
    q: 'What wallet can I use?',
    a: 'CareSplit supports any browser-based Ethereum-compatible wallet (MetaMask, Rabby, etc.), WalletConnect-compatible mobile wallets, and MiniPay — the Celo-native mobile wallet.',
  },
  {
    q: 'Are there any fees?',
    a: 'CareSplit itself charges no protocol fee. You only pay Celo network gas fees, which are very low (typically fractions of a cent) thanks to Celo\'s efficient infrastructure.',
  },
];

const FaqItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? 'open' : ''}`}>
      <button className="faq-question" onClick={() => setOpen(v => !v)} aria-expanded={open}>
        <span>{q}</span>
        <svg className="faq-chevron" width="20" height="20" viewBox="0 0 24 24" fill="none">
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
      {open && <p className="faq-answer">{a}</p>}
    </div>
  );
};

export const FaqSection: React.FC = () => (
  <section id="faq" className="faq-section">
    <div className="container">
      <div className="section-header">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <p className="section-description">Everything you need to know about CareSplit</p>
      </div>
      <div className="faq-list">
        {faqs.map((item, i) => <FaqItem key={i} {...item} />)}
      </div>
    </div>
  </section>
);
