import { Meal } from './types';

// Cache structure for MealDB to avoid redundant network hits
const CACHE_KEY = 'mealswipe_mealdb_cache_v1';

// Detailed mapping of MealDB API keys to Meal schema
export function mapMealDBToMeal(m: any): Meal {
  const id = m.idMeal || `mealdb-${Math.random().toString(36).substr(2, 9)}`;
  const name = m.strMeal || 'Gourmet Selection';
  const image = m.strMealThumb || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';
  
  // Clean up ingredients
  const ingredients: string[] = [];
  for (let i = 1; i <= 20; i++) {
    const ing = m[`strIngredient${i}`];
    const msr = m[`strMeasure${i}`];
    if (ing && ing.trim()) {
      const cleanIng = ing.trim();
      const cleanMsr = msr ? msr.trim() : '';
      const text = cleanMsr ? `${cleanMsr} ${cleanIng}` : cleanIng;
      // Capitalize first letters elegantly
      ingredients.push(text.charAt(0).toUpperCase() + text.slice(1));
    }
  }

  // Derive core category mappings
  const rawCat = m.strCategory || 'Miscellaneous';
  let category = 'Comfort Food';
  
  // Flavor heuristics based on database categories and ingredients
  let spiceLevel = 10;
  let savoryLevel = 60;
  let sweetLevel = 20;
  let umamiLevel = 70;

  const lowercaseName = name.toLowerCase();
  const lowercaseCat = rawCat.toLowerCase();
  const ingredientString = ingredients.join(' ').toLowerCase();

  // 1. Spicy Selection heuristics
  const spicyKeywords = ['spicy', 'chili', 'curry', 'pepper', 'jalapeno', 'sriracha', 'arrabbiata', 'szechuan', 'mustard', 'wasabi', 'jerk', 'diablo', 'fiery', 'clove', 'ginger'];
  const isSpicy = spicyKeywords.some(kw => lowercaseName.includes(kw) || ingredientString.includes(kw) || lowercaseCat.includes(kw));
  if (isSpicy) {
    category = 'Spicy Selection';
    spiceLevel = 75 + (parseInt(id) % 21); // 75 - 95
  }

  // 2. Healthy Eats heuristics
  const healthyCats = ['vegetarian', 'vegan', 'seafood'];
  const healthyKeywords = ['salad', 'healthy', 'fresh', 'raw', 'keto', 'quinoa', 'avocado', 'spinach', 'broccoli'];
  const isHealthy = healthyCats.some(c => lowercaseCat.includes(c)) || healthyKeywords.some(kw => lowercaseName.includes(kw));
  if (isHealthy && category !== 'Spicy Selection') {
    category = 'Healthy Eats';
    savoryLevel = 30 + (parseInt(id) % 25);
    sweetLevel = 15 + (parseInt(id) % 20);
    umamiLevel = 50 + (parseInt(id) % 20);
  }

  // 3. Late Night heuristics
  const lateNightCats = ['dessert', 'side', 'starter', 'breakfast'];
  const lateNightKeywords = ['cake', 'cookie', 'sweet', 'tart', 'pie', 'chocolate', 'fries', 'tapas', 'bites', 'midnight'];
  const isLateNight = lateNightCats.some(c => lowercaseCat.includes(c)) || lateNightKeywords.some(kw => lowercaseName.includes(kw));
  if (isLateNight && category !== 'Spicy Selection' && category !== 'Healthy Eats') {
    category = 'Late Night';
    if (lowercaseCat === 'dessert') {
      sweetLevel = 80 + (parseInt(id) % 16); // 80 - 95
      savoryLevel = 10 + (parseInt(id) % 15);
      umamiLevel = 20 + (parseInt(id) % 15);
    } else {
      savoryLevel = 65 + (parseInt(id) % 20);
      umamiLevel = 60 + (parseInt(id) % 20);
    }
  }

  // Fallback defaults for remaining categories (Beef, Pork, Chicken, Pasta, Lamb, Goat, Miscellaneous)
  if (category === 'Comfort Food') {
    savoryLevel = 75 + (parseInt(id) % 21); // 75 - 95
    umamiLevel = 80 + (parseInt(id) % 16);  // 80 - 95
    spiceLevel = 5 + (parseInt(id) % 15);    // 5 - 20
  }

  // Split tags elegantly or create premium tag representations
  let tags: string[] = [];
  if (m.strTags && m.strTags.trim()) {
    tags = m.strTags.split(',').map((t: string) => t.trim().toUpperCase());
  } else {
    // Elegant tags based on recipe variables
    tags = [rawCat.toUpperCase()];
    if (isSpicy) tags.push('SPICY HEAT');
    if (isHealthy) tags.push('FRESH');
    if (category === 'Comfort Food') tags.push('RICH');
    if (category === 'Late Night') tags.push('INDULGENT');
  }
  // Cap tags count at 3 for elegant card layouts
  tags = tags.filter(Boolean).slice(0, 3);

  // Consistency mock stats
  const time = `${15 + (parseInt(id) % 26)} min`;
  const rating = parseFloat((4.5 + (parseInt(id) % 5) / 10).toFixed(1));
  const reviews = `${120 + (parseInt(id) % 880)}`;

  // Trim instructions beautifully for cards
  const rawDesc = m.strInstructions || 'An exquisite, hand-selected recipe crafted to awaken your culinary senses.';
  const description = rawDesc.replace(/\s+/g, ' ').substring(0, 160).trim() + '...';

  return {
    id,
    name,
    image,
    tags,
    time,
    rating,
    reviews,
    description,
    category,
    ingredients,
    spiceLevel,
    savoryLevel,
    sweetLevel,
    umamiLevel
  };
}

// Fetch complete list of detailed meals from MealDB starting letters
export async function getLiveMealDBData(): Promise<Meal[]> {
  // Check if cache is present in local storage
  const cached = localStorage.getItem(CACHE_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        console.log(`[MealSwipe-MealDB] Loaded ${parsed.length} cached meals successfully.`);
        return parsed;
      }
    } catch (e) {
      console.warn('Stale cache, refetching from MealDB API...', e);
    }
  }

  // Letters to fetch to compile a dynamic rich library
  const searchLetters = ['c', 's', 'p', 'm', 'b']; // Chicken, Seafood, Pork/Pasta, Mutton/Mixed, Beef
  const mealsAggregator: Meal[] = [];
  const idsTracker = new Set<string>();

  try {
    const fetchPromises = searchLetters.map(letter => 
      fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${letter}`)
        .then(res => res.json())
        .catch(() => ({ meals: null }))
    );

    const results = await Promise.all(fetchPromises);

    for (const data of results) {
      if (data && Array.isArray(data.meals)) {
        for (const rawMeal of data.meals) {
          if (rawMeal && rawMeal.idMeal && !idsTracker.has(rawMeal.idMeal)) {
            idsTracker.add(rawMeal.idMeal);
            mealsAggregator.push(mapMealDBToMeal(rawMeal));
          }
        }
      }
    }

    // Sort by id for consistence
    mealsAggregator.sort((a, b) => parseInt(a.id) - parseInt(b.id));

    if (mealsAggregator.length > 0) {
      localStorage.setItem(CACHE_KEY, JSON.stringify(mealsAggregator));
      console.log(`[MealSwipe-MealDB] Fetched ${mealsAggregator.length} live recipes successfully and cached.`);
      return mealsAggregator;
    }
  } catch (error) {
    console.error('[MealSwipe-MealDB] Live fetching failed:', error);
  }

  // Fallback to static or query random if nothing loaded
  return [];
}
