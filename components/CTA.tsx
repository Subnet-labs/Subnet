
import React from 'react';

const CTA: React.FC = () => {
  return (
    <section className="py-40 px-6 relative overflow-hidden">
      {/* Mesh background specific to CTA */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-cyan-900/20" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-emerald-500/10 blur-[150px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <h2 className="text-5xl md:text-8xl font-black tracking-tighter mb-10 leading-none">
          Ready to <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400">Scale Up?</span>
        </h2>

        <p className="text-xl text-gray-400 mb-12 max-w-xl mx-auto font-medium">
          Let's transform your high-traffic site into a high-revenue machine. Booking slots are limited for Q3.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
          <button className="w-full sm:w-auto px-12 py-6 rounded-full bg-white text-black font-black text-xl hover:bg-emerald-50 shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-white/30 transition-all hover:scale-105 active:scale-95 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
            Claim Your Spot
          </button>

          <button className="w-full sm:w-auto px-12 py-6 rounded-full glass-card text-white font-bold text-xl hover:bg-white/10 transition-all border-white/10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/50">
            View Pricing
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://picsum.photos/seed/${i + 100}/100`} className="w-12 h-12 rounded-full border-2 border-black" alt={`Team member ${i}`} />
            ))}
          </div>
          <p className="text-gray-500 text-sm font-bold uppercase tracking-widest">Joined by 200+ fast-growing companies</p>
        </div>
      </div>
    </section>
  );
};

export default CTA;
