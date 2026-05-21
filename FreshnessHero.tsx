import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Leaf, Sparkles, Download, HelpCircle } from 'lucide-react';
import { Meal } from '../types';

interface FreshnessHeroProps {
  onStartSwiping: (category?: string) => void;
  onExploreCocktail: () => void;
}

export function FreshnessHero({ onStartSwiping, onExploreCocktail }: FreshnessHeroProps) {
  // We can track hover coordinates to do a premium interactive magnetic parallax effect
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [recipeSaved, setRecipeSaved] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setCoords({ x, y });
  };

  const handleSaveRecipe = () => {
    setRecipeSaved(true);
    setTimeout(() => setRecipeSaved(false), 2000);
  };

  return (
    <div 
      className="relative w-full min-h-[95vh] lg:min-h-[90vh] bg-[#151B2E] text-[#F8FAFC] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 flex flex-col lg:flex-row transition-all duration-700"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setCoords({ x: 0, y: 0 });
      }}
    >
      {/* 
        SPLIT HERO BACKGROUND GRID
        Left is clean, spacious white. Right is dark rich charcoal slate.
        The separator has a gorgeous organic wave curve effect.
      */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden select-none">
        {/* Right side colored wave mask */}
        <div className="absolute top-0 right-0 h-full w-full lg:w-[48%] bg-[#0B1020] transition-colors duration-500 hidden lg:block"
             style={{
               clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
             }}
        />
        {/* Mobile/Tablet wave colored mask */}
        <div className="absolute bottom-0 left-0 w-full h-[40%] bg-[#0B1020] lg:hidden"
             style={{
               clipPath: 'polygon(0% 20%, 100% 0%, 100% 100%, 0% 100%)',
             }}
        />
      </div>

      {/* LEFT CONTENT CONTAINER */}
      <div className="flex-1 px-8 py-12 lg:p-20 flex flex-col justify-between z-10 relative lg:max-w-[55%]">
        {/* Tiny top brand element */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[#FF6B35]/15 flex items-center justify-center text-[#FF6B35]">
            <Leaf size={16} />
          </div>
          <span className="text-xs uppercase font-extrabold tracking-[0.2em] text-[#FF6B35]">
            Chef's Highlight
          </span>
        </div>

        {/* Core Headline Grid */}
        <div className="my-12 lg:my-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-2"
          >
            <span className="text-[#FF6B35] font-extrabold text-xs lg:text-sm uppercase tracking-[0.25em] block">
              CHEF'S SPECIAL
            </span>
            <h1 className="text-4xl lg:text-6xl font-black tracking-tight text-[#F8FAFC] leading-[1.05]">
              Freshness <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B35] to-[#FFB703]">in every bite.</span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-[#9CA3AF] text-sm lg:text-base leading-relaxed max-w-sm"
          >
            Healthy Crunchy Greens Bowl with organic sliced crisp apples, locally sourced pine nuts, tender slow-cooked sashimi grade ahi tuna bites, and nutrient-packed green cabbage — only 230 calories!
          </motion.p>

          {/* Action buttons with high clickability and hover effects */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-4"
          >
            <button
              onClick={() => onStartSwiping('Healthy Eats')}
              className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white font-extrabold text-sm tracking-wide px-8 py-4.5 rounded-full shadow-[0_10px_30px_rgba(255,107,53,0.3)] hover:shadow-[0_10px_30px_rgba(255,107,53,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer border-0"
            >
              <span>Explore Healthy Eats</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={handleSaveRecipe}
              className="bg-[#1B2338] border border-white/10 text-[#F8FAFC] hover:border-[#FF6B35]/40 hover:text-white font-bold text-sm tracking-wide px-7 py-4 rounded-full active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{recipeSaved ? 'Recipe Saved!' : 'Download Recipe'}</span>
              <Download size={16} className={recipeSaved ? 'text-[#22C55E]' : ''} />
            </button>
          </motion.div>
        </div>

        {/* BOTTOM LEFT: Chomping Chopsticks Holding Fresh Maki Roll */}
        <div className="hidden lg:block relative h-28 overflow-visible mt-6">
          <motion.div 
            className="absolute left-0 bottom-0 flex items-center"
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {/* The chopsticks holding sushi asset */}
            <div className="relative flex items-center">
              {/* Chopstick 1 */}
              <div 
                className="absolute w-44 h-1.5 bg-[#8b5a2b] rounded-full origin-right"
                style={{
                  transform: `rotate(${-28 + (coords.y * 5)}deg) translate(0px, -22px)`,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              {/* Chopstick 2 */}
              <div 
                className="absolute w-44 h-1.5 bg-[#704214] rounded-full origin-right"
                style={{
                  transform: `rotate(${-16 - (coords.y * 5)}deg) translate(2px, -8px)`,
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)'
                }}
              />
              {/* Freshly Rendered Sushi piece held in between */}
              <motion.div 
                className="ml-36 w-14 h-14 rounded-xl border border-white/10 bg-[#1B2338] p-1 shadow-lg relative flex items-center justify-center"
                style={{
                  transform: `rotate(${15 + coords.x * 12}deg)`
                }}
              >
                {/* Sushi details: nori ring, rice, salmon center, cucumber */}
                <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center p-0.5">
                  <div className="w-full h-full bg-white rounded-md flex items-center justify-center p-2 relative">
                    {/* Salmon center */}
                    <div className="w-5 h-5 bg-orange-500 rounded-full flex items-center justify-center animate-pulse">
                      {/* Inner stripe */}
                      <div className="w-1.5 h-1.5 bg-orange-200 rounded-full" />
                    </div>
                    {/* Cucumber slice next to it */}
                    <div className="absolute right-2 top-2 w-3.5 h-3.5 bg-emerald-500 rounded-full border border-white" />
                    <div className="absolute left-2.5 bottom-1.5 w-2 h-2 bg-yellow-300 rounded-full" />
                  </div>
                </div>
              </motion.div>
            </div>
            <span className="ml-[14.5rem] mt-4 text-[10px] font-extrabold text-gray-400 uppercase tracking-widest pl-2">
              Sashimi Roll Hand-Rolled
            </span>
          </motion.div>
        </div>
      </div>

      {/* RIGHT CYLINDRICAL PRESENTATION WITH DRIFTING FLOATING ASSETS */}
      <div className="flex-1 min-h-[380px] lg:h-auto flex items-center justify-center relative p-8 lg:p-0">
        
        {/* Subtle background radial spotlight glow in the dark section */}
        <div className="absolute inset-0 bg-radial-gradient from-[#FF6B35]/10 to-transparent pointer-events-none hidden lg:block" />

        {/* 
          3D Floating salad bowl
          Responds to magnetic user coordinate offsets to simulate premium depth.
        */}
        <motion.div
          className="relative z-10 w-[280px] h-[280px] md:w-[350px] md:h-[350px] transition-transform"
          style={{
            x: coords.x * 25,
            y: coords.y * 25,
            rotate: coords.x * 6,
          }}
          animate={{
            y: [0, -6, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          {/* Wooden backboard frame */}
          <div className="absolute inset-0 rounded-full bg-amber-950/20 shadow-2xl blur-xl" />
          
          {/* Main salad bowl image */}
          <img 
            src="https://images.unsplash.com/photo-1540420773420-3366772f4999?w=600&auto=format&fit=crop&q=80" 
            alt="Chef's Special Salad Bowl"
            className="w-full h-full object-cover rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-amber-950/20"
          />

          {/* Golden glow decoration overlay ring */}
          <div className="absolute inset-0 rounded-full border border-white/10 pointer-events-none" />
        </motion.div>

        {/* FLOATING ASSET 1: Fresh Green Spinach leaf at top-left */}
        <motion.div
          className="absolute left-[8%] top-[12%] z-20 w-16 h-16 pointer-events-none drop-shadow-xl"
          style={{
            x: coords.x * -15,
            y: coords.y * -15,
            rotate: coords.x * -10,
          }}
          animate={{
            y: [0, -10, 0],
            rotate: [20, 25, 20],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1551893086-c1d56091e18e?q=80&w=200&auto=format&fit=crop" 
            alt="Fresh Basil Leaf"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>

        {/* FLOATING ASSET 2: A lush red premium strawberry piece at center-left */}
        <motion.div
          className="absolute left-[15%] lg:left-[5%] bottom-[25%] lg:bottom-[35%] z-20 w-12 h-12 pointer-events-none drop-shadow-lg"
          style={{
            x: coords.x * -20,
            y: coords.y * 10,
            rotate: coords.x * 15,
          }}
          animate={{
            y: [0, 8, 0],
            rotate: [-15, -10, -15],
          }}
          transition={{
            duration: 4.2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1518635017498-87f514b751ba?q=80&w=200&auto=format&fit=crop" 
            alt="Floating Strawberry"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>

        {/* FLOATING ASSET 3: Ripe dark blueberry at center-top */}
        <motion.div
          className="absolute left-[45%] top-[18%] lg:top-[8%] z-20 w-10 h-10 pointer-events-none drop-shadow-md"
          style={{
            x: coords.x * 12,
            y: coords.y * -12,
            rotate: coords.x * 20,
          }}
          animate={{
            y: [0, -5, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 4.8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=200&auto=format&fit=crop" 
            alt="Floating Blackberry"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>

        {/* FLOATING ASSET 4: Spinach/kale leaf spinning at bottom right */}
        <motion.div
          className="absolute right-[8%] bottom-[12%] lg:bottom-[8%] z-20 w-14 h-14 lg:w-20 lg:h-20 pointer-events-none drop-shadow-xl"
          style={{
            x: coords.x * -30,
            y: coords.y * -30,
            rotate: coords.x * -16,
          }}
          animate={{
            y: [0, -12, 0],
            rotate: [115, 125, 115],
          }}
          transition={{
            duration: 5.6,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <img 
            src="https://images.unsplash.com/photo-1551893086-c1d56091e18e?q=80&w=200&auto=format&fit=crop" 
            alt="Floating Leaf"
            className="w-full h-full object-cover rounded-full scale-x-[-1]"
          />
        </motion.div>

        {/* FLOATING SPICE DETAILS: scattered tiny organic circles to evoke gourmet pepper and sesame seasoning */}
        <motion.div 
          className="absolute inset-0 pointer-events-none select-none z-15"
          style={{
            x: coords.x * 8,
            y: coords.y * 8
          }}
        >
          <div className="absolute left-[38%] bottom-[15%] w-2 h-2 bg-amber-700/60 rounded-full blur-[0.5px]" />
          <div className="absolute left-[41%] bottom-[14%] w-1.5 h-1.5 bg-amber-600/70 rounded-full blur-[0.5px]" />
          <div className="absolute left-[37%] bottom-[18%] w-1 h-1 bg-amber-800/80 rounded-full" />
          <div className="absolute right-[30%] top-[25%] w-1.5 h-1.5 bg-yellow-600/60 rounded-full blur-[0.5px]" />
          <div className="absolute right-[28%] top-[28%] w-2 h-2 bg-yellow-700/75 rounded-full" />
        </motion.div>
      </div>
    </div>
  );
}
