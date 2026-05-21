export interface Meal {
  id: string;
  name: string;
  image: string;
  tags: string[];
  time: string;
  rating: number;
  reviews: string;
  description: string;
  category: string;
  ingredients?: string[];
  spiceLevel: number;   // 0 - 100
  savoryLevel: number;  // 0 - 100
  sweetLevel: number;   // 0 - 100
  umamiLevel: number;   // 0 - 100
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide class name
  active: boolean;
}

export interface ProfileStats {
  swipesThisMonth: number;
  kcalExplored: string;
  swipeDistance: string;
  spicyTolerance: string;
  newCuisines: number;
  spicyPercent: number;
  savoryPercent: number;
  sweetPercent: number;
  umamiPercent: number;
}
