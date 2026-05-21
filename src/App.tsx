import './App.css';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/sections/HeroSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { CtaSection } from './components/sections/CtaSection';
import { UserGroupsSection } from './components/sections/UserGroupsSection';

function App() {
  return (
    <div className="app">
      <Header />
      <HeroSection />
      <UserGroupsSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CtaSection />
      <Footer />
    </div>
  );
}

export default App;
