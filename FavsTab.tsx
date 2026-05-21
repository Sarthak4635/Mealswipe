import React, { useState } from 'react';
import { Bookmark, Heart, Trash2, Search, SlidersHorizontal, Info, X } from 'lucide-react';
import { motion } from 'motion/react';
import { Meal } from '../types';
import { ScrollRevealText } from './ScrollRevealText';

interface FavsTabProps {
  likedMeals: Meal[];
  onRemoveLikedMeal: (mealId: string) => void;
}

export function FavsTab({ likedMeals, onRemoveLikedMeal }: FavsTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [activeDetailMeal, setActiveDetailMeal] = useState<Meal | null>(null);

  // Collect all unique tags for filter tabs
  const allTags = Array.from(
    new Set(likedMeals.flatMap((m) => m.tags))
  );

  const filteredMeals = likedMeals.filter((meal) => {
    const matchesSearch = meal.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          meal.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = selectedTag ? meal.tags.includes(selectedTag) : true;
    
    return matchesSearch && matchesTag;
  });

  return (
    <div id="favorites-container" className="pt-24 pb-32 px-6 w-full max-w-4xl mx-auto animate-fade-in text-on-surface">
      
      {/* Title */}
      <div className="flex justify-between items-end mb-6">
        <div>
          <span className="text-[#FF6B35] text-xs font-bold uppercase tracking-[0.2em] block mb-1">
            Curated Collects
          </span>
          <h2 className="text-3xl font-black text-white tracking-tight">
            <ScrollRevealText text="Saved Connoisseur Meals" />
          </h2>
        </div>
        <span className="text-gray-400 text-xs font-medium bg-[#151B2E] border border-white/5 px-3.5 py-1.5 rounded-full">
          {likedMeals.length} saved
        </span>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          <input
            type="text"
            placeholder="Search saved dishes by name or style..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#151B2E] border border-white/5 rounded-2xl pl-12 pr-4 py-3 text-xs text-white placeholder:text-gray-500 focus:outline-none focus:border-[#FF6B35]/45 transition-all"
          />
        </div>

        {allTags.length > 0 && (
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedTag(null)}
              className={`py-1.5 px-3 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border-0 cursor-pointer ${
                selectedTag === null ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white shadow shadow-[#FF6B35]/20' : 'bg-white/5 text-gray-400 hover:text-white'
              }`}
            >
              All Types
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`py-1.5 px-3.5 rounded-full text-[10px] font-black uppercase tracking-wider transition-all duration-300 border-0 cursor-pointer ${
                  selectedTag === tag ? 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white shadow shadow-[#FF6B35]/20' : 'bg-white/5 text-gray-400 hover:text-white'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid of saves */}
      {filteredMeals.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMeals.map((meal, idx) => (
            <motion.div
              key={meal.id}
              initial={{ opacity: 0, scale: 0.95, y: 35 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.05, ease: "easeOut" }}
              className="group relative aspect-[3/4] rounded-3xl overflow-hidden bg-[#151B2E]/40 border border-white/5 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:border-[#FF6B35]/35 hover:shadow-[#FF6B35]/5"
            >
              {/* Card Photo */}
              <img
                alt={meal.name}
                src={meal.image}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent z-10" />

              {/* Action Key Triggers Overlays */}
              <div className="absolute top-4 right-4 z-20 flex gap-2">
                <button
                  onClick={() => setActiveDetailMeal(meal)}
                  className="bg-black/40 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#FF6B35]/20 hover:text-[#FF6B35] transition-all cursor-pointer"
                  title="Detail view"
                >
                  <Info size={14} />
                </button>
                <button
                  onClick={() => onRemoveLikedMeal(meal.id)}
                  className="bg-black/40 backdrop-blur-md p-2 rounded-full text-gray-400 hover:bg-red-500/20 hover:text-[#ffb4ab] transition-all cursor-pointer"
                  title="Remove from Saved"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Bottom text description */}
              <div className="absolute bottom-0 left-0 p-6 w-full space-y-2 z-20">
                <div className="flex gap-1.5 flex-wrap">
                  {meal.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-[#FF6B35]/20 text-[#FF6B35] border border-[#FF6B35]/15 text-[9px] font-bold px-2 py-0.5 rounded tracking-widest uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-lg font-extrabold text-white leading-tight">{meal.name}</h3>
                <p className="text-gray-300 text-[11px] leading-relaxed line-clamp-2">
                  {meal.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-[#151B2E] border border-white/5 rounded-3xl">
          <Bookmark className="mx-auto text-gray-500 mb-3" size={32} />
          <h3 className="text-white font-bold text-lg">No saved culinary matches found</h3>
          <p className="text-gray-400 text-xs mt-1 max-w-sm mx-auto">
            Swipe right on matches in the Swipe deck, or craft Michelin suggestions inside the Kitchen tab!
          </p>
        </div>
      )}

      {/* Details modal popup */}
      {activeDetailMeal && (
        <div className="fixed inset-0 z-50 bg-[#0B1020]/80 backdrop-blur-lg flex items-center justify-center p-6">
          <div className="bg-[#151B2E] border border-white/10 w-full max-w-md rounded-3xl p-6 relative max-h-[85vh] overflow-y-auto shadow-2xl scrollbar-none">
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

            {/* Flavor attributes progress bars */}
            <div className="space-y-2 pt-2 border-t border-white/5">
              <h4 className="text-white text-xs font-bold uppercase tracking-wider">Flavor Footprint:</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <div className="flex justify-between text-gray-400 mb-0.5">
                    <span>Spicy Power</span>
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
          </div>
        </div>
      )}
    </div>
  );
}
