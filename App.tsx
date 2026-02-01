
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoWall from './components/LogoWall';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import CTA from './components/CTA';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen selection:bg-purple-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-900/20 rounded-full aurora-blur" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/20 rounded-full aurora-blur" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[40%] bg-emerald-900/10 rounded-full aurora-blur" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="relative z-10">
        <Navbar scrollY={scrollY} />
        <main>
          <Hero />
          <LogoWall />
          <Services />
          <Portfolio />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
