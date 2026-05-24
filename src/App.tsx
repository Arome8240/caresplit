import './App.css';
import { ToastProvider } from './contexts/ToastContext';
import { ToastContainer } from './components/ui/ToastContainer';
import { ScrollToTop } from './components/ui/ScrollToTop';
import { NetworkBanner } from './components/ui/NetworkBanner';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { StatsSection } from './components/sections/StatsSection';
import { UserGroupsSection } from './components/sections/UserGroupsSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { TrustSection } from './components/sections/TrustSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { FaqSection } from './components/sections/FaqSection';
import { CtaSection } from './components/sections/CtaSection';

function App() {
  return (
    <ToastProvider>
      <div className="app">
        <NetworkBanner />
        <Header />
        <main>
          <HeroSection />
          <StatsSection />
          <UserGroupsSection />
          <FeaturesSection />
          <TrustSection />
          <HowItWorksSection />
          <FaqSection />
          <CtaSection />
        </main>
        <Footer />
        <ScrollToTop />
        <ToastContainer />
      </div>
    </ToastProvider>
  );
}

export default App;
