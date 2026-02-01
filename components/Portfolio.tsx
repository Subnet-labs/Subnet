
import React from 'react';

const projects = [
  {
    title: 'Etheris',
    category: 'DeFi Branding',
    img: 'https://picsum.photos/seed/eth/800/1000',
    color: 'bg-purple-500'
  },
  {
    title: 'Nova AI',
    category: 'SaaS Platform',
    img: 'https://picsum.photos/seed/nova/800/600',
    color: 'bg-blue-500'
  },
  {
    title: 'Kinetix',
    category: 'Consumer App',
    img: 'https://picsum.photos/seed/kin/800/1000',
    color: 'bg-emerald-500'
  },
  {
    title: 'Velociti',
    category: 'E-commerce',
    img: 'https://picsum.photos/seed/vel/800/600',
    color: 'bg-pink-500'
  }
];

const Portfolio: React.FC = () => {
  return (
    <section id="portfolio" className="py-32 bg-black/40">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">Selected Works</h2>
          <div className="flex justify-center gap-2">
            {['All', 'SaaS', 'Fintech', 'App'].map((filter) => (
              <button key={filter} className={`px-5 py-2 rounded-full text-xs font-bold uppercase tracking-widest border transition-all ${
                filter === 'All' ? 'bg-white text-black border-white' : 'border-white/10 text-gray-400 hover:border-white/30'
              }`}>
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="columns-1 md:columns-2 gap-8 space-y-8">
          {projects.map((p, idx) => (
            <div key={idx} className="group relative block rounded-[2.5rem] overflow-hidden bg-gray-900 border border-white/5 aspect-auto">
              <img 
                src={p.img} 
                alt={p.title} 
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105" 
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-10">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  <div className={`w-8 h-1 ${p.color} rounded-full mb-4`} />
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-[0.2em]">{p.category}</span>
                  <h3 className="text-3xl font-bold text-white mt-1 mb-6">{p.title}</h3>
                  <button className="px-6 py-2 rounded-full border border-white/20 text-white text-sm font-bold backdrop-blur-md hover:bg-white hover:text-black transition-all">
                    View Case Study
                  </button>
                </div>
              </div>

              {/* Luminous Glow behind text */}
              <div className={`absolute -bottom-10 -right-10 w-40 h-40 ${p.color} blur-[100px] opacity-0 group-hover:opacity-30 transition-opacity`} />
            </div>
          ))}
        </div>

        <div className="mt-20 text-center">
          <button className="px-12 py-5 rounded-full glass-card border-white/10 text-white font-bold text-lg hover:border-purple-500/50 transition-all group">
            See All Projects
            <span className="inline-block ml-2 group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
