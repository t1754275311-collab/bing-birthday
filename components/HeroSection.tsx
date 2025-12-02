import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { TEXT_CONTENT, ASSETS } from '../constants';
import { TypingText } from './TypingText';
import { playSoundEffect } from '../services/audioService';

export const HeroSection: React.FC = () => {
  
  useEffect(() => {
    // Play Gavel sound on mount after a slight delay
    setTimeout(() => playSoundEffect('gavel'), 800);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden bg-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-900/40 via-slate-900 to-black"></div>
        <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/circuit-board.png')]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center text-center">
        {/* Main Title */}
        <motion.h1 
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-4xl md:text-6xl font-black mb-2 text-white tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-200 drop-shadow-[0_0_15px_rgba(56,189,248,0.5)] serif"
        >
          {TEXT_CONTENT.hero.title}
        </motion.h1>

        {/* Subtitle - Conditionally Rendered if exists */}
        {TEXT_CONTENT.hero.subtitle && (
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg md:text-xl text-slate-400 italic mb-8 max-w-2xl font-light"
          >
            {TEXT_CONTENT.hero.subtitle}
          </motion.p>
        )}

        {/* Spacer if subtitle is gone to keep layout somewhat balanced */}
        {!TEXT_CONTENT.hero.subtitle && <div className="mb-8"></div>}

        {/* Image Placeholder with Cyber Frame */}
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="relative w-64 h-80 md:w-80 md:h-96 mb-8 rounded-lg overflow-hidden border-2 border-blue-500/50 shadow-[0_0_30px_rgba(59,130,246,0.3)]"
        >
          {/* Scanline Effect */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-transparent z-20 animate-scan"></div>
          
          {/* Main Image - Filters removed to show original artwork colors */}
          <img 
            src={ASSETS.heroImage} 
            alt="Cyber Judge" 
            className="w-full h-full object-cover filter contrast-110"
          />
          
          {/* UI Overlays */}
          <div className="absolute top-2 left-2 text-[10px] text-blue-400 font-mono">REC ●</div>
          <div className="absolute bottom-2 right-2 text-[10px] text-blue-400 font-mono">SYS.VER.3.0</div>
        </motion.div>

        {/* Info Terminal */}
        <div className="bg-slate-800/80 backdrop-blur-md border border-slate-600 rounded p-4 w-full max-w-md text-left font-mono text-sm md:text-base text-green-400 shadow-xl">
          <TypingText text={TEXT_CONTENT.hero.name} delay={1500} speed={40} className="mb-2" />
          <TypingText text={TEXT_CONTENT.hero.codename} delay={2500} speed={30} className="mb-2" />
          <TypingText text={TEXT_CONTENT.hero.status} delay={4500} speed={50} className="text-yellow-400" />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 10, 0] }}
        transition={{ delay: 6, duration: 2, repeat: Infinity }}
        className="absolute bottom-10 z-20 text-blue-300 flex flex-col items-center gap-2"
      >
        <span className="text-xs tracking-widest">呈上证物</span>
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  );
};