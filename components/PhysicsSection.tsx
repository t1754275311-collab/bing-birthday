import React, { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { TEXT_CONTENT, DROP_ITEMS, ASSETS } from '../constants';
import { DropItemType } from '../types';
import { playSoundEffect } from '../services/audioService';

// Helper to create texture from Emoji
const createEmojiTexture = (emoji: string, radius: number): string => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const size = radius * 2;
  canvas.width = size;
  canvas.height = size;
  
  if (ctx) {
    ctx.font = `${radius * 1.5}px serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'white';
    ctx.fillText(emoji, radius, radius + (radius * 0.15)); // slight vertical adjustment
  }
  return canvas.toDataURL();
};

export const PhysicsSection: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  const runnerRef = useRef<Matter.Runner | null>(null);
  const [lastMessage, setLastMessage] = useState<string>("");

  // Helper to spawn a body
  const spawnBody = (x: number, y: number, emoji: string, engine: Matter.Engine) => {
    const radius = 25 + Math.random() * 10;
    const texture = createEmojiTexture(emoji, radius);

    const body = Matter.Bodies.circle(x, y, radius, {
      restitution: 0.6, // Bounciness
      friction: 0.5,
      render: {
        sprite: {
          texture: texture,
          xScale: 1,
          yScale: 1
        }
      }
    });
    
    // Add random initial rotation and velocity
    Matter.Body.setAngularVelocity(body, (Math.random() - 0.5) * 0.2);
    Matter.Composite.add(engine.world, body);
  };

  useEffect(() => {
    if (!sceneRef.current) return;

    // Dimensions
    const width = sceneRef.current.clientWidth;
    const height = sceneRef.current.clientHeight;

    // Setup Matter JS
    const Engine = Matter.Engine,
          Render = Matter.Render,
          Runner = Matter.Runner,
          Bodies = Matter.Bodies,
          Composite = Matter.Composite,
          Mouse = Matter.Mouse,
          MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    engineRef.current = engine;

    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width,
        height,
        background: 'transparent',
        wireframes: false,
        pixelRatio: window.devicePixelRatio
      }
    });
    renderRef.current = render;

    // Boundaries (Glass Container)
    const wallOptions = { isStatic: true, render: { visible: false } };
    const ground = Bodies.rectangle(width / 2, height + 60, width, 120, wallOptions);
    const leftWall = Bodies.rectangle(-30, height / 2, 60, height * 2, wallOptions);
    const rightWall = Bodies.rectangle(width + 30, height / 2, 60, height * 2, wallOptions);

    Composite.add(engine.world, [ground, leftWall, rightWall]);

    // Initial Spawn of Random Objects (Pre-filled container)
    // Updated to match new themes: Gold Medals, Hearts, Hair, Milk Tea
    const initialItems = [
      ...Array(5).fill("⚫"), // Hair
      ...Array(3).fill("🥇"), // Gold Medals (Priority)
      ...Array(3).fill("❤️"), // Hearts (Love/Dev Favorite)
      ...Array(3).fill("🥤"), // Tea
    ];

    initialItems.forEach((emoji, index) => {
      // Spawn them scattered across the width and at different heights
      const startX = Math.random() * (width - 100) + 50;
      const startY = height - 100 - (Math.random() * 400); 
      spawnBody(startX, startY, emoji, engine);
    });

    // Mouse Interaction
    const mouse = Mouse.create(render.canvas);
    // Fix scrolling issue on mobile by allowing touch actions on the canvas
    // but disabling matter.js mouse capturing scroll
    if (render.canvas) {
        render.canvas.style.touchAction = 'none'; 
    }
    
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });
    Composite.add(engine.world, mouseConstraint);
    render.mouse = mouse;

    // Run
    Render.run(render);
    const runner = Runner.create();
    runnerRef.current = runner;
    Runner.run(runner, engine);

    // Resize Handler
    const handleResize = () => {
      if (!sceneRef.current || !renderRef.current) return;
      const newWidth = sceneRef.current.clientWidth;
      const newHeight = sceneRef.current.clientHeight;
      
      renderRef.current.canvas.width = newWidth;
      renderRef.current.canvas.height = newHeight;
      
      // Reposition ground
      Matter.Body.setPosition(ground, { x: newWidth / 2, y: newHeight + 60 });
      Matter.Body.setPosition(rightWall, { x: newWidth + 30, y: newHeight / 2 });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      Render.stop(render);
      Runner.stop(runner);
      if (render.canvas) render.canvas.remove();
      engineRef.current = null;
    };
  }, []);

  const handleDrop = (type: DropItemType) => {
    if (!engineRef.current || !sceneRef.current) return;
    
    const config = DROP_ITEMS[type];
    const width = sceneRef.current.clientWidth;
    
    // Play sound
    playSoundEffect(config.soundType);

    // Show Message
    setLastMessage(config.message);
    // Clear message after a while
    const timer = setTimeout(() => setLastMessage(""), 2500);

    // Spawn Drops based on config
    config.drops.forEach((drop) => {
        for (let i = 0; i < drop.count; i++) {
            // Random x position near center but spread out
            const x = (width / 2) + (Math.random() * 200 - 100);
            const y = -50 - (Math.random() * 100); // Stagger height slightly
            spawnBody(x, y, drop.emoji, engineRef.current!);
        }
    });
  };

  return (
    <section className="relative min-h-screen w-full bg-slate-900 flex flex-col overflow-hidden">
      
      {/* Background Image Container */}
      <div className="absolute inset-0 z-0">
         <img src={ASSETS.glassContainerBg} className="w-full h-full object-cover opacity-40" alt="background" />
         <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
      </div>

      {/* Physics Canvas Area */}
      <div className="absolute inset-0 z-10 touch-none" ref={sceneRef}></div>

      {/* UI Overlay Layer */}
      <div className="relative z-20 flex flex-col h-full pointer-events-none">
        
        {/* Top Header Area */}
        <div className="pt-8 px-4 text-center">
          <div className="inline-block bg-blue-600/30 backdrop-blur border border-blue-400/50 text-blue-100 px-4 py-1 rounded-full text-xs font-bold tracking-widest mb-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]">
            {TEXT_CONTENT.physics.caseNumber}
          </div>
          <p className="text-white/90 text-sm md:text-lg max-w-xl mx-auto drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)] font-medium">
            {TEXT_CONTENT.physics.instruction}
          </p>
        </div>

        {/* Floating Barrage Message Area */}
        <div className="flex-1 flex justify-center items-center pointer-events-none">
          {lastMessage && (
            <div key={Date.now()} className="animate-bounce bg-white/95 backdrop-blur text-slate-900 px-6 py-4 rounded-xl font-black shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-yellow-400 z-50 text-center text-xl md:text-3xl transform -rotate-2">
              {lastMessage}
            </div>
          )}
        </div>

        {/* Arcade Button Control Panel */}
        <div className="mt-auto pointer-events-auto w-full pb-8 md:pb-12 px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {Object.values(DROP_ITEMS).map((item) => (
              <div key={item.type} className="flex flex-col items-center">
                <button
                    onClick={() => handleDrop(item.type)}
                    className={`
                      group relative w-24 h-24 md:w-32 md:h-32 rounded-full 
                      ${item.color} 
                      shadow-[0_8px_0_rgba(0,0,0,0.3)]
                      ${item.shadowColor.replace('shadow-', 'shadow-[0_8px_0_')} 
                      active:shadow-none active:translate-y-2 
                      transition-all duration-100 ease-in-out
                      flex flex-col items-center justify-center
                      border-4 border-white/20
                    `}
                    style={{
                        boxShadow: `0 10px 0 ${getDarkerColor(item.color)}` // Fallback style if tailwind shadow interpolation fails, but class logic above tries to handle it
                    }}
                >
                  {/* Glossy Reflection */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-16 h-8 bg-white/20 rounded-full blur-[2px]"></div>
                  
                  {/* Icon */}
                  <div className="text-3xl md:text-4xl drop-shadow-md z-10 group-hover:scale-110 transition-transform">
                     {/* Show main icon of the group */}
                     {item.drops[0].emoji}
                  </div>
                </button>
                
                {/* Label Plate */}
                <div className="mt-3 bg-slate-800/90 backdrop-blur border border-slate-600 px-3 py-1 rounded text-xs md:text-sm font-bold text-white tracking-wider uppercase shadow-lg">
                    {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// Helper to estimate a darker shadow color based on the bg class
// This is a quick hack for the arcade button 3D depth effect
function getDarkerColor(bgClass: string) {
    if (bgClass.includes('amber')) return '#b45309';
    if (bgClass.includes('red')) return '#991b1b';
    if (bgClass.includes('slate')) return '#020617';
    if (bgClass.includes('pink')) return '#be185d';
    return '#000';
}