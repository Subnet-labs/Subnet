
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="pt-32 pb-12 px-6 border-t border-white/5 relative bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500" />
              <span className="text-2xl font-bold tracking-tight text-white">
                Aura<span className="text-purple-500">.</span>
              </span>
            </div>
            <p className="text-gray-500 max-w-sm text-lg leading-relaxed">
              We create world-class digital interfaces for companies that value aesthetics and results equally.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Studio</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Portfolio</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Process</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Career</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">News</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-white mb-6">Social</h4>
            <ul className="space-y-4 text-gray-500 font-medium">
              <li><a href="#" className="hover:text-purple-400 transition-colors">Twitter (X)</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">LinkedIn</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Dribbble</a></li>
              <li><a href="#" className="hover:text-purple-400 transition-colors">Instagram</a></li>
            </ul>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-center justify-between pt-12 border-t border-white/5 gap-6">
          <p className="text-gray-600 text-sm">© 2024 Aura Digital Studio. All rights reserved.</p>
          <div className="flex gap-8 text-gray-600 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
      
      {/* Back to top glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[80%] h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
    </footer>
  );
};

export default Footer;
