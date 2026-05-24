# CareSplit

> Decentralized community savings platform on Celo — bringing traditional Esusu/Ajo on-chain with democratic voting and transparent governance.

## Overview

CareSplit enables community members to pool savings together and collectively decide on emergency withdrawals through on-chain voting. No admin keys. No backdoors. Fully transparent.

**Smart Contract**: [`0x22c39856d31299cd175a30dceaef23007b9e62c2`](https://celoscan.io/address/0x22c39856d31299cd175a30dceaef23007b9e62c2) on Celo Mainnet

## Features

- **Group Savings** — Create or join savings groups with custom contribution amounts and member limits
- **Democratic Voting** — Members vote on emergency withdrawal requests with configurable approval thresholds
- **Real-time Dashboard** — View all your groups, balances, contributions, and vote on pending requests
- **Multi-wallet Support** — Browser wallets (MetaMask, Rabby), WalletConnect, and MiniPay
- **Toast Notifications** — Instant feedback on transactions with Celoscan explorer links
- **Accessible UI** — ARIA roles, keyboard navigation, focus management, and screen reader support
- **Responsive Design** — Mobile-first layout with dark/light mode based on system preference

## Tech Stack

| Layer      | Technology                                    |
| ---------- | --------------------------------------------- |
| Framework  | React 19 + TypeScript 6                       |
| Build      | Vite 8                                        |
| Blockchain | Ethers.js v6                                  |
| Network    | Celo Mainnet (chainId 42220)                  |
| Wallet     | WalletConnect v2 + Browser Injected + MiniPay |
| Styling    | CSS Variables + Glassmorphism                 |

## Project Structure

```text
src/
├── config/          # Network config, contract ABI/address
├── contexts/        # WalletContext, ToastContext
├── hooks/           # useCareSplit, useBodyScrollLock, useAnimatedCounter, ...
├── types/           # Shared TypeScript interfaces
├── utils/           # format, validation, clipboard helpers
└── components/
    ├── common/      # GroupCard
    ├── layout/      # Header, Footer
    ├── modals/      # CreateGroup, JoinGroup, Contribute, Withdrawal, Vote, Details, Share
    ├── sections/    # Hero, Stats, Features, TrustSection, HowItWorks, FAQ, CTA, UserGroups
    └── ui/          # Modal, Badge, ProgressBar, Skeleton, EmptyState, Toast, ScrollToTop, NetworkBanner
```

## Quick Start

```bash
# Install dependencies (requires pnpm)
pnpm install

# Start dev server
pnpm dev

# Type check
pnpm tsc --noEmit

# Build for production
pnpm build
```

## Wallet Setup

Connect any of:

- **Browser wallet** — MetaMask, Rabby, or any EIP-1193 provider
- **WalletConnect** — scan QR with any mobile wallet
- **MiniPay** — auto-detected when running inside the MiniPay browser

The app will prompt to switch to Celo Mainnet if you're on a different chain.

## Contract Interactions

| Action             | Function                                                       |
| ------------------ | -------------------------------------------------------------- |
| Create group       | `createGroup(contributionAmount, maxMembers, votingThreshold)` |
| Join group         | `joinGroup(groupId)`                                           |
| Contribute         | `contribute(groupId)` + sends CELO                             |
| Request withdrawal | `requestWithdrawal(groupId, amount, reason)`                   |
| Vote on request    | `voteOnWithdrawal(requestId, approve)`                         |
| Execute withdrawal | `executeWithdrawal(requestId)`                                 |

## Deployment

```bash
pnpm build
# Output: dist/
```

Deploy `dist/` to:

- **Vercel / Netlify** — connect your repo, auto-deploy on push
- **IPFS / Fleek** — for decentralized hosting

## License

MIT
