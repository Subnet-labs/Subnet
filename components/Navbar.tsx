
import React from 'react';

interface NavbarProps {
  scrollY: number;
}

const Navbar: React.FC<NavbarProps> = ({ scrollY }) => {
  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 flex justify-center ${
        scrollY > 50 ? 'pt-4' : 'pt-8'
      }`}
    >
      <div className={`flex items-center justify-between w-full max-w-6xl px-6 py-3 rounded-full transition-all duration-300 ${
        scrollY > 50 ? 'bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl scale-95' : 'bg-transparent'
      }`}>
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center animate-pulse">
            <div className="w-4 h-4 rounded-full bg-white/20 blur-sm" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-purple-400 transition-colors">
            Aura<span className="text-purple-500">.</span>
          </span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-400">
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#portfolio" className="hover:text-white transition-colors">Portfolio</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#about" className="hover:text-white transition-colors">Our Ethos</a>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-gray-400 hover:text-white transition-colors px-4 py-2">
            Sign In
          </button>
          <button className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold hover:bg-gray-200 transition-all shadow-lg hover:shadow-white/20">
            Book a Demo
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
