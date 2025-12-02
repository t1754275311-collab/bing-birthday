import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TEXT_CONTENT } from '../constants';
import { playSoundEffect } from '../services/audioService';
import { db } from '../services/firebase';
import { ref, push, onValue, off } from 'firebase/database';

interface Testimony {
  id: string;
  name: string;
  content: string;
  timestamp: string;
  createdAt?: number;
}

export const JurySection: React.FC = () => {
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [newName, setNewName] = useState('');
  const [newContent, setNewContent] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Subscribe to Firebase Data
  useEffect(() => {
    const testimoniesRef = ref(db, 'testimonies');
    
    // Prepare static/mock data (Always include these)
    const staticTestimonies: Testimony[] = TEXT_CONTENT.jury.initialTestimonies.map((t, i) => ({
      id: `static-${i}`,
      name: t.name,
      content: t.content,
      timestamp: '历史记录', // Mark as history
      createdAt: 1000000000000 + i // Old timestamp to keep them at the bottom
    }));
    
    const unsubscribe = onValue(testimoniesRef, (snapshot) => {
      const data = snapshot.val();
      let combinedTestimonies = [...staticTestimonies];

      if (data) {
        // Convert object to array
        const cloudTestimonies: Testimony[] = Object.entries(data).map(([key, val]: [string, any]) => ({
          id: key,
          name: val.name,
          content: val.content,
          timestamp: val.timestamp,
          createdAt: val.createdAt || Date.now()
        }));
        
        // Merge cloud data with static data
        combinedTestimonies = [...cloudTestimonies, ...staticTestimonies];
      }
      
      // Sort by newest first (Cloud data will generally be newer than static data)
      combinedTestimonies.sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      
      setTestimonies(combinedTestimonies);
      setIsLoading(false);
    });

    return () => {
      // Cleanup listener
      off(testimoniesRef);
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;

    const nameToUse = newName.trim() || `神秘陪审员${Math.floor(Math.random() * 1000)}`;
    const timestamp = new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' });
    
    // Prepare data
    const newTestimony = {
      name: nameToUse,
      content: newContent,
      timestamp: timestamp,
      createdAt: Date.now()
    };

    // Push to Firebase
    try {
      const testimoniesRef = ref(db, 'testimonies');
      push(testimoniesRef, newTestimony);
      
      playSoundEffect('coin');
      setNewContent('');
    } catch (error) {
      console.error("Firebase push failed. Did you configure services/firebase.ts?", error);
      alert("提交失败：请检查数据库配置 (Check services/firebase.ts)");
    }
  };

  return (
    <section className="relative min-h-[80vh] w-full bg-slate-900 py-16 px-4 flex flex-col items-center border-t border-slate-800">
      
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none"></div>

      <div className="container mx-auto max-w-4xl relative z-10">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block border border-blue-500/30 bg-blue-900/10 px-4 py-1 rounded text-blue-400 text-xs tracking-widest mb-4">
             COLLEGIAL PANEL RECORD
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6 serif tracking-wider">
            {TEXT_CONTENT.jury.title}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            {TEXT_CONTENT.jury.subtitle}
          </p>
        </div>

        {/* Input Console */}
        <div className="mb-16 p-1 rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500">
          <div className="bg-slate-900 rounded-lg p-6 md:p-8">
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder={TEXT_CONTENT.jury.placeholderName}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors md:w-1/3 font-mono"
                />
                <input
                  type="text"
                  placeholder={TEXT_CONTENT.jury.placeholderContent}
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="bg-slate-800 border border-slate-700 rounded p-3 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors flex-1"
                />
              </div>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-6 rounded shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <span>{TEXT_CONTENT.jury.submitBtn}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
              </button>
            </form>
            <div className="mt-2 text-center">
              <span className="text-[10px] text-slate-500">
                {isLoading ? "正在连接审判庭数据库..." : "已连接至实时审判网络"}
              </span>
            </div>
          </div>
        </div>

        {/* Evidence Wall */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode='popLayout'>
            {testimonies.map((item) => (
              <motion.div
                layout
                key={item.id}
                initial={{ opacity: 0, scale: 0.8, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="relative bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 p-6 rounded-lg shadow-lg group hover:bg-slate-800/60 transition-colors"
              >
                {/* Holographic Border Effect */}
                <div className="absolute inset-0 rounded-lg shadow-[inset_0_0_20px_rgba(59,130,246,0.05)] pointer-events-none"></div>
                
                {/* Pin/Icon */}
                <div className="absolute -top-3 -right-3 text-2xl filter drop-shadow-md opacity-80">
                  📌
                </div>

                <div className="flex justify-between items-start mb-4 border-b border-slate-700/50 pb-2">
                  <span className="font-mono text-xs text-blue-400 font-bold uppercase tracking-wider">
                    EVIDENCE #{item.id.toString().slice(-4)}
                  </span>
                  <span className="font-mono text-[10px] text-slate-500">
                    {item.timestamp}
                  </span>
                </div>
                
                <p className="text-slate-200 leading-relaxed mb-4 text-sm font-medium">
                  "{item.content}"
                </p>

                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-blue-500 to-cyan-300 flex items-center justify-center text-[10px] font-bold text-slate-900">
                    {item.name.charAt(0)}
                  </div>
                  <span className="text-xs text-slate-400 font-mono">
                    {item.name}
                  </span>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-2 right-2 w-2 h-2 bg-blue-500/50 rounded-full animate-pulse"></div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};