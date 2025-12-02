import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { TEXT_CONTENT, ASSETS } from '../constants';
import { playSoundEffect } from '../services/audioService';

export const OutroSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (isInView) {
      playSoundEffect('piano');
    }
  }, [isInView]);

  return (
    <section ref={ref} className="relative min-h-screen w-full bg-black flex items-center justify-center py-20 px-4">
      
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,_var(--tw-gradient-stops))] from-amber-900/20 to-black pointer-events-none"></div>

      <div className="container mx-auto max-w-2xl text-center relative z-10">
        
        {/* Title */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1 }}
          className="mb-12"
        >
          <div className="text-xs tracking-[0.5em] text-amber-500 uppercase mb-2">Closing Argument</div>
          <h2 className="text-3xl font-bold text-white serif">{TEXT_CONTENT.outro.title}</h2>
        </motion.div>

        {/* Real Photo */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "grayscale(100%)" }}
          animate={isInView ? { opacity: 1, scale: 1, filter: "grayscale(0%)" } : {}}
          transition={{ duration: 1.5, delay: 0.5 }}
          className="w-48 h-48 md:w-64 md:h-64 mx-auto mb-10 rounded-full overflow-hidden border-4 border-white/10 shadow-2xl bg-slate-800 relative"
        >
          {imgError ? (
            <div className="w-full h-full flex flex-col items-center justify-center text-red-400 p-4 bg-slate-900">
               <span className="text-2xl mb-2">⚠️</span>
               <span className="text-xs font-mono break-all">图片未找到: {ASSETS.outroImage}</span>
               <span className="text-[10px] mt-2 text-slate-500">请检查 GitHub public 文件夹及文件名大小写</span>
            </div>
          ) : (
            <img 
              src={ASSETS.outroImage} 
              alt="Chen Bin Real" 
              className="w-full h-full object-cover" 
              onError={() => setImgError(true)}
            />
          )}
        </motion.div>

        {/* Text */}
        <div className="space-y-4 mb-12">
          {TEXT_CONTENT.outro.paragraphs.map((line, idx) => (
            <motion.p
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 1 + idx * 0.1, duration: 0.5 }}
              className={`text-slate-300 ${idx === 0 ? "font-bold text-white mb-4" : "font-light"}`}
            >
              {line}
            </motion.p>
          ))}
        </div>

        {/* Signature */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 1 }}
          className="relative inline-block"
        >
          <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-yellow-500 transform -rotate-2" style={{ fontFamily: 'cursive' }}>
            {TEXT_CONTENT.outro.signature}
          </h3>
          <p className="text-sm text-slate-500 mt-4 tracking-widest uppercase">{TEXT_CONTENT.outro.from}</p>
        </motion.div>

      </div>
    </section>
  );
};
