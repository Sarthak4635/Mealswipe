import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Flame, Sparkles, Moon, Globe, Award, RefreshCw } from 'lucide-react';
import { ProfileStats, Achievement } from '../types';
import { ScrollRevealText } from './ScrollRevealText';

interface ProfileTabProps {
  stats: ProfileStats;
  achievements: Achievement[];
  onRefineProfile: () => void;
}

export function ProfileTab({ stats, achievements, onRefineProfile }: ProfileTabProps) {
  const [animateRadar, setAnimateRadar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimateRadar(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Moon':
        return <Moon className="text-[#FF6B35]" size={28} />;
      case 'Flame':
        return <Flame className="text-[#FF6B35]" size={28} fill="currentColor" />;
      case 'Sparkles':
        return <Sparkles className="text-[#FF6B35]" size={28} />;
      case 'Globe':
        return <Globe className="text-[#FF6B35]" size={28} />;
      default:
        return <Award className="text-[#FF6B35]" size={28} />;
    }
  };

  const center = 100;
  const radius = 80;
  
  const getPoint = (percent: number, angleDegrees: number) => {
    const scale = (percent / 100) * radius;
    const angleRadians = (angleDegrees - 90) * (Math.PI / 180);
    const x = center + scale * Math.cos(angleRadians);
    const y = center + scale * Math.sin(angleRadians);
    return `${x},${y}`;
  };

  const points = animateRadar ? [
    getPoint(stats.spicyPercent, 0),
    getPoint(stats.savoryPercent, 90),
    getPoint(stats.sweetPercent, 180),
    getPoint(stats.umamiPercent, 270)
  ].join(' ') : [
    getPoint(0, 0),
    getPoint(0, 90),
    getPoint(0, 180),
    getPoint(0, 270)
  ].join(' ');

  return (
    <div id="profile-container" className="pt-24 pb-32 px-6 w-full max-w-4xl mx-auto space-y-12 animate-fade-in text-on-surface">
      
      {/* Culinary Signature Hero Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        {/* Header and Details */}
        <div className="space-y-4">
          <span className="text-[#FF6B35] text-xs font-bold uppercase tracking-[0.2em] block mb-1">
            Taste Identity
          </span>
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-none">
            <ScrollRevealText text="Your Culinary Signature." />
          </h1>
          <p className="text-gray-400 text-sm md:text-base leading-relaxed max-w-md">
            Based on {stats.swipesThisMonth} swipes this month, your profile leans heavily towards bold, umami-rich experiences.
          </p>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <div className="bg-[#151B2E] border border-white/5 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm font-semibold text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-[#FF6B35]" />
              <span>Spicy {stats.spicyPercent}%</span>
            </div>
            <div className="bg-[#151B2E] border border-white/5 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm font-semibold text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-blue-400" />
              <span>Savory {stats.savoryPercent}%</span>
            </div>
            <div className="bg-[#151B2E] border border-white/5 px-4 py-2 rounded-full flex items-center gap-2 shadow-sm font-semibold text-xs text-white">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <span>Umami {stats.umamiPercent}%</span>
            </div>
          </div>
        </div>

        {/* Custom Glowing SVG Radar Visual Widget */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="glass-card aspect-square rounded-[2rem] p-8 flex items-center justify-center relative overflow-hidden bg-[#151B2E]/60 border border-white/5 shadow-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#FF6B35]/5 to-transparent z-0" />
          
          <svg className="w-full h-full max-w-[320px] z-10" viewBox="0 0 200 200">
            {/* Guide Rings */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <circle cx="100" cy="100" r="20" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            
            {/* Axis Lines */}
            <line x1="100" y1="20" x2="100" y2="180" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1="20" y1="100" x2="180" y2="100" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

            {/* The Active Heat Data Poly Shape */}
            <polygon
              points={points}
              fill="rgba(255, 107, 53, 0.18)"
              className="transition-all duration-1000 ease-out"
              stroke="#FF6B35"
              strokeWidth="2"
            />

            {/* Vertice labels */}
            <text className="fill-gray-400 font-bold text-[9px] uppercase tracking-wider" textAnchor="middle" x="100" y="14">Spicy</text>
            <text className="fill-gray-400 font-bold text-[9px] uppercase tracking-wider" textAnchor="start" x="155" y="155">Savory</text>
            <text className="fill-gray-400 font-bold text-[9px] uppercase tracking-wider" textAnchor="end" x="45" y="155">Umami</text>
          </svg>
        </motion.div>
      </section>

      {/* Bento Grid Achievements */}
      <section className="space-y-4">
        <div>
          <span className="text-[#FF6B35] text-xs font-bold uppercase tracking-[0.2em] block mb-1">Achievements</span>
          <h2 className="text-2xl font-black text-white tracking-tight">
            <ScrollRevealText text="Your Taste Milestones" />
          </h2>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {achievements.map((ach, idx) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className="bg-[#151B2E]/60 border border-white/5 p-6 rounded-2xl flex flex-col items-center justify-center text-center space-y-3 group hover:border-[#FF6B35]/30 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-full bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] group-hover:scale-105 transition-transform">
                {renderIcon(ach.icon)}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-white transition-colors group-hover:text-[#FF6B35]">{ach.title}</h4>
                <p className="text-[10px] text-gray-500 font-medium">{ach.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Swipe Logic Insights summary */}
      <section className="bg-[#151B2E]/60 border border-white/10 rounded-[2.5rem] p-8 md:p-12 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF6B35]/10 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="space-y-5">
            <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-tight">
              <ScrollRevealText text="The Swipe Logic" />
            </h2>
            <p className="text-gray-400 text-xs md:text-sm leading-relaxed">
              Our AI analyzed your recent decisions. You aren't just eating; you're exploring high-contrast flavor profiles that shift from spicy lunch ventures to delicate evening pairings.
            </p>
            <button
              onClick={onRefineProfile}
              className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] hover:from-[#FF8C61] hover:to-[#FF6B35] text-white font-black text-xs uppercase tracking-widest px-8 py-4 rounded-full shadow-[0_4px_15px_rgba(255,107,53,0.15)] hover:shadow-[0_4px_25px_rgba(255,107,53,0.35)] hover:scale-105 active:scale-95 transition-all outline-none cursor-pointer border-0"
            >
              Refine My Profile
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 border-l-2 border-[#FF6B35]/35 bg-white/2 rounded-r-xl">
              <span className="text-2xl md:text-3xl font-black text-[#FF6B35]">{stats.kcalExplored}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Kcal Explored</p>
            </div>
            <div className="p-4 border-l-2 border-[#FF6B35]/35 bg-white/2 rounded-r-xl">
              <span className="text-2xl md:text-3xl font-black text-[#FF6B35]">{stats.swipeDistance}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Swipe Distance</p>
            </div>
            <div className="p-4 border-l-2 border-[#FF6B35]/35 bg-white/2 rounded-r-xl">
              <span className="text-2xl md:text-3xl font-black text-[#FF6B35]">{stats.spicyTolerance}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">Spicy Tolerance</p>
            </div>
            <div className="p-4 border-l-2 border-[#FF6B35]/35 bg-white/2 rounded-r-xl">
              <span className="text-2xl md:text-3xl font-black text-[#FF6B35]">{stats.newCuisines}</span>
              <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mt-0.5">New Cuisines</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
