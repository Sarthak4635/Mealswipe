import React, { useState } from 'react';
import { ChefHat, Sparkles, AlertCircle, Plus, Flame, Bookmark, ArrowRight } from 'lucide-react';
import { Meal } from '../types';
import { ScrollRevealText } from './ScrollRevealText';

interface KitchenTabProps {
  onAddCustomMealToLiked: (meal: Meal) => void;
  likedMeals: Meal[];
}

export function KitchenTab({ onAddCustomMealToLiked, likedMeals }: KitchenTabProps) {
  const [mood, setMood] = useState('Comfort Food');
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [extraRequest, setExtraRequest] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [craftedMeal, setCraftedMeal] = useState<Meal | null>(null);
  const [error, setError] = useState<string | null>(null);

  const moodsList = [
    'Comfort Food',
    'Spicy Selection',
    'Late Night',
    'Healthy Eats'
  ];

  const handleAddIngredient = () => {
    if (!ingredientInput.trim()) return;
    if (!ingredients.includes(ingredientInput.trim())) {
      setIngredients((prev) => [...prev, ingredientInput.trim()]);
    }
    setIngredientInput('');
  };

  const handleRemoveIngredient = (ing: string) => {
    setIngredients((prev) => prev.filter((i) => i !== ing));
  };

  const handleCraftMeal = async () => {
    setLoading(true);
    setCraftedMeal(null);
    setError(null);
    try {
      const response = await fetch('/api/gemini/suggest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mood: mood,
          ingredients: ingredients.join(', '),
          extraRequest: extraRequest
        }),
      });

      if (!response.ok) {
        throw new Error('Culinary circuit failed to finalize flavor nodes.');
      }

      const data = await response.json();
      
      // Since generated meals might not have an ID, we assign one dynamically
      const fullMeal: Meal = {
        ...data.meal,
        id: `custom-ai-${Date.now()}`,
        image: mood === 'Comfort Food'
          ? 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=80' // Pasta
          : mood === 'Spicy Selection'
          ? 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80' // Spicy Ramen
          : mood === 'Late Night'
          ? 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80' // Burger
          : 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=80', // Dragon Bowl
        rating: 5.0,
        reviews: '1',
      };
      setCraftedMeal(fullMeal);
    } catch (e: any) {
      setError(e.message || 'Sensory assistant caught a culinary block.');
    } finally {
      setLoading(false);
    }
  };

  const isLiked = craftedMeal && likedMeals.some((m) => m.id === craftedMeal.id);

  return (
    <div id="kitchen-container" className="pt-24 pb-32 px-6 w-full max-w-xl mx-auto flex flex-col gap-6 animate-fade-in text-on-surface">
      {/* Editorial Header */}
      <div className="space-y-1">
        <span className="text-[#FF6B35] text-xs font-bold uppercase tracking-[0.2em] flex items-center gap-1.5 justify-center">
          <ChefHat size={14} /> Design Studio
        </span>
        <h1 className="text-3xl font-black text-white text-center tracking-tight leading-none">
          <ScrollRevealText text="Michelin Creator" />
        </h1>
        <p className="text-gray-400 text-xs text-center">
          Collaborate with Gemini to tailor premium recipes to your specific fridge contents and moods.
        </p>
      </div>

      <div className="bg-[#151B2E] border border-white/5 rounded-3xl p-6 shadow-xl space-y-4">
        {/* Mood select selectors */}
        <div>
          <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
            1. Select Culinary Vibe:
          </label>
          <div className="grid grid-cols-2 gap-2">
            {moodsList.map((m) => (
              <button
                key={m}
                onClick={() => setMood(m)}
                className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all duration-300 ${
                  mood === m
                    ? 'bg-[#FF6B35]/15 text-[#FF6B35] border-[#FF6B35]/40 shadow-[0_0_15px_rgba(255,107,53,0.1)]'
                    : 'bg-[#0B1020]/40 text-gray-400 border-white/5 hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Ingredients chip selector */}
        <div>
          <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
            2. Add Ingredients in Fridge:
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. tender mushrooms, lemon, sesame oil"
              value={ingredientInput}
              onChange={(e) => setIngredientInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAddIngredient()}
              className="flex-1 bg-[#0B1020]/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B35] transition-all placeholder:text-gray-500"
            />
            <button
              onClick={handleAddIngredient}
              className="bg-white/10 hover:bg-white/20 text-white p-2.5 rounded-lg active:scale-95 transition-all outline-none"
            >
              <Plus size={16} />
            </button>
          </div>

          {ingredients.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-2">
              {ingredients.map((ing) => (
                <span
                  key={ing}
                  className="bg-white/5 text-gray-300 px-2 rounded-full text-[10px] flex items-center gap-1.5 border border-white/5 font-semibold py-0.5"
                >
                  {ing}
                  <button
                    onClick={() => handleRemoveIngredient(ing)}
                    className="text-gray-500 hover:text-white"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Extra request input */}
        <div>
          <label className="text-white text-xs font-bold uppercase tracking-wider block mb-2">
            3. Master Notes & Personal Flares:
          </label>
          <input
            type="text"
            placeholder="e.g. make it citrus and smoky; keto-friendly"
            value={extraRequest}
            onChange={(e) => setExtraRequest(e.target.value)}
            className="w-full bg-[#0B1020]/40 border border-white/10 rounded-lg p-2.5 text-xs text-white focus:outline-none focus:border-[#FF6B35] transition-all placeholder:text-gray-500"
          />
        </div>

        {/* Action Button */}
        <button
          onClick={handleCraftMeal}
          disabled={loading}
          id="craft-meal-btn"
          className="w-full bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] hover:from-[#FF8C61] hover:to-[#FF6B35] text-white font-bold text-xs uppercase tracking-widest py-4 rounded-full shadow-[0_8px_25px_rgba(255,107,53,0.35)] hover:scale-[1.01] active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-40 disabled:pointer-events-none cursor-pointer border-0"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Sealing flavor layers...</span>
            </>
          ) : (
            <>
              <Sparkles size={14} fill="currentColor" />
              <span>CRAFT CUSTOM DISH</span>
            </>
          )}
        </button>
      </div>

      {/* Error block */}
      {error && (
        <div className="bg-[#ffb4ab]/10 border border-[#ffb4ab]/20 text-[#ffb4ab] rounded-xl p-4 flex gap-2.5 items-start text-xs">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* Generated Meal Result Section */}
      {craftedMeal && (
        <div id="crafted-meal-result" className="bg-[#151B2E] border border-white/10 rounded-3xl p-6 shadow-2xl relative animate-scale-up space-y-4">
          <img
            alt={craftedMeal.name}
            src={craftedMeal.image}
            className="w-full h-48 object-cover rounded-2xl shadow-inner contrast-[1.05]"
          />

          <div className="flex gap-2">
            <span className="bg-[#FFB703]/15 text-[#FFB703] border border-[#FFB703]/25 text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded uppercase">
              AI EXCLUSIVE
            </span>
            {craftedMeal.tags.map((tag, idx) => (
              <span key={idx} className="bg-white/5 text-gray-300 text-[9px] font-black tracking-widest px-2.5 py-0.5 rounded uppercase">
                {tag}
              </span>
            ))}
          </div>

          <div>
            <h2 className="text-2xl font-black text-white">{craftedMeal.name}</h2>
            <p className="text-gray-300 text-xs leading-relaxed mt-1.5">{craftedMeal.description}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 text-xs pt-3 border-t border-white/5">
            <div>
              <span className="text-gray-500 font-bold block mb-1">CRAFT TIME</span>
              <span className="text-white text-sm font-black">{craftedMeal.time}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block mb-1">RATING SCORE</span>
              <span className="text-[#FFB703] text-sm font-black">★ 5.0 (Annointed)</span>
            </div>
          </div>

          {craftedMeal.ingredients && (
            <div>
              <h4 className="text-white text-xs font-bold uppercase tracking-wider mb-2">Dynamic Ingredients:</h4>
              <div className="flex flex-wrap gap-1.5">
                {craftedMeal.ingredients.map((ing, k) => (
                  <span key={k} className="bg-white/5 text-gray-300 px-2.5 py-0.5 rounded-full text-[10px] border border-white/5">
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Dynamic Flavor footprint stats sliders */}
          <div className="space-y-3 pt-3 border-t border-white/5">
            <h4 className="text-white text-[10px] font-black uppercase tracking-widest">Designed Taste Metrics:</h4>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-[11px] text-gray-400 mb-0.5">
                  <span className="font-semibold">Spicy Power</span>
                  <span className="text-[#FF6B35] font-bold">{craftedMeal.spiceLevel}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#0B1020] rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 rounded-full" style={{ width: `${craftedMeal.spiceLevel}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-gray-400 mb-0.5">
                  <span className="font-semibold">Savory Depth</span>
                  <span className="text-[#FF6B35] font-bold">{craftedMeal.savoryLevel}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#0B1020] rounded-full overflow-hidden">
                  <div className="h-full bg-blue-400 rounded-full" style={{ width: `${craftedMeal.savoryLevel}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-gray-400 mb-0.5">
                  <span className="font-semibold">Sweet Accents</span>
                  <span className="text-[#FF6B35] font-bold">{craftedMeal.sweetLevel}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#0B1020] rounded-full overflow-hidden">
                  <div className="h-full bg-green-400 rounded-full" style={{ width: `${craftedMeal.sweetLevel}%` }} />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-[11px] text-gray-400 mb-0.5">
                  <span className="font-semibold">Umami Density</span>
                  <span className="text-[#FF6B35] font-bold">{craftedMeal.umamiLevel}%</span>
                </div>
                <div className="h-1.5 w-full bg-[#0B1020] rounded-full overflow-hidden">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: `${craftedMeal.umamiLevel}%` }} />
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => onAddCustomMealToLiked(craftedMeal)}
            disabled={isLiked}
            className={`w-full py-4 rounded-full text-xs font-black uppercase tracking-wider mt-4 flex items-center justify-center gap-2 transition-all cursor-pointer border-0 ${
              isLiked 
                ? 'bg-white/5 text-[#22C55E] border border-[#22C55E]/10 cursor-default'
                : 'bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] text-white shadow-md shadow-[#FF6B35]/20 hover:shadow-[0_4px_15px_rgba(255,107,53,0.35)]'
            }`}
          >
            <Bookmark size={14} fill={isLiked ? "currentColor" : "none"} />
            {isLiked ? 'ADDED TO CONCIERGE LIST' : 'SAVE TO SAVED MEALS'}
          </button>
        </div>
      )}
    </div>
  );
}
