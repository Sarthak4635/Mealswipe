import { ArrowRight, Flame, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { Meal } from '../types';
import { ScrollRevealText } from './ScrollRevealText';
import { FreshnessHero } from './FreshnessHero';
import { TonightSignatureColumns } from './TonightSignatureColumns';

interface ExploreTabProps {
  onStartSwiping: (category?: string) => void;
  onExploreCocktail: () => void;
  onAddSpecialToLiked: (meal: Meal) => void;
  likedMeals: Meal[];
  meals: Meal[];
}

export function ExploreTab({ 
  onStartSwiping, 
  onExploreCocktail, 
  onAddSpecialToLiked, 
  likedMeals, 
  meals 
}: ExploreTabProps) {
  const moods = [
    {
      title: 'Comfort Food',
      subtitle: 'Classic',
      image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&auto=format&fit=crop&q=80',
      categoryName: 'Comfort Food'
    },
    {
      title: 'Spicy Selection',
      subtitle: 'Heat',
      image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
      categoryName: 'Spicy Selection'
    },
    {
      title: 'Late Night',
      subtitle: 'Midnight',
      image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&auto=format&fit=crop&q=80',
      categoryName: 'Late Night'
    },
    {
      title: 'Healthy Eats',
      subtitle: 'Fresh',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
      categoryName: 'Healthy Eats'
    }
  ];

  return (
    <div className="pb-32 w-full animate-fade-in bg-[#0B1020]">
      {/* 
        PREMIUM DYNAMIC SPLIT HERO BANNER
        Adapted directly from high-end restaurant layout
      */}
      <section className="px-4 sm:px-6 md:px-12 lg:px-20 pt-24 pb-12 w-full max-w-7xl mx-auto">
        <FreshnessHero onStartSwiping={onStartSwiping} onExploreCocktail={onExploreCocktail} />
      </section>

      {/* Mood Categories with elegant text scroll reveal */}
      <section className="relative z-20 px-6 md:px-20 mt-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <span className="text-[#FF6B35] text-xs font-semibold tracking-widest uppercase block mb-1">Discover</span>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              <ScrollRevealText text="Choose Your Mood" />
            </h3>
          </div>
          <button
            onClick={() => onStartSwiping()}
            className="text-gray-400 text-sm hover:text-[#FF6B35] transition-colors"
          >
            See all
          </button>
        </div>

        {/* Stable horizontal scroll list, with simple entry fade to avoid horizontal snapping bugs */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-none snap-x">
          {moods.map((mood, idx) => (
            <motion.div
              key={idx}
              id={`mood-${idx}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              onClick={() => onStartSwiping(mood.categoryName)}
              className="flex-shrink-0 w-72 h-[340px] rounded-2xl overflow-hidden glass-card snap-start group relative cursor-pointer border border-white/5 bg-[#151B2E]/40 backdrop-blur-md transition-all duration-500 hover:border-[#FF6B35]/40 hover:shadow-[0_0_25px_rgba(255,107,53,0.15)] animate-fade-in"
            >
              <img
                alt={mood.title}
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 brightness-90"
                src={mood.image}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1020] via-transparent to-transparent opacity-95 z-10" />
              <div className="absolute bottom-0 left-0 p-6 w-full z-20">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#FF6B35]/90 uppercase block mb-1">
                  {mood.subtitle}
                </span>
                <h4 className="text-xl font-bold text-white tracking-tight">
                  <ScrollRevealText text={mood.title} delay={0.1 * idx} />
                </h4>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 
        EXPANDING COLUMN SIGNATURE PANEL
        Rendered as an organic editorial feature in the explore timeline
      */}
      <section className="px-6 md:px-20 max-w-7xl mx-auto">
        <TonightSignatureColumns onAddSpecialToLiked={onAddSpecialToLiked} likedMeals={likedMeals} />
      </section>

      {/* Featured Special Cocktail Section */}
      <section className="mt-16 px-6 md:px-20 max-w-7xl mx-auto">
        <h3 className="text-2xl font-bold text-white tracking-tight mb-6">
          <ScrollRevealText text="Tonight's Special Lounge" />
        </h3>
        
        <motion.div
          id="tonights-special-card"
          onClick={onExploreCocktail}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.6 }}
          className="w-full aspect-video md:aspect-[21/9] rounded-3xl overflow-hidden relative glass-card group cursor-pointer border border-white/5 bg-[#151B2E]/40 backdrop-blur-md transition-all duration-500 ease-out hover:scale-[1.02]"
        >
          <img
            alt="Featured Cocktail"
            className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-1000"
            src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=1000&auto=format&fit=crop&q=80"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/75 to-transparent flex flex-col justify-center p-6 md:p-12 z-20">
            <div className="max-w-md">
              <span className="bg-[#FF6B35]/15 text-[#FF6B35] border border-[#FF6B35]/30 px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase mb-4 inline-block">
                Curated
              </span>
              <h2 className="text-2xl md:text-4xl font-extrabold text-black mb-2 leading-none">
                <ScrollRevealText text="The Liquid Gold Lounge" />
              </h2>
              <p className="text-gray-800 text-sm md:text-base font-medium leading-relaxed mb-6">
                Discover our exclusive partners offering late-night mixology and small plates for the night owls.
              </p>
              <button className="bg-black text-white px-8 py-3.5 rounded-full text-xs font-bold hover:bg-[#FF6B35] hover:text-white transition-all duration-300 shadow-md hover:shadow-[0_8px_20px_rgba(255,107,53,0.35)]">
                Explore Experience
              </button>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
