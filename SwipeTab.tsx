import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Undo, Flame, Bookmark, Info, X, Heart, Swords, ChevronLeft, RefreshCw } from 'lucide-react';
import { Meal } from '../types';

interface SwipeTabProps {
  meals: Meal[];
  onSwipe: (meal: Meal, liked: boolean) => void;
  onLikedListUpdate: (meal: Meal) => void;
  likedMeals: Meal[];
  isLoading?: boolean;
}

export function SwipeTab({ meals, onSwipe, onLikedListUpdate, likedMeals, isLoading = false }: SwipeTabProps) {
  const [deck, setDeck] = useState<Meal[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [history, setHistory] = useState<number[]>([]);
  
  // Game modes: 'classic' | 'battle'
  const [mode, setMode] = useState<'classic' | 'battle'>('classic');
  
  // Swipe animation states
  const [swipeDirection, setSwipeDirection] = useState<'left' | 'right' | null>(null);

  // Battle Mode states
  const [battleCommentary, setBattleCommentary] = useState<string>('The stage is set for a monumental battle of culinary titans. Choose your champion!');
  const [battleLoading, setBattleLoading] = useState(false);
  const [battleWinner, setBattleWinner] = useState<string | null>(null);

  // Detail Modal states
  const [activeDetailMeal, setActiveDetailMeal] = useState<Meal | null>(null);

  // Shake state for rejected swipes
  const [shake, setShake] = useState(false);

  // Drag tracking
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-30, 30]);
  const opacityLeft = useTransform(x, [-150, -50], [1, 0]);
  const opacityRight = useTransform(x, [50, 150], [0, 1]);

  useEffect(() => {
    // Fill local deck with prop meals
    setDeck(meals);
  }, [meals]);

  const currentMeal = deck[currentIndex];

  const handleSwipeClassic = (liked: boolean) => {
    if (!currentMeal) return;
    onSwipe(currentMeal, liked);
    setHistory((prev) => [...prev, currentIndex]);
    setCurrentIndex((prev) => prev + 1);
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    const previousIndex = history[history.length - 1];
    setHistory((prev) => prev.slice(0, -1));
    setCurrentIndex(previousIndex);
  };

  // Drag Handler for framer motion card
  const handleDragEnd = (_e: any, info: any) => {
    const threshold = 120;
    if (info.offset.x > threshold) {
      // Swiped Right (Like)
      handleSwipeClassic(true);
    } else if (info.offset.x < -threshold) {
      // Swiped Left (Dislike)
      handleSwipeClassic(false);
    } else {
      // User dragged but did not cross the threshold. Provide tactile shake response!
      if (Math.abs(info.offset.x) > 8) {
        setShake(true);
      }
    }
  };

  // Run battle evaluation using our back-end announcement route
  const handleSelectChampion = async (winner: string, opponent: string) => {
    setBattleWinner(winner);
    setBattleLoading(true);
    try {
      const response = await fetch('/api/gemini/battle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topMeal: winner, bottomMeal: opponent }),
      });
      const data = await response.json();
      setBattleCommentary(data.commentary);
    } catch (e) {
      console.error(e);
      setBattleCommentary(`A flawless choice. The intense flavors of ${winner} overrule ${opponent} with absolute dominance.`);
    } finally {
      setBattleLoading(false);
    }
  };

  const handleResetBattle = () => {
    setBattleWinner(null);
    setBattleCommentary('The stage is set for a monumental battle of culinary titans. Choose your champion!');
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[85vh] py-8 text-on-surface select-none pb-32 animate-fade-in relative">
      
      {/* Mode Switcher */}
      <div id="mode-switcher" className="flex items-center gap-1 bg-[#151B2E] p-1.5 rounded-full border border-white/5 mb-6 z-10">
        <button
          onClick={() => setMode('classic')}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            mode === 'classic'
              ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white shadow-lg shadow-[#FF6B35]/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart size={14} fill={mode === 'classic' ? 'currentColor' : 'none'} />
          Classic Deck
        </button>
        <button
          onClick={() => setMode('battle')}
          className={`flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 ${
            mode === 'battle'
              ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white shadow-lg shadow-[#FF6B35]/20'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Swords size={14} />
          Battle Mode
        </button>
      </div>

      <AnimatePresence mode="wait">
        {mode === 'classic' ? (
          /* CLASSIC DECKS TAB */
          <motion.div
            key="classic-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md px-6 flex flex-col items-center"
          >
            {/* Discovery Card Container */}
            <div className="relative w-full h-[520px] rounded-[2rem] overflow-hidden bg-[#151B2E]/60 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.4)] flex items-center justify-center">
              {isLoading ? (
                <div className="absolute inset-0 w-full h-full p-8 pt-24 flex flex-col justify-end bg-gradient-to-t from-[#0B1020] via-[#0B1020]/50 to-transparent overflow-hidden">
                  {/* Moving Shimmer Glare */}
                  <motion.div
                    className="absolute inset-y-0 h-full w-[150%] bg-gradient-to-r from-transparent via-white/[0.04] to-transparent skew-x-12"
                    initial={{ x: '-150%' }}
                    animate={{ x: '100%' }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.8,
                      ease: 'linear',
                    }}
                  />
                  
                  {/* Outer abstract loader graphic */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-15">
                    <Flame className="w-32 h-32 text-gray-400 animate-pulse" />
                  </div>

                  {/* Info Overlay Skeleton */}
                  <div className="space-y-4 z-10 pointer-events-none">
                    {/* Tags block placeholder */}
                    <div className="flex gap-2">
                      <div className="h-6 w-20 rounded-full bg-white/5 border border-white/5 animate-pulse" />
                      <div className="h-6 w-16 rounded-full bg-white/5 border border-white/5 animate-pulse" />
                    </div>

                    {/* Title block placeholder */}
                    <div className="space-y-2">
                      <div className="h-8 w-3/4 rounded-xl bg-white/10 animate-pulse" />
                      <div className="h-5 w-1/2 rounded-xl bg-white/5 animate-pulse" />
                    </div>

                    {/* Time & rating placeholder */}
                    <div className="flex items-center gap-4 pt-1">
                      <div className="h-4 w-14 rounded-md bg-white/5 animate-pulse" />
                      <div className="h-4 w-24 rounded-md bg-white/5 animate-pulse" />
                    </div>
                  </div>
                </div>
              ) : currentIndex < deck.length ? (
                <AnimatePresence>
                  <motion.div
                    key={currentMeal.id}
                    drag="x"
                    dragConstraints={{ left: 0, right: 0 }}
                    style={{ x, rotate }}
                    onDragEnd={handleDragEnd}
                    className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing rounded-[2rem] overflow-hidden"
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                  >
                    <motion.div
                      className="absolute inset-0 w-full h-full flex flex-col"
                      animate={shake ? {
                        x: [-12, 12, -10, 10, -6, 6, -3, 3, 0],
                      } : { x: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      onAnimationComplete={() => setShake(false)}
                    >
                      {/* Full Bleed Image */}
                      <img
                        alt={currentMeal.name}
                        src={currentMeal.image}
                        className="w-full h-full object-cover pointer-events-none"
                      />

                      {/* Left Dislike Overlay */}
                      <motion.div
                        style={{ opacity: opacityLeft }}
                        className="absolute left-10 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-20 h-20 rounded-full border-4 border-[#ffb4ab]/70 bg-[#ffb4ab]/20 backdrop-blur-md pointer-events-none"
                      >
                        <X className="text-[#ffb4ab]" size={40} />
                      </motion.div>

                      {/* Right Like Overlay */}
                      <motion.div
                        style={{ opacity: opacityRight }}
                        className="absolute right-10 top-1/2 -translate-y-1/2 z-30 flex items-center justify-center w-20 h-20 rounded-full border-4 border-[#22C55E]/70 bg-[#22C55E]/20 backdrop-blur-md pointer-events-none"
                      >
                        <Heart className="text-[#22C55E]" size={40} fill="currentColor" />
                      </motion.div>

                       {/* Gradient & Glass info overlay */}
                      <div className="absolute inset-x-0 bottom-0 p-8 pt-24 bg-gradient-to-t from-[#0B1020] via-[#0B1020]/45 to-transparent flex flex-col justify-end text-white z-20 pointer-events-none">
                        <div className="flex flex-wrap gap-2 mb-3">
                          {currentMeal.tags.map((tag, i) => (
                            <span
                              key={i}
                              className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-widest ${
                                i === 0
                                  ? 'bg-white/10 text-white/90'
                                  : 'bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/20'
                              }`}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <h1 className="text-2xl font-extrabold text-white tracking-tight leading-tight mb-2">
                          {currentMeal.name}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-400 text-xs">
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B35]" />
                            <span>{currentMeal.time}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
                            <span>★ {currentMeal.rating} ({currentMeal.reviews})</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              ) : (
                <div className="flex flex-col items-center justify-center text-center p-8">
                  <div className="p-4 bg-[#FF6B35]/15 rounded-full text-[#FF6B35] mb-4">
                    <Flame size={36} fill="currentColor" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">You cleared the deck!</h3>
                  <p className="text-gray-400 text-sm mb-6 max-w-xs">
                    Try checking your favorites or generate unique personalized AI dishes in the Kitchen master tab!
                  </p>
                  <button
                    onClick={() => {
                      setCurrentIndex(0);
                      setHistory([]);
                    }}
                    className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:scale-105 active:scale-95 shadow-md shadow-[#FF6B35]/20 hover:shadow-[0_4px_15px_rgba(255,107,53,0.3)] transition-all border-0 cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    Reset Deck
                  </button>
                </div>
              )}
            </div>

            {/* Quick action floating dials */}
            {(isLoading || currentIndex < deck.length) && (
              <div className="flex items-center justify-center gap-6 mt-6 w-full">
                {/* Undo Key */}
                <button
                  onClick={handleUndo}
                  disabled={isLoading || history.length === 0}
                  className={`w-14 h-14 rounded-full flex items-center justify-center bg-[#151B2E]/40 border border-white/5 shadow-md text-gray-300 transition-all duration-300 hover:text-white ${
                    history.length > 0 && !isLoading ? 'opacity-100 active:scale-90 cursor-pointer' : 'opacity-40 cursor-not-allowed'
                  }`}
                  title="Undo previous swipe"
                >
                  <Undo size={22} />
                </button>

                {/* LIKE action buttons */}
                <button
                  onClick={() => handleSwipeClassic(true)}
                  disabled={isLoading}
                  className={`w-18 h-18 rounded-full flex items-center justify-center bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white shadow-lg shadow-[#FF6B35]/30 hover:scale-[1.06] hover:shadow-[0_8px_25px_rgba(255,107,53,0.45)] active:scale-90 transition-all duration-300 border-0 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  title="Like dish"
                >
                  <Heart size={28} fill="currentColor" />
                </button>

                {/* bookmark trigger */}
                <button
                  onClick={() => {
                    if (currentMeal) onLikedListUpdate(currentMeal);
                  }}
                  disabled={isLoading}
                  className={`w-14 h-14 rounded-full flex items-center justify-center border border-white/5 shadow-md transition-all duration-300 active:scale-90 ${
                    isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                  }
                    ${currentMeal && likedMeals.some((m) => m.id === currentMeal.id)
                      ? 'bg-[#22C55E]/20 text-[#22C55E] border-[#22C55E]/30'
                      : 'bg-[#151B2E]/40 text-gray-300 hover:text-white'
                    }`}
                  title="Save to favorites"
                >
                  <Bookmark size={22} fill={currentMeal && likedMeals.some((m) => m.id === currentMeal.id) ? 'currentColor' : 'none'} />
                </button>

                {/* info trigger */}
                <button
                  onClick={() => currentMeal && setActiveDetailMeal(currentMeal)}
                  disabled={isLoading}
                  className={`w-14 h-14 rounded-full flex items-center justify-center bg-[#151B2E]/40 border border-white/5 shadow-md text-gray-300 transition-all duration-300 hover:text-white active:scale-95 ${
                    isLoading ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'
                  }`}
                  title="Show ingredient details"
                >
                  <Info size={22} />
                </button>
              </div>
            )}
          </motion.div>
        ) : (
          /* BATTLE MODE MATCH-UPS SCREEN */
          <motion.div
            key="battle-screen"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="w-full max-w-md h-[580px] px-6 relative flex flex-col"
          >
            {/* Top Champion Block */}
            <div
              id="champion-top"
              onClick={() => handleSelectChampion('Gourmet Burger', 'Spicy Ramen')}
              className={`relative flex-1 rounded-t-[2rem] overflow-hidden cursor-pointer group transition-all duration-500 border-x border-t border-white/10 ${
                battleWinner === 'Gourmet Burger' ? 'ring-4 ring-[#FF6B35] z-10' : 'brightness-75'
              }`}
            >
              <img
                alt="Gourmet Burger"
                src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-102 cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-[#0B1020]/90 via-transparent to-transparent z-10" />
              <div className="absolute top-6 left-6 z-20 text-white">
                <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Premium Beef</span>
                <h3 className="text-xl font-extrabold mt-1">Gourmet Burger</h3>
                <span className="text-xs text-[#FFB703]">★ 4.8 (2.4k reviews)</span>
              </div>
            </div>

            {/* Battle Token */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 flex flex-col items-center pointer-events-none">
              <div className="w-14 h-14 rounded-full bg-[#101415]/90 border-2 border-[#FFB703] shadow-[0_0_20px_rgba(255,183,3,0.5)] flex items-center justify-center animate-pulse">
                <span className="font-display-lg text-lg text-[#FFB703] font-extrabold italic">VS</span>
              </div>
            </div>

            {/* Bottom Champion Block */}
            <div
              id="champion-bottom"
              onClick={() => handleSelectChampion('Spicy Ramen', 'Gourmet Burger')}
              className={`relative flex-1 rounded-b-[2rem] overflow-hidden cursor-pointer group transition-all duration-500 border-x border-b border-white/10 ${
                battleWinner === 'Spicy Ramen' ? 'ring-4 ring-[#FF6B35] z-10' : 'brightness-75'
              }`}
            >
              <img
                alt="Spicy Tonkotsu Ramen"
                src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80"
                className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:scale-102 cursor-pointer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020]/90 via-transparent to-transparent z-10" />
              <div className="absolute bottom-6 left-6 z-20 text-white">
                <span className="bg-white/10 px-2 py-0.5 rounded text-[10px] uppercase tracking-wider">Artisanal Broth</span>
                <h3 className="text-xl font-extrabold mt-1">Spicy Ramen</h3>
                <span className="text-xs text-[#FFB703]">★ 4.9 (1.8k reviews)</span>
              </div>
            </div>

            {/* Winner Selection Overlay */}
            <AnimatePresence>
              {battleWinner && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  className="absolute inset-0 bg-[#0B1020]/95 backdrop-blur-md rounded-[2rem] z-40 p-8 flex flex-col justify-center items-center text-center border border-white/10 shadow-2xl"
                >
                  <div className="w-16 h-16 bg-[#FF6B35]/20 text-[#FF6B35] rounded-full flex items-center justify-center mb-4">
                    <Swords size={28} />
                  </div>
                  <h4 className="text-[#FF6B35] text-xs uppercase font-extrabold tracking-widest mb-1">
                    Champion Selected
                  </h4>
                  <h2 className="text-2xl font-black text-white mb-4 leading-tight">{battleWinner}</h2>

                  {/* Commentator Box */}
                  <div className="bg-[#151B2E] border border-white/5 p-4 rounded-xl max-w-xs mb-6 relative">
                    <span className="absolute -top-2.5 left-4 bg-[#FF6B35] text-white text-[8px] font-extrabold px-1.5 py-0.5 rounded">
                      ANNOUNCER COMMENTARY
                    </span>
                    {battleLoading ? (
                      <div className="flex flex-col items-center py-2">
                        <span className="animate-spin rounded-full h-4 w-4 border-2 border-[#FF6B35] border-t-transparent mb-1" />
                        <p className="text-gray-400 text-xs italic">Consulting executive tournament roster...</p>
                      </div>
                    ) : (
                      <p className="text-gray-300 text-xs leading-relaxed italic">
                        "{battleCommentary}"
                      </p>
                    )}
                  </div>

                  <button
                    onClick={handleResetBattle}
                    className="bg-[#FF6B35] text-white font-bold text-xs uppercase tracking-wider px-6 py-3.5 rounded-full hover:scale-105 active:scale-95 shadow-md shadow-[#FF6B35]/20 transition-all border-0 cursor-pointer"
                  >
                    Battle Next Challenger
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Detail info Modal Popup */}
      <AnimatePresence>
        {activeDetailMeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#0B1020]/80 backdrop-blur-lg flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-[#151B2E] border border-white/15 w-full max-w-md rounded-3xl p-6 relative max-h-[85vh] overflow-y-auto shadow-2xl scrollbar-none"
            >
              <button
                onClick={() => setActiveDetailMeal(null)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-all"
              >
                <X size={18} />
              </button>

              <img
                alt={activeDetailMeal.name}
                src={activeDetailMeal.image}
                className="w-full h-44 object-cover rounded-2xl mb-4 shadow"
              />

              <div className="flex gap-2 mb-2">
                {activeDetailMeal.tags.map((tag, i) => (
                  <span key={i} className="bg-[#FF6B35]/15 text-[#FF6B35] text-[10px] font-black tracking-widest px-2.5 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>

              <h2 className="text-2xl font-black text-white mb-2">{activeDetailMeal.name}</h2>
              <p className="text-gray-300 text-xs leading-relaxed mb-4">{activeDetailMeal.description}</p>

              {/* Ingredients Block */}
              {activeDetailMeal.ingredients && (
                <div className="mb-4">
                  <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Signature Ingredients:</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeDetailMeal.ingredients.map((ing, i) => (
                      <span key={i} className="text-xs text-gray-300 bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
                        {ing}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Flavor break down bar indicators */}
              <div className="space-y-2 pt-2 border-t border-white/5">
                <h4 className="text-white text-xs font-bold uppercase tracking-wider">Flavor Footprint:</h4>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <div className="flex justify-between text-gray-400 mb-0.5">
                      <span>Spicy Intensity</span>
                      <span className="text-[#FF6B35] font-bold">{activeDetailMeal.spiceLevel}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-red-500 rounded-full" style={{ width: `${activeDetailMeal.spiceLevel}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-400 mb-0.5">
                      <span>Savory Richness</span>
                      <span className="text-[#FF6B35] font-bold">{activeDetailMeal.savoryLevel}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${activeDetailMeal.savoryLevel}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-400 mb-0.5">
                      <span>Sweetness</span>
                      <span className="text-[#FF6B35] font-bold">{activeDetailMeal.sweetLevel}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: `${activeDetailMeal.sweetLevel}%` }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-gray-400 mb-0.5">
                      <span>Umami Depth</span>
                      <span className="text-[#FF6B35] font-bold">{activeDetailMeal.umamiLevel}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: `${activeDetailMeal.umamiLevel}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
