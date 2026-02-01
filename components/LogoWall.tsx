
import React from 'react';

const LogoWall: React.FC = () => {
  const partners = [
    'Vercel', 'Linear', 'Replicate', 'Midjourney', 'Loom', 'OpenAI', 'Retool'
  ];

  return (
    <section className="py-20 border-y border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <p className="text-center text-sm font-bold text-gray-500 uppercase tracking-[0.2em] mb-12">
          Trusted by the World's most innovative brands
        </p>
        
        <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
          {partners.map((partner) => (
            <div key={partner} className="text-2xl font-bold tracking-tighter text-gray-400 hover:text-white transition-colors cursor-default">
              {partner}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogoWall;
