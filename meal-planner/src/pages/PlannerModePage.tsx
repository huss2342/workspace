import { useState } from 'react';
import { UserPreferences, WeeklyMealPlan, DailyMealPlan, MealType, ShoppingListItem } from '../types';
import RecipeCard from '../components/RecipeCard';
import ShoppingList from '../components/ShoppingList';
import { aiService } from '../services/aiService';

// Mock data for demonstration
const mockWeeklyPlan: WeeklyMealPlan = {
  id: '1',
  startDate: '2025-04-07',
  endDate: '2025-04-13',
  days: [
    {
      date: '2025-04-07',
      meals: {
        [MealType.Breakfast]: [
          {
            id: '101',
            name: 'Greek Yogurt Parfait',
            description: 'Creamy yogurt with berries and granola.',
            ingredients: [
              { id: '1001', name: 'Greek yogurt', quantity: 1, unit: 'cup', category: 'Dairy' },
              { id: '1002', name: 'Mixed berries', quantity: 0.5, unit: 'cup', category: 'Fruits' },
              { id: '1003', name: 'Granola', quantity: 0.25, unit: 'cup', category: 'Grains' },
              { id: '1004', name: 'Honey', quantity: 1, unit: 'tbsp', category: 'Other' },
            ],
            instructions: [
              'Add yogurt to a bowl or glass.',
              'Top with berries and granola.',
              'Drizzle with honey.',
            ],
            prepTime: 5,
            cookTime: 0,
            servings: 1,
            nutrition: {
              calories: 320,
              protein: 20,
              carbs: 45,
              fat: 8,
            },
            tags: ['Breakfast', 'High Protein', 'Quick'],
          },
        ],
        [MealType.Lunch]: [
          {
            id: '102',
            name: 'Chicken Caesar Salad',
            description: 'Classic Caesar salad with grilled chicken.',
            ingredients: [
              { id: '1005', name: 'Chicken breast', quantity: 1, unit: 'piece', category: 'Protein' },
              { id: '1006', name: 'Romaine lettuce', quantity: 2, unit: 'cup', category: 'Vegetables' },
              { id: '1007', name: 'Parmesan cheese', quantity: 2, unit: 'tbsp', category: 'Dairy' },
              { id: '1008', name: 'Caesar dressing', quantity: 2, unit: 'tbsp', category: 'Condiments' },
              { id: '1009', name: 'Croutons', quantity: 0.25, unit: 'cup', category: 'Grains' },
            ],
            instructions: [
              'Season and grill chicken breast until cooked through.',
              'Chop romaine lettuce and place in a bowl.',
              'Slice chicken and add to the salad.',
              'Top with parmesan cheese and croutons.',
              'Drizzle with Caesar dressing.',
            ],
            prepTime: 10,
            cookTime: 15,
            servings: 1,
            nutrition: {
              calories: 420,
              protein: 35,
              carbs: 15,
              fat: 22,
            },
            tags: ['Lunch', 'High Protein', 'Salad'],
          },
        ],
        [MealType.Dinner]: [
          {
            id: '103',
            name: 'Baked Salmon with Roasted Vegetables',
            description: 'Herb-crusted salmon with colorful roasted vegetables.',
            ingredients: [
              { id: '1010', name: 'Salmon fillet', quantity: 1, unit: 'piece', category: 'Protein' },
              { id: '1011', name: 'Broccoli', quantity: 1, unit: 'cup', category: 'Vegetables' },
              { id: '1012', name: 'Bell pepper', quantity: 1, unit: 'medium', category: 'Vegetables' },
              { id: '1013', name: 'Olive oil', quantity: 1, unit: 'tbsp', category: 'Oils' },
              { id: '1014', name: 'Lemon', quantity: 0.5, unit: 'medium', category: 'Fruits' },
              { id: '1015', name: 'Dill', quantity: 1, unit: 'tsp', category: 'Spices' },
              { id: '1016', name: 'Salt', quantity: 0.5, unit: 'tsp', category: 'Spices' },
              { id: '1017', name: 'Black pepper', quantity: 0.25, unit: 'tsp', category: 'Spices' },
            ],
            instructions: [
              'Preheat oven to 400°F (200°C).',
              'Season salmon with salt, pepper, and dill.',
              'Cut vegetables into bite-sized pieces and toss with olive oil, salt, and pepper.',
              'Place salmon and vegetables on a baking sheet.',
              'Bake for 15-20 minutes until salmon is cooked through and vegetables are tender.',
              'Squeeze lemon over salmon before serving.',
            ],
            prepTime: 15,
            cookTime: 20,
            servings: 1,
            nutrition: {
              calories: 480,
              protein: 40,
              carbs: 20,
              fat: 25,
            },
            tags: ['Dinner', 'High Protein', 'Healthy'],
          },
        ],
        [MealType.Snack]: [
          {
            id: '104',
            name: 'Apple with Almond Butter',
            description: 'Simple and satisfying snack.',
            ingredients: [
              { id: '1018', name: 'Apple', quantity: 1, unit: 'medium', category: 'Fruits' },
              { id: '1019', name: 'Almond butter', quantity: 1, unit: 'tbsp', category: 'Other' },
            ],
            instructions: [
              'Slice apple into wedges.',
              'Serve with almond butter for dipping.',
            ],
            prepTime: 2,
            cookTime: 0,
            servings: 1,
            nutrition: {
              calories: 180,
              protein: 4,
              carbs: 25,
              fat: 9,
            },
            tags: ['Snack', 'Quick', 'Healthy'],
          },
        ],
      },
      totalNutrition: {
        calories: 1400,
        protein: 99,
        carbs: 105,
        fat: 64,
      },
    },
    // Additional days would be added here in a real app
  ],
  shoppingList: [
    { id: '2001', name: 'Greek yogurt', quantity: 7, unit: 'cup', category: 'Dairy', checked: false },
    { id: '2002', name: 'Mixed berries', quantity: 3.5, unit: 'cup', category: 'Fruits', checked: false },
    { id: '2003', name: 'Granola', quantity: 1.75, unit: 'cup', category: 'Grains', checked: false },
    { id: '2004', name: 'Honey', quantity: 7, unit: 'tbsp', category: 'Other', checked: false },
    { id: '2005', name: 'Chicken breast', quantity: 7, unit: 'piece', category: 'Protein', checked: false },
    { id: '2006', name: 'Romaine lettuce', quantity: 2, unit: 'head', category: 'Vegetables', checked: false },
    { id: '2007', name: 'Parmesan cheese', quantity: 1, unit: 'cup', category: 'Dairy', checked: false },
    { id: '2008', name: 'Caesar dressing', quantity: 1, unit: 'bottle', category: 'Condiments', checked: false },
    { id: '2009', name: 'Croutons', quantity: 1, unit: 'bag', category: 'Grains', checked: false },
    { id: '2010', name: 'Salmon fillet', quantity: 7, unit: 'piece', category: 'Protein', checked: false },
    { id: '2011', name: 'Broccoli', quantity: 2, unit: 'head', category: 'Vegetables', checked: false },
    { id: '2012', name: 'Bell pepper', quantity: 7, unit: 'medium', category: 'Vegetables', checked: false },
    { id: '2013', name: 'Olive oil', quantity: 1, unit: 'bottle', category: 'Oils', checked: false },
    { id: '2014', name: 'Lemon', quantity: 4, unit: 'medium', category: 'Fruits', checked: false },
    { id: '2015', name: 'Dill', quantity: 1, unit: 'bunch', category: 'Spices', checked: false },
    { id: '2016', name: 'Apple', quantity: 7, unit: 'medium', category: 'Fruits', checked: false },
    { id: '2017', name: 'Almond butter', quantity: 1, unit: 'jar', category: 'Other', checked: false },
  ],
};

