import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowUpRight, HelpCircle, Heart, Star, Check } from 'lucide-react';
import { Meal } from '../types';

interface SignatureColumnsProps {
  onAddSpecialToLiked: (meal: Meal) => void;
  likedMeals: Meal[];
}

export function TonightSignatureColumns({ onAddSpecialToLiked, likedMeals }: SignatureColumnsProps) {
  // Currently hovered/selected column (default to 0 to show the first one expanded)
  const [activeIdx, setActiveIdx] = useState<number>(0);
  const [savedStatus, setSavedStatus] = useState<Record<number, boolean>>({});

  const columns = [
    {
      num: '01',
      title: 'Creamy Pesto',
      textOverlay: 'PASTA',
      tagline: 'Smooth, fragrant & green',
      description: 'A rich, culinary marvel blending fresh organic basil pesto sauce with velvety double cream, premium parmigiano-reggiano, pine nuts, and perfectly tossed fresh wire-cut fusilli.',
      bgColor: 'bg-[#f5ebe6] text-[#4d3627]',
      textColor: 'text-[#4d3627]',
      accentColor: 'bg-[#4d3627]/10 text-[#4d3627]',
      accentBorder: 'border-[#4d3627]/25',
      image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&auto=format&fit=crop&q=80',
      mealObject: {
        id: 'curated-pesto',
        name: 'Curated Creamy Pesto',
        image: 'https://images.unsplash.com/photo-1546549032-9571cd6b27df?w=600&auto=format&fit=crop&q=80',
        tags: ['CURATED', 'FRESH-PESTO', 'PASTA'],
        time: '12 min',
        rating: 4.8,
        reviews: '512',
        description: 'Blends fresh herbal goodness of basil pesto with the silky smoothness of cream, garlic, and fresh parmesan tossed with penne or fusilli.',
        category: 'Comfort Food',
        spiceLevel: 10,
        savoryLevel: 75,
        sweetLevel: 20,
        umamiLevel: 80,
        ingredients: ['Basil pesto', 'Fresh Cream', 'Parmigiano-Reggiano', 'Pine Nuts', 'Fusilli Pasta']
      } as Meal
    },
    {
      num: '02',
      title: 'Truffle Whisper',
      textOverlay: 'TRUFFLE',
      tagline: 'Earthy, rich & aromatic',
      description: 'Fine-sourced wild shiitake mushrooms sautéed in white wine and cold-pressed olive oil, folded into egg tagliatelle and drizzled with signature black truffle oil essence.',
      bgColor: 'bg-[#e2e8dd] text-[#2c3e2e]',
      textColor: 'text-[#2c3e2e]',
      accentColor: 'bg-[#2c3e2e]/10 text-[#2c3e2e]',
      accentBorder: 'border-[#2c3e2e]/25',
      image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=80',
      mealObject: {
        id: 'curated-truffle',
        name: 'Curated Truffle Whisper',
        image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=80',
        tags: ['CURATED', 'AROMATIC', 'PASTA'],
        time: '15 min',
        rating: 4.9,
        reviews: '344',
        description: 'Earthy mushroom pasta finished with paper-thin white truffle oil elements and wild mountain herbs.',
        category: 'Spicy Selection',
        spiceLevel: 5,
        savoryLevel: 90,
        sweetLevel: 10,
        umamiLevel: 100,
        ingredients: ['Tagliatelle Pasta', 'Wild Mushrooms', 'White Truffle Oil', 'White Wine', 'Mountain Herbs']
      } as Meal
    },
    {
      num: '03',
      title: 'Sun-Kissed',
      textOverlay: 'MARINARA',
      tagline: 'Bright, sweet & zesty',
      description: 'Slow-simmered marinara sauce using sweet vine-ripened tomatoes, minced garlic cloves, fresh garden basil leaf, and finished with red pepper flakes and clean extra virgin olive oil.',
      bgColor: 'bg-[#eedeca] text-[#4d3a1a]',
      textColor: 'text-[#4d3a1a]',
      accentColor: 'bg-[#4d3a1a]/10 text-[#4d3a1a]',
      accentBorder: 'border-[#4d3a1a]/25',
      image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
      mealObject: {
        id: 'curated-sunkissed',
        name: 'Curated Sun-Kissed',
        image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?w=600&auto=format&fit=crop&q=80',
        tags: ['CURATED', 'ZESTY', 'PASTA'],
        time: '10 min',
        rating: 4.7,
        reviews: '618',
        description: 'Bright, tangy pasta cooked with ripe sun-dried tomatoes, roasted garlic cloves, cracked pepper, and garden fresh basil.',
        category: 'Healthy Eats',
        spiceLevel: 15,
        savoryLevel: 80,
        sweetLevel: 35,
        umamiLevel: 70,
        ingredients: ['Spaghetti Pasta', 'Sun-Dried Tomatoes', 'Roasted Garlic', 'Red Pepper Flakes', 'Garden Basil']
      } as Meal
    }
  ];

  const handleSaveMeal = (idx: number, meal: Meal) => {
    onAddSpecialToLiked(meal);
    setSavedStatus(prev => ({ ...prev, [idx]: true }));
    setTimeout(() => {
      setSavedStatus(prev => ({ ...prev, [idx]: false }));
    }, 2000);
  };

  return (
    <div className="w-full space-y-12 my-20">
      
      {/* Editorial Title Header block */}
      <div className="text-center max-w-xl mx-auto space-y-2 px-6">
        <span className="text-[#FF6B35] text-xs font-bold uppercase tracking-[0.2em] block">
          Interactive Gastronomies
        </span>
        <h2 className="text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
          Tonight's Signature Pairings
        </h2>
        <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
          Hover or tap on any pairing column to explore ingredients, view curated platings, and instantly savor.
        </p>
      </div>

      {/* 
        EXPANDABLE SLIDING COLUMNS CANVAS
        Framer-Motion layout enables incredibly smooth spring physics on column resize!
      */}
      <div className="flex flex-col lg:flex-row h-[2100px] lg:h-[620px] w-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 bg-[#0B1020]/40 lg:max-h-[640px]">
        {columns.map((col, idx) => {
          const isActive = activeIdx === idx;
          const isLiked = likedMeals.some((m) => m.id === col.mealObject.id);

          return (
            <motion.div
              key={idx}
              layout="position"
              onClick={() => setActiveIdx(idx)}
              onMouseEnter={() => {
                if (window.innerWidth >= 1024) {
                  setActiveIdx(idx);
                }
              }}
              className={`relative flex-1 flex flex-col justify-between p-8 lg:p-12 transition-all duration-700 cursor-pointer overflow-hidden select-none outline-none ${col.bgColor}`}
              style={{
                flexGrow: isActive ? 2.5 : 0.8,
              }}
            >
              
              {/* LARGE TEXT OVERLAY (Faced Behind Content) */}
              <div 
                className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center opacity-[0.03] lg:opacity-[0.04] select-none uppercase tracking-[0.2em] font-extrabold text-[8rem] lg:text-[14rem] select-none"
                style={{
                  fontFamily: '"Space Grotesk", sans-serif'
                }}
              >
                {col.textOverlay}
              </div>

              {/* TOP ROW: Numbers and Quick Saved Status badge */}
              <div className="relative z-10 flex justify-between items-center w-full">
                <span className="text-3xl lg:text-5xl font-black tracking-tight font-mono opacity-80 select-none">
                  {col.num}
                </span>

                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase bg-white/40 backdrop-blur-md text-inherit shadow-md"
                  >
                    <Star size={12} fill="currentColor" />
                    <span>Michelin 3-Star</span>
                  </motion.div>
                )}
              </div>

              {/* CENTER COLUMN PLATINGS */}
              <div className="relative z-10 w-full flex flex-col items-center my-6 lg:my-auto">
                {/* 
                  Circular plate showcase
                  Scales up elegantly and triggers complex smooth shadow transformations on activation
                */}
                <motion.div
                  className="relative w-[180px] h-[180px] lg:w-[260px] lg:h-[260px] rounded-full overflow-hidden shadow-2xl border-4 border-white/20 select-none"
                  style={{
                    scale: isActive ? 1.05 : 0.85,
                  }}
                  animate={{
                    rotate: isActive ? 15 : 0,
                    scale: isActive ? 1.05 : 0.85
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 18
                  }}
                >
                  <img
                    src={col.image}
                    alt={col.title}
                    className="w-full h-full object-cover rounded-full select-none"
                  />
                  <div className="absolute inset-0 rounded-full border border-white/10" />
                </motion.div>
              </div>

              {/* BOTTOM INFORMATION COLUMN AND ACTIONS */}
              <div className="relative z-10 space-y-4">
                
                {/* Titles and taglines */}
                <div className="space-y-1">
                  <span className={`text-[10px] font-extrabold tracking-[0.2em] uppercase block opacity-75 ${col.textColor}`}>
                    {col.tagline}
                  </span>
                  <h3 className="text-2xl lg:text-4xl font-extrabold tracking-tight">
                    {col.title}
                  </h3>
                </div>

                {/* Expanded description block */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.4 }}
                      className="space-y-4 overflow-hidden"
                    >
                      <p className="text-xs lg:text-sm leading-relaxed opacity-85">
                        {col.description}
                      </p>

                      {/* Displaying core premium ingredients */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {col.mealObject.ingredients.map((ing, idx) => (
                          <span 
                            key={idx} 
                            className={`text-[10px] font-bold px-3 py-1.5 rounded-full border ${col.accentBorder} ${col.accentColor} capitalize`}
                          >
                            {ing}
                          </span>
                        ))}
                      </div>

                      {/* Interactive Actions line */}
                      <div className="flex items-center gap-3 pt-4 border-t border-black/10">
                        <button
                          onClick={() => handleSaveMeal(idx, col.mealObject)}
                          className="flex-1 bg-gray-900 text-white font-extrabold text-xs tracking-wider uppercase py-3.5 px-6 rounded-full shadow-lg hover:bg-[#FF6B35] hover:text-white hover:shadow-[0_4px_15px_rgba(255,107,53,0.45)] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                        >
                          {savedStatus[idx] ? (
                            <>
                              <Check size={14} className="text-white" />
                              <span>Savor Added!</span>
                            </>
                          ) : isLiked ? (
                            <>
                              <Heart size={14} fill="currentColor" className="text-red-500 hover:text-white" />
                              <span>In Favorites</span>
                            </>
                          ) : (
                            <>
                              <Heart size={14} />
                              <span>Savor Cuisine</span>
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Collapsed quick helper */}
                {!isActive && (
                  <div className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider opacity-60">
                    <span>Savor Recipe</span>
                    <ArrowUpRight size={14} />
                  </div>
                )}
              </div>

            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
