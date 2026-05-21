import React, { useState, useEffect } from 'react';
import { Compass, Sparkles, Flame, Heart, User, CheckCircle2, ChefHat } from 'lucide-react';
import { MEALS_DATA, ACHIEVEMENTS_DATA, INITIAL_STATS } from './data';
import { Meal, Achievement, ProfileStats } from './types';
import { getLiveMealDBData } from './mealdb';
import { getIndianCuisineMeals } from './indianMeals';

// Component imports
import { ExploreTab } from './components/ExploreTab';
import { SwipeTab } from './components/SwipeTab';
import { KitchenTab } from './components/KitchenTab';
import { FavsTab } from './components/FavsTab';
import { ProfileTab } from './components/ProfileTab';

export default function App() {
  // Navigation State
  const [activeTab, setActiveTab] = useState<'explore' | 'swipe' | 'kitchen' | 'favs' | 'profile'>('explore');

  // Meal lists (Base + Liked + Indian)
  const [allMeals, setAllMeals] = useState<Meal[]>(() => [...MEALS_DATA, ...getIndianCuisineMeals()]);
  const [meals, setMeals] = useState<Meal[]>(() => [...MEALS_DATA, ...getIndianCuisineMeals()]);
  const [likedMeals, setLikedMeals] = useState<Meal[]>([]);
  const [isMealDBLoading, setIsMealDBLoading] = useState(true);

  // Profile and achievements stats
  const [stats, setStats] = useState<ProfileStats>(INITIAL_STATS);
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS_DATA);

  // Flame / Streak levels state
  const [streakCount, setStreakCount] = useState(5);
  const [showStreakPopup, setShowStreakPopup] = useState(false);

  // Load live recipes from MealDB on boot
  useEffect(() => {
    async function loadMealDB() {
      setIsMealDBLoading(true);
      try {
        const liveData = await getLiveMealDBData();
        const indianMeals = getIndianCuisineMeals();
        
        // Ensure no duplicates by ID
        const seen = new Set<string>();
        const combined: Meal[] = [];
        
        MEALS_DATA.forEach(m => {
          if (!seen.has(m.id)) {
            seen.add(m.id);
            combined.push(m);
          }
        });

        indianMeals.forEach(m => {
          if (!seen.has(m.id)) {
            seen.add(m.id);
            combined.push(m);
          }
        });

        if (liveData && liveData.length > 0) {
          liveData.forEach(m => {
            if (!seen.has(m.id)) {
              seen.add(m.id);
              combined.push(m);
            }
          });
        }

        setAllMeals(combined);
        setMeals(combined);
      } catch (err) {
        console.error('Failed to load live MealDB recipes:', err);
      } finally {
        setIsMealDBLoading(false);
      }
    }
    loadMealDB();
  }, []);

  // Sync state with localStorage on startup
  useEffect(() => {
    const savedLikes = localStorage.getItem('mealswipe_likes');
    if (savedLikes) {
      try {
        setLikedMeals(JSON.parse(savedLikes));
      } catch (e) {
        console.error(e);
      }
    } else {
      // By default, add a couple of beautiful sample items from MEALS_DATA so it doesn't start blank!
      const initialSaves = [MEALS_DATA[3], MEALS_DATA[4], MEALS_DATA[5]]; // Tagliatelle, Brisket, Dragon Bowl
      setLikedMeals(initialSaves);
      localStorage.setItem('mealswipe_likes', JSON.stringify(initialSaves));
    }

    const savedStats = localStorage.getItem('mealswipe_stats');
    if (savedStats) {
      try {
        setStats(JSON.parse(savedStats));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  // Helper to sync likes
  const updateLikes = (newList: Meal[]) => {
    setLikedMeals(newList);
    localStorage.setItem('mealswipe_likes', JSON.stringify(newList));
  };

  // Click handle liking from swipe deck
  const handleSwipe = (meal: Meal, liked: boolean) => {
    // Increase swipe count in statistics
    const newStats = {
      ...stats,
      swipesThisMonth: stats.swipesThisMonth + 1,
    };
    setStats(newStats);
    localStorage.setItem('mealswipe_stats', JSON.stringify(newStats));

    if (liked) {
      handleToggleLike(meal);
    }
  };

  const handleToggleLike = (meal: Meal) => {
    const exists = likedMeals.some((m) => m.id === meal.id);
    let newList: Meal[] = [];
    if (exists) {
      newList = likedMeals.filter((m) => m.id !== meal.id);
    } else {
      newList = [...likedMeals, meal];
    }
    updateLikes(newList);
  };

  const handleRemoveLikedMeal = (mealId: string) => {
    const newList = likedMeals.filter((m) => m.id !== mealId);
    updateLikes(newList);
  };

  // Add custom Gemini created food to liked
  const handleAddCustomMealToLiked = (meal: Meal) => {
    if (!likedMeals.some((m) => m.id === meal.id)) {
      const newList = [...likedMeals, meal];
      updateLikes(newList);
    }
  };

  // Refine user statistics trigger
  const handleRefineProfile = () => {
    // Elegant bump of statistics to simulate learning user matches
    const refined = {
      ...stats,
      kcalExplored: '13.1k',
      swipeDistance: '3.6m',
      spicyTolerance: '88%',
      newCuisines: stats.newCuisines + 2,
      spicyPercent: 85,
      savoryPercent: 65,
      umamiPercent: 80,
    };
    setStats(refined);
    localStorage.setItem('mealswipe_stats', JSON.stringify(refined));
    
    // Quick success toast
    setShowStreakPopup(true);
    setTimeout(() => {
      setShowStreakPopup(false);
    }, 2500);
  };

  // Boost flame streak metric
  const handleFlameBoost = () => {
    setStreakCount((prev) => prev + 1);
    const refined = {
      ...stats,
      newCuisines: stats.newCuisines + 1,
    };
    setStats(refined);
    localStorage.setItem('mealswipe_stats', JSON.stringify(refined));

    setShowStreakPopup(true);
    setTimeout(() => {
      setShowStreakPopup(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-[#0B1020] text-[#e0e3e5] font-sans antialiased relative overflow-x-hidden">
      
      {/* Top Floating App Bar */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#0B1020]/80 backdrop-blur-3xl flex justify-between items-center px-6 h-16 border-b border-white/5">
        <div 
          onClick={() => setActiveTab('explore')} 
          className="flex items-center gap-2 cursor-pointer group"
        >
          <span className="text-3xl font-extrabold text-[#FF6B35] tracking-tighter select-none transition-transform group-hover:scale-102">
            MealSwipe
          </span>
        </div>

        {/* Action Indicators */}
        <div className="flex items-center gap-4">
          {/* Flame streak badge */}
          <button
            onClick={handleFlameBoost}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6B35]/15 border border-[#FF6B35]/20 text-[#FF6B35] hover:bg-[#FF6B35]/25 transition-all duration-300 shadow-sm shadow-[#FF6B35]/10"
            title="Savor Strike Streak Boost"
          >
            <Flame size={16} fill="currentColor" />
            <span className="text-xs font-extrabold">{streakCount}d</span>
          </button>

          {/* User profile capsule portrait */}
          <div 
            onClick={() => setActiveTab('profile')}
            className={`w-9 h-9 rounded-full border border-white/10 p-0.5 overflow-hidden cursor-pointer transition-all ${
              activeTab === 'profile' ? 'ring-2 ring-[#FF6B35]' : 'hover:scale-102'
            }`}
          >
            <img
              alt="User profile capsule portrait"
              className="w-full h-full object-cover rounded-full"
              src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
            />
          </div>
        </div>
      </header>

      {/* Streak popup notification */}
      {showStreakPopup && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-[#151B2E] border border-[#22C55E]/30 px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2.5 animate-scale-up text-white">
          <CheckCircle2 size={18} className="text-[#22C55E]" />
          <div className="text-xs">
            <p className="font-extrabold">Taste Profile Enhanced!</p>
            <p className="text-gray-400 font-medium">Your sensory preferences are fine-tuned.</p>
          </div>
        </div>
      )}

      {/* Main Tab Rendering space */}
      <main className="w-full min-h-screen">
        {activeTab === 'explore' && (
          <ExploreTab 
            onStartSwiping={(categoryFilters) => {
              if (categoryFilters) {
                // Instantly filter deck based on selection!
                const filtered = allMeals.filter(m => m.category === categoryFilters);
                setMeals(filtered.length > 0 ? filtered : allMeals);
              } else {
                setMeals(allMeals);
              }
              setActiveTab('swipe');
            }}
            onExploreCocktail={() => {
              // Direct matchmaker for cocktail special
              const cocktailMeal: Meal = {
                id: 'curated-cocktail',
                name: 'The Liquid Gold Cocktail',
                image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600&auto=format&fit=crop&q=80',
                tags: ['CURATED', 'LATE-NIGHT'],
                time: '8 min',
                rating: 4.9,
                reviews: '85',
                description: 'A spectacular, Michelin-grade cocktail masterwork combining smoky single malt scotch, organic floral honey juice, freshly pressed lemon, and fresh golden mist. Perfect for late night.',
                category: 'Cocktails',
                spiceLevel: 0,
                savoryLevel: 30,
                sweetLevel: 75,
                umamiLevel: 60
              };
              handleAddCustomMealToLiked(cocktailMeal);
              setActiveTab('favs');
            }}
            onAddSpecialToLiked={handleAddCustomMealToLiked}
            likedMeals={likedMeals}
            meals={meals}
          />
        )}
        {activeTab === 'swipe' && (
          <SwipeTab 
            meals={meals}
            onSwipe={handleSwipe}
            onLikedListUpdate={handleToggleLike}
            likedMeals={likedMeals}
            isLoading={isMealDBLoading}
          />
        )}
        {activeTab === 'kitchen' && (
          <KitchenTab 
            onAddCustomMealToLiked={handleAddCustomMealToLiked}
            likedMeals={likedMeals}
          />
        )}
        {activeTab === 'favs' && (
          <FavsTab 
            likedMeals={likedMeals}
            onRemoveLikedMeal={handleRemoveLikedMeal}
          />
        )}
        {activeTab === 'profile' && (
          <ProfileTab 
            stats={stats}
            achievements={achievements}
            onRefineProfile={handleRefineProfile}
          />
        )}
      </main>

      {/* Floating Bottom Glass Navigation dock */}
      <nav className="fixed bottom-0 inset-x-0 z-40 bg-[#151B2E]/70 backdrop-blur-2xl border-t border-white/10 rounded-t-2xl shadow-[0_-8px_30px_rgba(0,0,0,0.4)] px-4 pb-safe h-20 flex justify-around items-center max-w-xl mx-auto">
        {/* Explore click helper */}
        <button
          onClick={() => setActiveTab('explore')}
          className={`flex flex-col items-center justify-center flex-1 py-2 transition-all outline-none cursor-pointer ${
            activeTab === 'explore' 
              ? 'text-[#FF6B35] drop-shadow-[0_0_10px_rgba(255,107,53,0.35)] scale-105 font-bold' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Compass size={20} />
          <span className="text-[10px] uppercase font-bold tracking-[0.1em] mt-1.5">Explore</span>
        </button>

        {/* Swipe click helper */}
        <button
          onClick={() => {
            setMeals(allMeals); // reset possible category filter
            setActiveTab('swipe');
          }}
          className={`flex flex-col items-center justify-center flex-1 py-2 transition-all outline-none cursor-pointer ${
            activeTab === 'swipe' 
              ? 'text-[#FF6B35] drop-shadow-[0_0_10px_rgba(255,107,53,0.35)] scale-105 font-bold' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Flame size={20} fill={activeTab === 'swipe' ? "currentColor" : "none"} />
          <span className="text-[10px] uppercase font-bold tracking-[0.1em] mt-1.5">Swipe</span>
        </button>

        {/* Kitchen click helper */}
        <button
          onClick={() => setActiveTab('kitchen')}
          className={`flex flex-col items-center justify-center flex-1 py-2 transition-all outline-none cursor-pointer ${
            activeTab === 'kitchen' 
              ? 'text-[#FF6B35] drop-shadow-[0_0_10px_rgba(255,107,53,0.35)] scale-105 font-bold' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <ChefHat size={20} />
          <span className="text-[10px] uppercase font-bold tracking-[0.1em] mt-1.5">Kitchen</span>
        </button>

        {/* Favs click helper */}
        <button
          onClick={() => setActiveTab('favs')}
          className={`flex flex-col items-center justify-center flex-1 py-2 transition-all outline-none cursor-pointer ${
            activeTab === 'favs' 
              ? 'text-[#FF6B35] drop-shadow-[0_0_10px_rgba(255,107,53,0.35)] scale-105 font-bold' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Heart size={20} fill={activeTab === 'favs' ? "currentColor" : "none"} />
          <span className="text-[10px] uppercase font-bold tracking-[0.1em] mt-1.5">Favs</span>
        </button>

        {/* Profile click helper */}
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex flex-col items-center justify-center flex-1 py-2 transition-all outline-none cursor-pointer ${
            activeTab === 'profile' 
              ? 'text-[#FF6B35] drop-shadow-[0_0_10px_rgba(255,107,53,0.35)] scale-105 font-bold' 
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <User size={20} />
          <span className="text-[10px] uppercase font-bold tracking-[0.1em] mt-1.5">Profile</span>
        </button>
      </nav>
    </div>
  );
}