export default function PlannerModePage() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryRestrictions: [],
    allergies: [],
    cuisinePreferences: [],
    calorieTarget: 2000,
    macroTargets: {
      protein: 150,
      carbs: 200,
      fat: 70,
    },
  });
  
  const [weeklyPlan, setWeeklyPlan] = useState<WeeklyMealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<DailyMealPlan | null>(null);
  const [selectedMealType, setSelectedMealType] = useState<MealType | null>(null);
  const [showShoppingList, setShowShoppingList] = useState(false);
  const [shoppingList, setShoppingList] = useState<ShoppingListItem[]>([]);
  
  // For demo purposes, we'll use mock data
  const handleGeneratePlan = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the AI service
      // For demo purposes, we'll use mock data with a delay
      setTimeout(() => {
        setWeeklyPlan(mockWeeklyPlan);
        setSelectedDay(mockWeeklyPlan.days[0]);
        setShoppingList(mockWeeklyPlan.shoppingList);
        setLoading(false);
      }, 1500);
      
      // Uncomment this to use the actual AI service
      // const startDate = new Date().toISOString().split('T')[0];
      // const generatedPlan = await aiService.generateWeeklyMealPlan(
      //   preferences,
      //   startDate
      // );
      // setWeeklyPlan(generatedPlan);
      // setSelectedDay(generatedPlan.days[0]);
      // setShoppingList(generatedPlan.shoppingList);
    } catch (err) {
      setError('Failed to generate meal plan. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleToggleShoppingItem = (id: string, checked: boolean) => {
    setShoppingList(
      shoppingList.map((item) => (item.id === id ? { ...item, checked } : item))
    );
  };
  
  const handleExportShoppingList = () => {
    // In a real app, this would integrate with Instacart or similar
    console.log('Exporting shopping list');
    alert('Shopping list exported! In a real app, this would send the list to Instacart or a similar service.');
  };
  
  const handleDietaryRestrictionChange = (restriction: string) => {
    setPreferences((prev) => {
      const current = [...prev.dietaryRestrictions];
      const index = current.indexOf(restriction);
      
      if (index === -1) {
        current.push(restriction);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        dietaryRestrictions: current,
      };
    });
  };
  
  const handleAllergyChange = (allergy: string) => {
    setPreferences((prev) => {
      const current = [...prev.allergies];
      const index = current.indexOf(allergy);
      
      if (index === -1) {
        current.push(allergy);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        allergies: current,
      };
    });
  };
  
  const handleCalorieChange = (calories: number) => {
    setPreferences((prev) => ({
      ...prev,
      calorieTarget: calories,
    }));
  };
  
  const handleMacroChange = (macro: 'protein' | 'carbs' | 'fat', value: number) => {
    setPreferences((prev) => ({
      ...prev,
      macroTargets: {
        ...prev.macroTargets!,
        [macro]: value,
      },
    }));
  };

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Planner Mode</h1>
          <p className="mt-2 text-gray-600">
            Create a personalized weekly meal plan based on your dietary goals.
          </p>
        </div>
      </header>
      
      <main className="mt-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            {!weeklyPlan ? (
              <div className="bg-white shadow rounded-lg p-6">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Your Dietary Preferences</h2>
                
                <div className="space-y-6">
                  {/* Dietary Restrictions */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Dietary Restrictions</h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Keto', 'Paleo', 'Low-Carb', 'Low-Fat'].map((restriction) => (
                        <div key={restriction} className="flex items-center">
                          <input
                            id={`restriction-${restriction}`}
                            type="checkbox"
                            checked={preferences.dietaryRestrictions.includes(restriction)}
                            onChange={() => handleDietaryRestrictionChange(restriction)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`restriction-${restriction}`} className="ml-2 text-sm text-gray-700">
                            {restriction}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Allergies */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Allergies & Intolerances</h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {['Nuts', 'Peanuts', 'Shellfish', 'Fish', 'Eggs', 'Soy', 'Wheat', 'Lactose'].map((allergy) => (
                        <div key={allergy} className="flex items-center">
                          <input
                            id={`allergy-${allergy}`}
                            type="checkbox"
                            checked={preferences.allergies.includes(allergy)}
                            onChange={() => handleAllergyChange(allergy)}
                            className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`allergy-${allergy}`} className="ml-2 text-sm text-gray-700">
                            {allergy}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Calorie Target */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Daily Calorie Target</h3>
                    <div className="flex items-center">
                      <input
                        type="range"
                        min="1200"
                        max="3500"
                        step="100"
                        value={preferences.calorieTarget}
                        onChange={(e) => handleCalorieChange(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                      />
                      <span className="ml-3 text-sm text-gray-700 min-w-[80px]">
                        {preferences.calorieTarget} kcal
                      </span>
                    </div>
                  </div>
                  
                  {/* Macro Targets */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Macronutrient Targets</h3>
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between mb-1">
                          <label htmlFor="protein-target" className="text-xs text-gray-700">
                            Protein
                          </label>
                          <span className="text-xs text-gray-700">
                            {preferences.macroTargets?.protein}g
                          </span>
                        </div>
                        <input
                          id="protein-target"
                          type="range"
                          min="50"
                          max="250"
                          step="5"
                          value={preferences.macroTargets?.protein}
                          onChange={(e) => handleMacroChange('protein', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <label htmlFor="carbs-target" className="text-xs text-gray-700">
                            Carbs
                          </label>
                          <span className="text-xs text-gray-700">
                            {preferences.macroTargets?.carbs}g
                          </span>
                        </div>
                        <input
                          id="carbs-target"
                          type="range"
                          min="50"
                          max="400"
                          step="5"
                          value={preferences.macroTargets?.carbs}
                          onChange={(e) => handleMacroChange('carbs', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between mb-1">
                          <label htmlFor="fat-target" className="text-xs text-gray-700">
                            Fat
                          </label>
                          <span className="text-xs text-gray-700">
                            {preferences.macroTargets?.fat}g
                          </span>
                        </div>
                        <input
                          id="fat-target"
                          type="range"
                          min="20"
                          max="150"
                          step="5"
                          value={preferences.macroTargets?.fat}
                          onChange={(e) => handleMacroChange('fat', Number(e.target.value))}
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button
                      onClick={handleGeneratePlan}
                      disabled={loading}
                      className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Generating Meal Plan...
                        </>
                      ) : (
                        'Generate Weekly Meal Plan'
                      )}
                    </button>
                  </div>
                  
                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-md p-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <p className="text-sm text-red-700">{error}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Meal Plan Controls */}
                <div className="bg-white shadow rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                    <div>
                      <h2 className="text-xl font-medium text-gray-900">
                        Your Weekly Meal Plan
                      </h2>
                      <p className="text-sm text-gray-500">
                        {weeklyPlan.startDate} to {weeklyPlan.endDate}
                      </p>
                    </div>
                    
                    <div className="mt-4 sm:mt-0 flex space-x-4">
                      <button
                        onClick={() => setShowShoppingList(!showShoppingList)}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        {showShoppingList ? 'View Meal Plan' : 'View Shopping List'}
                      </button>
                      
                      <button
                        onClick={() => {
                          setWeeklyPlan(null);
                          setSelectedDay(null);
                          setSelectedMealType(null);
                          setShowShoppingList(false);
                        }}
                        className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                      >
                        Start Over
                      </button>
                    </div>
                  </div>
                </div>
                
                {showShoppingList ? (
                  <ShoppingList
                    items={shoppingList}
                    onToggleItem={handleToggleShoppingItem}
                    onExport={handleExportShoppingList}
                  />
                ) : (
                  <>
                    {/* Day Selection */}
                    <div className="bg-white shadow rounded-lg p-4">
                      <div className="flex overflow-x-auto space-x-4 pb-2">
                        {weeklyPlan.days.map((day) => {
                          const date = new Date(day.date);
                          const isSelected = selectedDay?.date === day.date;
                          
                          return (
                            <button
                              key={day.date}
                              onClick={() => setSelectedDay(day)}
                              className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium ${
                                isSelected
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'text-gray-700 hover:bg-gray-100'
                              }`}
                            >
                              {date.toLocaleDateString('en-US', { weekday: 'short' })}
                              <br />
                              {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Daily Nutrition Summary */}
                    {selectedDay && (
                      <div className="bg-white shadow rounded-lg p-4">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">
                          Daily Nutrition Summary
                        </h3>
                        
                        <div className="grid grid-cols-4 gap-4 text-center">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Calories</div>
                            <div className="text-xl font-semibold text-gray-900">
                              {selectedDay.totalNutrition.calories}
                            </div>
                            <div className="text-xs text-gray-500">
                              {Math.round((selectedDay.totalNutrition.calories / preferences.calorieTarget!) * 100)}% of target
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Protein</div>
                            <div className="text-xl font-semibold text-gray-900">
                              {selectedDay.totalNutrition.protein}g
                            </div>
                            <div className="text-xs text-gray-500">
                              {Math.round((selectedDay.totalNutrition.protein / preferences.macroTargets!.protein) * 100)}% of target
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Carbs</div>
                            <div className="text-xl font-semibold text-gray-900">
                              {selectedDay.totalNutrition.carbs}g
                            </div>
                            <div className="text-xs text-gray-500">
                              {Math.round((selectedDay.totalNutrition.carbs / preferences.macroTargets!.carbs) * 100)}% of target
                            </div>
                          </div>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="text-sm text-gray-500">Fat</div>
                            <div className="text-xl font-semibold text-gray-900">
                              {selectedDay.totalNutrition.fat}g
                            </div>
                            <div className="text-xs text-gray-500">
                              {Math.round((selectedDay.totalNutrition.fat / preferences.macroTargets!.fat) * 100)}% of target
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {/* Meal Type Selection */}
                    {selectedDay && (
                      <div className="bg-white shadow rounded-lg p-4">
                        <div className="flex overflow-x-auto space-x-4 pb-2">
                          {Object.entries(selectedDay.meals).map(([type, meals]) => {
                            const mealType = type as MealType;
                            const isSelected = selectedMealType === mealType;
                            
                            return (
                              <button
                                key={type}
                                onClick={() => setSelectedMealType(mealType)}
                                className={`flex-shrink-0 px-4 py-2 rounded-md text-sm font-medium ${
                                  isSelected
                                    ? 'bg-green-100 text-green-800'
                                    : 'text-gray-700 hover:bg-gray-100'
                                }`}
                              >
                                {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
                                <span className="ml-2 text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">
                                  {meals.length}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}
                    
                    {/* Meal Recipes */}
                    {selectedDay && selectedMealType && selectedDay.meals[selectedMealType] && (
                      <div className="space-y-6">
                        {selectedDay.meals[selectedMealType]!.map((recipe) => (
                          <RecipeCard
                            key={recipe.id}
                            recipe={recipe}
                            onSave={() => console.log(`Saving recipe ${recipe.id}`)}
                            onFeedback={(rating, feedback) => 
                              console.log(`Feedback for recipe ${recipe.id}: ${rating}/5 - ${feedback}`)
                            }
                          />
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}