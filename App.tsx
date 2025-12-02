import React from 'react';
import { HeroSection } from './components/HeroSection';
import { PhysicsSection } from './components/PhysicsSection';
import { JurySection } from './components/JurySection';
import { RulesSection } from './components/RulesSection';
import { OutroSection } from './components/OutroSection';

const App: React.FC = () => {
  return (
    <main className="w-full bg-slate-900 text-white scroll-smooth">
      <HeroSection />
      <PhysicsSection />
      <JurySection />
      <RulesSection />
      <OutroSection />
    </main>
  );
};

export default App;