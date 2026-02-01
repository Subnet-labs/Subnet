
import React from 'react';

const services = [
  {
    title: 'Brand Identity',
    desc: 'Crafting the soul of your business with luminous, memorable visual systems.',
    icon: (
      <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    gradient: 'from-purple-500/20 to-blue-500/20'
  },
  {
    title: 'Conversion UX',
    desc: 'Scientific design patterns that lead viewers directly to the checkout button.',
    icon: (
      <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    gradient: 'from-blue-500/20 to-emerald-500/20'
  },
  {
    title: 'Interaction Design',
    desc: 'Smooth, buttery animations that keep users engaged and delighted.',
    icon: (
      <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 10l-2 1m0 0l-2-1m2 1V7m0 0l2-1m-2 1l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
      </svg>
    ),
    gradient: 'from-emerald-500/20 to-yellow-500/20'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-end justify-between mb-20 gap-8">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Built for <span className="text-purple-500">Growth</span>.</h2>
            <p className="text-gray-400 text-lg">
              We don't just "design." We engineer psychological triggers into every pixel, ensuring your audience takes the action you want.
            </p>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-1 bg-purple-500 rounded-full" />
            <div className="w-4 h-1 bg-white/10 rounded-full" />
            <div className="w-4 h-1 bg-white/10 rounded-full" />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, idx) => (
            <div key={idx} className="group relative glass-card p-10 rounded-[3rem] overflow-hidden hover:border-white/20 transition-all hover:-translate-y-2">
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${s.gradient} blur-3xl opacity-50 group-hover:opacity-100 transition-opacity`} />
              
              <div className="relative z-10">
                <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-xl">
                  {s.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-gray-400 leading-relaxed mb-8">{s.desc}</p>
                <button className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-purple-400 transition-colors">
                  Learn more
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
