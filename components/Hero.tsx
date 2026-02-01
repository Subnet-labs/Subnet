
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden flex flex-col items-center px-4">
      {/* Tech line decorations */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 800" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100 400C200 400 400 100 800 100C1200 100 1540 400 1540 400" stroke="url(#paint0_linear)" strokeWidth="0.5" />
          <path d="M-100 600C200 600 400 300 800 300C1200 300 1540 600 1540 600" stroke="url(#paint1_linear)" strokeWidth="0.5" />
          <defs>
            <linearGradient id="paint0_linear" x1="-100" y1="400" x2="1540" y2="400" gradientUnits="userSpaceOnUse">
              <stop stopColor="#8B5CF6" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="paint1_linear" x1="-100" y1="600" x2="1540" y2="600" gradientUnits="userSpaceOnUse">
              <stop stopColor="#10B981" />
              <stop offset="1" stopColor="#3B82F6" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]" />
          <span className="text-xs font-semibold text-emerald-400 uppercase tracking-widest">Converting Traffic since 2018</span>
        </div>

        <h1 className="text-5xl md:text-8xl font-extrabold tracking-tight mb-8 leading-[1.1]">
          Turn <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-500 to-teal-500">Viewers</span> into <br />
          <span className="relative inline-block">
            Loyal Buyers
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent blur-[2px]" />
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-12 leading-relaxed">
          We build gorgeous, high-performance digital experiences that don't just look pretty—they dominate your market and scale your revenue.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="group relative px-8 py-4 rounded-full bg-white text-black font-bold text-lg overflow-hidden transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-black cursor-pointer">
            <span className="relative z-10">Start Your Project</span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-cyan-400 opacity-0 group-hover:opacity-20 transition-opacity" />
          </button>

          <button className="flex items-center gap-3 px-8 py-4 rounded-full glass-card text-white font-semibold transition-all hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-black cursor-pointer">
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
              <svg className="w-3 h-3 text-emerald-400 fill-current" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
            </div>
            Watch Showreel
          </button>
        </div>
      </div>

      {/* Hero Stats/Floating Elements */}
      <div className="mt-20 w-full max-w-6xl grid grid-cols-2 md:grid-cols-4 gap-4 px-4">
        {[
          { label: 'Avg. Conversion Lift', value: '+42%' },
          { label: 'Projects Completed', value: '180+' },
          { label: 'Awards Won', value: '24' },
          { label: 'Team Experts', value: '12' },
        ].map((stat, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl text-center border-white/5 hover:border-white/20 transition-all hover:-translate-y-1 cursor-pointer">
            <div className="text-3xl font-bold mb-1 text-white">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-gray-500 font-bold">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;
