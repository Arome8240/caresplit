# CareSplit Frontend

> Modern, responsive web interface for the CareSplit community savings protocol

## 🎨 Features

- **Beautiful Home Page** - Clean, modern design with smooth animations
- **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **Dark Mode Support** - Automatic theme switching based on system preferences
- **Fast & Lightweight** - Built with Vite for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
caresplit/
├── src/
│   ├── App.tsx          # Main application component
│   ├── App.css          # Application styles
│   ├── index.css        # Global styles and theme
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── index.html           # HTML template
```

## 🎯 Current Features

### Home Page
- ✅ Hero section with call-to-action
- ✅ Features showcase (6 key features)
- ✅ How it works (4-step process)
- ✅ Statistics display
- ✅ Call-to-action section
- ✅ Footer with links

### Design System
- ✅ Consistent color palette
- ✅ Typography system
- ✅ Button components
- ✅ Card components
- ✅ Responsive grid layouts
- ✅ Smooth transitions and hover effects

## 🎨 Design Tokens

### Colors
- **Primary (Accent)**: Purple gradient (#aa3bff → #c084fc)
- **Text**: Adaptive based on theme
- **Background**: White (light) / Dark gray (dark)
- **Borders**: Subtle gray tones

### Typography
- **Headings**: System UI fonts
- **Body**: 18px base size
- **Monospace**: For code elements

## 🔜 Next Steps

### Phase 1: Wallet Integration
- [ ] Add RainbowKit for wallet connection
- [ ] Configure Celo network
- [ ] Display connected wallet address
- [ ] Show wallet balance

### Phase 2: Smart Contract Integration
- [ ] Connect to deployed CareSplit contract
- [ ] Read contract state (groups, members, balances)
- [ ] Write contract functions (create group, join, contribute)
- [ ] Display real-time data

### Phase 3: Group Management
- [ ] Create group form
- [ ] Join group interface
- [ ] Group dashboard
- [ ] Member list display

### Phase 4: Contributions
- [ ] Contribution form
- [ ] Transaction history
- [ ] Balance tracking
- [ ] Contribution reminders

### Phase 5: Withdrawal System
- [ ] Request withdrawal form
- [ ] Voting interface
- [ ] Request status tracking
- [ ] Approval notifications

### Phase 6: Enhanced Features
- [ ] User profiles
- [ ] Notifications system
- [ ] Search and filters
- [ ] Analytics dashboard
- [ ] Mobile app (React Native)

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: CSS with CSS Variables
- **Blockchain**: (To be added)
  - wagmi for Ethereum interactions
  - RainbowKit for wallet connection
  - viem for contract interactions

## 📱 Responsive Breakpoints

- **Desktop**: 1024px and above
- **Tablet**: 768px - 1023px
- **Mobile**: Below 768px

## 🎨 Theme Support

The app automatically adapts to system theme preferences:
- Light mode (default)
- Dark mode (automatic)

## 🚀 Deployment

### Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy Options

- **Vercel**: Connect your GitHub repo
- **Netlify**: Drag and drop `dist/` folder
- **IPFS**: For decentralized hosting
- **Fleek**: Automated IPFS deployment

## 📝 Development Guidelines

### Code Style
- Use TypeScript for type safety
- Follow React best practices
- Keep components small and focused
- Use semantic HTML
- Maintain accessibility standards

### CSS Guidelines
- Use CSS variables for theming
- Mobile-first responsive design
- Smooth transitions (0.2s - 0.3s)
- Consistent spacing (8px grid)

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test responsiveness
4. Ensure dark mode works
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details

---

**Status**: 🎨 Home Page Complete | 🔄 Wallet Integration Next
**Built with**: React + Vite + TypeScript
