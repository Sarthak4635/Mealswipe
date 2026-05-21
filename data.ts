import { Meal, Achievement, ProfileStats } from './types';

export const MEALS_DATA: Meal[] = [
  {
    id: 'pizza-1',
    name: 'Artisan Wood-Fired Pizza',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&auto=format&fit=crop&q=80',
    tags: ['ITALIAN', 'CHEESY'],
    time: '15 min',
    rating: 4.9,
    reviews: '1.2k',
    description: 'Bubbling mozzarella, vibrant San Marzano tomato sauce, and fresh organic basil leaves on a charred, slow-fermented, wood-fired sourdough crust.',
    category: 'Comfort Food',
    ingredients: ['Sourdough', 'San Marzano Tomatoes', 'Fresh Mozzarella', 'Extra Virgin Olive Oil', 'Organic Basil'],
    spiceLevel: 10,
    savoryLevel: 80,
    sweetLevel: 25,
    umamiLevel: 75
  },
  {
    id: 'burger-1',
    name: 'Premium Wagyu Gourmet Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&auto=format&fit=crop&q=80',
    tags: ['PREMIUM BEEF', 'SAVORY'],
    time: '20 min',
    rating: 4.8,
    reviews: '2.4k',
    description: 'A towering, perfectly seared prime Wagyu beef patty topped with oozing aged cheddar, caramelized onions, crisp butter lettuce, and a decadent black truffle aioli on a toasted artisanal brioche bun.',
    category: 'Late Night',
    ingredients: ['A5 Wagyu Beef', 'Aged Cheddar', 'Caramelized Onion', 'Truffle Aioli', 'Brioche Bun'],
    spiceLevel: 15,
    savoryLevel: 95,
    sweetLevel: 30,
    umamiLevel: 85
  },
  {
    id: 'ramen-spicy',
    name: 'Spicy Tonkotsu Ramen',
    image: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&auto=format&fit=crop&q=80',
    tags: ['ARTISANAL BROTH', 'SPICY'],
    time: '18 min',
    rating: 4.9,
    reviews: '1.8k',
    description: 'Creamy high-collagen pork bone broth infused with a signature roasted chili paste, served with thick organic alkaline noodles, soy-marinated soft egg, and tender slow-braised chashu pork belly.',
    category: 'Spicy Selection',
    ingredients: ['Tonkotsu Broth', 'Braised Chashu', 'Ramen Noodles', 'Ajitama Egg', 'House Chili Blend', 'Scallions'],
    spiceLevel: 85,
    savoryLevel: 90,
    sweetLevel: 10,
    umamiLevel: 95
  },
  {
    id: 'truffle-tagliatelle',
    name: 'Black Truffle Tagliatelle',
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023714a?w=600&auto=format&fit=crop&q=80',
    tags: ['UMAMI', 'ITALIAN'],
    time: '25 min',
    rating: 4.9,
    reviews: '900',
    description: 'House-made fresh egg tagliatelle tossed in a rich, slow-simmered Parmigiano-Reggiano cream sauce, topped generously with paper-thin shavings of fresh seasonal black truffles.',
    category: 'Comfort Food',
    ingredients: ['Fresh Tagliatelle', 'Parmigiano-Reggiano', 'Black Truffle Shavings', 'Grass-Fed Butter', 'White Wine'],
    spiceLevel: 5,
    savoryLevel: 85,
    sweetLevel: 15,
    umamiLevel: 100
  },
  {
    id: 'smoked-brisket',
    name: 'Oaky Smoked Beef Brisket',
    image: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?w=600&auto=format&fit=crop&q=80',
    tags: ['BOLD', 'BBQ'],
    time: '30 min',
    rating: 4.8,
    reviews: '1.5k',
    description: 'USDA Prime beef brisket rubbed with a custom black pepper and salt blend, slow-smoked for 18 hours over hickory and white oak logs until incredibly tender and juicy with a beautiful bark.',
    category: 'Late Night',
    ingredients: ['Prime Beef Brisket', 'Black Pepper Rub', 'Hickory Smoke', 'House BBQ Glaze'],
    spiceLevel: 25,
    savoryLevel: 95,
    sweetLevel: 20,
    umamiLevel: 90
  },
  {
    id: 'dragon-bowl',
    name: 'Neon Dragon Bowl',
    image: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?w=600&auto=format&fit=crop&q=80',
    tags: ['FRESH', 'ASIAN'],
    time: '12 min',
    rating: 4.7,
    reviews: '850',
    description: 'A breathtaking, superfood-packed breakfast bowl base of organic pink dragon fruit and yuzu, beautifully adorned with fresh blackberries, starfruit slices, organic local berries, and edible gold leaf.',
    category: 'Healthy Eats',
    ingredients: ['Pink Dragon Fruit', 'Yuzu Zest', 'Organic Blackberries', 'Starfruit', 'Edible Gold Leaf', 'Chia Seeds'],
    spiceLevel: 0,
    savoryLevel: 10,
    sweetLevel: 85,
    umamiLevel: 20
  },
  {
    id: 'ramen-comfort',
    name: 'Warm Shoyu Comfort Ramen',
    image: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=600&auto=format&fit=crop&q=80',
    tags: ['CLASSIC', 'COMFORT'],
    time: '20 min',
    rating: 4.8,
    reviews: '1.1k',
    description: 'Steaming house-crafted clear chicken broth layered with a deep, aged soy sauce tare, topped with melt-in-your-mouth slow-braised pork belly chashu, tender bamboo shoots, and perfectly crimped wavy noodles.',
    category: 'Comfort Food',
    ingredients: ['Shoyu Chicken Broth', 'Pork Chashu', 'Nori Sheets', 'Menma', 'Alkaline Noodles'],
    spiceLevel: 10,
    savoryLevel: 88,
    sweetLevel: 15,
    umamiLevel: 90
  },
  {
    id: 'szechuan-spicy',
    name: 'Szechuan Fire Pepper Wok',
    image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&auto=format&fit=crop&q=80',
    tags: ['INTENSE HEAT', 'WOK-FIRED'],
    time: '15 min',
    rating: 4.6,
    reviews: '720',
    description: 'A fiery, crackling blend of dried red lantern chilies, raw Szechuan peppercorns, scallions, and tender chicken cubes stir-fried in a blazing hot cast-iron wok with hand-pressed chili oil.',
    category: 'Spicy Selection',
    ingredients: ['Chicken Breast', 'Szechuan Peppercorns', 'Dried Lantern Chilies', 'House Hot Chili Oil', 'Peanuts'],
    spiceLevel: 95,
    savoryLevel: 80,
    sweetLevel: 5,
    umamiLevel: 75
  },
  {
    id: 'late-night-burger',
    name: 'Neon Midnight Burger & Fries',
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&auto=format&fit=crop&q=80',
    tags: ['MIDNIGHT', 'INDULGENT'],
    time: '20 min',
    rating: 4.8,
    reviews: '3.1k',
    description: 'The ultimate late-night salvation: a double-stack flat-top smashed brisket patty burger, extra cheddar, crispy golden russet fries, served under the warm buzz of urban neon vibes.',
    category: 'Late Night',
    ingredients: ['Double Smashed Beef Pat', 'Thick Cheddar Cheese', 'Russet Potatoes', 'Special Sauce', 'Soft Sesame Bun'],
    spiceLevel: 20,
    savoryLevel: 90,
    sweetLevel: 25,
    umamiLevel: 80
  },
  {
    id: 'fresh-poke-bowl',
    name: 'Tropical Salmon Poke Bowl',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80',
    tags: ['FRESH', 'HEALTHY'],
    time: '10 min',
    rating: 4.7,
    reviews: '1.4k',
    description: 'Pristine raw cubed Atlantic salmon, ripe avocado, sea salt, cucumber ribbons, and fresh cilantro, arranged on a bed of seasoned steamed jasmine rice with a light ponzu citrus dressing.',
    category: 'Healthy Eats',
    ingredients: ['Fresh Salmon', 'Avocado', 'English Cucumber', 'Ponzu Glaze', 'Jasmine Rice', 'Sesame Seeds'],
    spiceLevel: 5,
    savoryLevel: 45,
    sweetLevel: 40,
    umamiLevel: 70
  }
];

export const ACHIEVEMENTS_DATA: Achievement[] = [
  {
    id: 'legend-1',
    title: 'Late Night Legend',
    description: 'Active 11PM - 3AM',
    icon: 'Moon',
    active: true
  },
  {
    id: 'seeker-1',
    title: 'Spice Seeker',
    description: '42 Ghost Pepper Hits',
    icon: 'Flame',
    active: true
  },
  {
    id: 'connoisseur-1',
    title: 'The Connoisseur',
    description: 'Top 1% Reviewer',
    icon: 'Sparkles',
    active: true
  },
  {
    id: 'citizen-1',
    title: 'Global Citizen',
    description: '12 Cuisines Swiped',
    icon: 'Globe',
    active: true
  }
];

export const INITIAL_STATS: ProfileStats = {
  swipesThisMonth: 142,
  kcalExplored: '12.4k',
  swipeDistance: '3.2m',
  spicyTolerance: '85%',
  newCuisines: 14,
  spicyPercent: 80,
  savoryPercent: 60,
  sweetPercent: 20,
  umamiPercent: 75
};
