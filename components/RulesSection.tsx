import React from 'react';
import { motion } from 'framer-motion';
import { TEXT_CONTENT, ASSETS } from '../constants';

const Card: React.FC<{ title: string; content: string; delay: number }> = ({ title, content, delay }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50, rotateX: -15 }}
    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ delay, duration: 0.6, type: "spring" }}
    className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl shadow-xl hover:shadow-blue-500/20 hover:border-blue-400/50 transition-all group"
  >
    <div className="flex items-center gap-3 mb-3">
      <div className="w-2 h-8 bg-blue-500 rounded-full group-hover:bg-amber-400 transition-colors"></div>
      <h3 className="text-xl font-bold text-white serif tracking-wide">{title}</h3>
    </div>
    <p className="text-slate-300 leading-relaxed text-sm md:text-base">
      {content}
    </p>
  </motion.div>
);

export const RulesSection: React.FC = () => {
  return (
    <section className="relative min-h-screen w-full bg-slate-900 py-16 px-4 flex flex-col items-center justify-center">
      {/* Background Shredder */}
      <div className="absolute inset-0 z-0">
        <img src={ASSETS.shredderBg} alt="Shredder Background" className="w-full h-full object-cover opacity-20 mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/50 to-slate-900"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-4xl">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white to-slate-500 serif mb-4">
            {TEXT_CONTENT.rules.title}
          </h2>
          <div className="w-24 h-1 bg-amber-400 mx-auto rounded"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TEXT_CONTENT.rules.cards.map((card, idx) => (
            <Card key={idx} title={card.title} content={card.content} delay={idx * 0.2} />
          ))}
        </div>
      </div>
    </section>
  );
};
