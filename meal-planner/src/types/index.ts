// User preferences and dietary information
export interface UserPreferences {
  dietaryRestrictions: string[];
  allergies: string[];
  cuisinePreferences: string[];
  calorieTarget?: number;
  macroTargets?: {
    protein: number;
    carbs: number;
    fat: number;
  };
}

// Nutritional information for ingredients and recipes
export interface NutritionInfo {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
  fiber?: number;
  sugar?: number;
}

// Ingredient with quantity
export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  category: string;
  nutrition?: NutritionInfo;
}

// Recipe information
export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // in minutes
  cookTime: number; // in minutes
  servings: number;
  nutrition: NutritionInfo;
  tags: string[];
  image?: string;
}

// Meal type enumeration
export enum MealType {
  Breakfast = 'breakfast',
  Lunch = 'lunch',
  Dinner = 'dinner',
  Snack = 'snack'
}

// Meal plan for a specific day
export interface DailyMealPlan {
  date: string;
  meals: {
    [key in MealType]?: Recipe[];
  };
  totalNutrition: NutritionInfo;
}

// Weekly meal plan
export interface WeeklyMealPlan {
  id: string;
  startDate: string;
  endDate: string;
  days: DailyMealPlan[];
  shoppingList: Ingredient[];
}

// Shopping list item
export interface ShoppingListItem extends Ingredient {
  checked: boolean;
}