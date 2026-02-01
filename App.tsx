import React, { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LogoWall from './components/LogoWall';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import CTA from './components/CTA';
import CardScanner from './components/CardScanner';
import GradientMenu from './components/GradientMenu';
import Footer from './components/Footer';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';

type AppView = 'landing' | 'login' | 'dashboard';

const App: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [view, setView] = useState<AppView>('landing');
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        setView('dashboard');
      }
      setLoading(false);
    };
    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        setView('dashboard');
      } else if (event === 'SIGNED_OUT') {
        setView('landing');
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  // Show Login Form
  if (view === 'login') {
    return (
      <div className="bg-gray-950 min-h-screen">
        <LoginForm onAuthSuccess={() => setView('dashboard')} />
      </div>
    );
  }

  // Show Dashboard
  if (view === 'dashboard') {
    return (
      <div className="bg-gray-950 min-h-screen">
        <Dashboard onLogout={() => setView('landing')} />
      </div>
    );
  }

  // Show Landing Page
  return (
    <div className="relative min-h-screen selection:bg-emerald-500/30">
      {/* Dynamic Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-emerald-900/20 rounded-full aurora-blur" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-cyan-900/20 rounded-full aurora-blur" style={{ animationDelay: '-5s' }} />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[40%] bg-teal-900/10 rounded-full aurora-blur" style={{ animationDelay: '-10s' }} />
      </div>

      <div className="relative z-10">
        <Navbar scrollY={scrollY} onLoginClick={() => setView('login')} />
        <main>
          <Hero />
          <LogoWall />
          <Services />
          <Portfolio />
          <CTA />
          <CardScanner />
          <GradientMenu />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default App;
