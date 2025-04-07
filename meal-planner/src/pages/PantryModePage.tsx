import { useState, useEffect } from 'react';
import { Ingredient, Recipe, UserPreferences } from '../types';
import IngredientInput from '../components/IngredientInput';
import RecipeCard from '../components/RecipeCard';
import { aiService } from '../services/aiService';

// Mock data for demonstration
const mockRecipes: Recipe[] = [
  {
    id: '1',
    name: 'Garlic Butter Chicken',
    description: 'Juicy chicken breasts cooked in a rich garlic butter sauce.',
    ingredients: [
      { id: '1', name: 'Chicken breast', quantity: 2, unit: 'piece' },
      { id: '2', name: 'Butter', quantity: 2, unit: 'tbsp' },
      { id: '3', name: 'Garlic', quantity: 3, unit: 'clove' },
      { id: '4', name: 'Thyme', quantity: 1, unit: 'tsp' },
      { id: '5', name: 'Salt', quantity: 0.5, unit: 'tsp' },
      { id: '6', name: 'Black pepper', quantity: 0.25, unit: 'tsp' },
    ],
    instructions: [
      'Season chicken breasts with salt and pepper on both sides.',
      'Heat a large skillet over medium-high heat.',
      'Add butter and let it melt.',
      'Add minced garlic and thyme, cook for 30 seconds until fragrant.',
      'Add chicken breasts and cook for 5-6 minutes per side until golden and cooked through.',
      'Spoon the garlic butter sauce over the chicken while cooking.',
      'Let rest for 5 minutes before serving.',
    ],
    prepTime: 10,
    cookTime: 15,
    servings: 2,
    nutrition: {
      calories: 350,
      protein: 40,
      carbs: 2,
      fat: 20,
    },
    tags: ['High Protein', 'Low Carb', 'Quick'],
  },
  {
    id: '2',
    name: 'Vegetable Stir Fry',
    description: 'A quick and healthy vegetable stir fry with a savory sauce.',
    ingredients: [
      { id: '7', name: 'Broccoli', quantity: 1, unit: 'cup' },
      { id: '8', name: 'Carrots', quantity: 2, unit: 'medium' },
      { id: '9', name: 'Bell pepper', quantity: 1, unit: 'medium' },
      { id: '10', name: 'Soy sauce', quantity: 2, unit: 'tbsp' },
      { id: '11', name: 'Garlic', quantity: 2, unit: 'clove' },
      { id: '12', name: 'Ginger', quantity: 1, unit: 'tsp' },
      { id: '13', name: 'Vegetable oil', quantity: 1, unit: 'tbsp' },
    ],
    instructions: [
      'Cut all vegetables into bite-sized pieces.',
      'Heat oil in a wok or large skillet over high heat.',
      'Add garlic and ginger, stir for 30 seconds.',
      'Add vegetables and stir fry for 5-6 minutes until crisp-tender.',
      'Add soy sauce and continue cooking for 1 minute.',
      'Serve hot over rice or noodles if desired.',
    ],
    prepTime: 15,
    cookTime: 8,
    servings: 2,
    nutrition: {
      calories: 180,
      protein: 5,
      carbs: 20,
      fat: 8,
    },
    tags: ['Vegetarian', 'Quick', 'Healthy'],
  },
];

export default function PantryModePage() {
  const [ingredients, setIngredients] = useState<Ingredient[]>(() => {
    const saved = localStorage.getItem('pantry');
    return saved ? JSON.parse(saved) : [];
  });
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // User preferences (in a real app, this would come from user settings)
  const [preferences] = useState<UserPreferences>({
    dietaryRestrictions: [],
    allergies: [],
    cuisinePreferences: [],
  });
  
  const [favoriteRecipes, setFavoriteRecipes] = useState<Recipe[]>(() => {
    const saved = localStorage.getItem('favoriteRecipes');
    return saved ? JSON.parse(saved) : [];
  });

  // Save ingredients to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pantry', JSON.stringify(ingredients));
  }, [ingredients]);

  // Save favorite recipes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  }, [favoriteRecipes]);

  const handleAddIngredient = (ingredient: Ingredient) => {
    setIngredients([...ingredients, ingredient]);
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const handleRequestRecipe = async (ingredient: string) => {
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the AI service with the specific ingredient
      // For demo purposes, we'll use mock data with a delay
      setTimeout(() => {
        const filteredRecipes = mockRecipes.filter(recipe => 
          recipe.ingredients.some(ing => 
            ing.name.toLowerCase().includes(ingredient.toLowerCase())
          )
        );
        
        if (filteredRecipes.length > 0) {
          setRecipes(filteredRecipes);
        } else {
          // If no exact match, show all recipes (in a real app, AI would generate new ones)
          setRecipes(mockRecipes);
        }
        setLoading(false);
      }, 1500);
      
      // Uncomment this to use the actual AI service
      // const generatedRecipes = await aiService.generateRecipesFromIngredients(
      //   [...ingredients, { id: 'requested', name: ingredient, quantity: 1, unit: 'piece', category: 'Other' }],
      //   preferences,
      //   3
      // );
      // setRecipes(generatedRecipes);
    } catch (err) {
      setError('Failed to generate recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleGenerateRecipes = async () => {
    if (ingredients.length === 0) {
      setError('Please add at least one ingredient');
      return;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      // In a real app, this would call the AI service
      // For demo purposes, we'll use mock data with a delay
      setTimeout(() => {
        setRecipes(mockRecipes);
        setLoading(false);
      }, 1500);
      
      // Uncomment this to use the actual AI service
      // const generatedRecipes = await aiService.generateRecipesFromIngredients(
      //   ingredients,
      //   preferences,
      //   3
      // );
      // setRecipes(generatedRecipes);
    } catch (err) {
      setError('Failed to generate recipes. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleSaveRecipe = (recipeId: string) => {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      // Check if recipe is already in favorites
      if (!favoriteRecipes.some(r => r.id === recipeId)) {
        setFavoriteRecipes([...favoriteRecipes, recipe]);
        alert('Recipe added to favorites!');
      } else {
        // If recipe is already in favorites, ask if they want to remove it
        if (window.confirm('This recipe is already in your favorites. Would you like to remove it?')) {
          setFavoriteRecipes(favoriteRecipes.filter(r => r.id !== recipeId));
          alert('Recipe removed from favorites!');
        }
      }
    }
  };
  
  const handleFeedback = (recipeId: string, rating: number, feedback: string) => {
    // In a real app, this would send feedback to improve future recommendations
    console.log(`Feedback for recipe ${recipeId}: ${rating}/5 - ${feedback}`);
    
    // Update the recipe in favorites if it exists there
    const updatedFavorites = favoriteRecipes.map(recipe => {
      if (recipe.id === recipeId) {
        return {
          ...recipe,
          userRating: rating,
          userFeedback: feedback,
        };
      }
      return recipe;
    });
    
    setFavoriteRecipes(updatedFavorites);
    alert('Thank you for your feedback! We will use this to improve your recommendations.');
  };

  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Pantry Mode</h1>
          <p className="mt-2 text-gray-600">
            Tell us what ingredients you have, and we'll suggest recipes you can make.
          </p>
        </div>
      </header>
      
      <main className="mt-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {/* Ingredient input section */}
              <div className="lg:col-span-1">
                <IngredientInput 
                  onAddIngredient={handleAddIngredient}
                  existingIngredients={ingredients}
                />
                
                <div className="mt-6 space-y-3">
                  <button
                    onClick={handleGenerateRecipes}
                    disabled={ingredients.length === 0 || loading}
                    className="w-full inline-flex justify-center py-3 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Generating Recipes...
                      </>
                    ) : (
                      'Generate Recipes'
                    )}
                  </button>
                  <button
                    onClick={() => setFavoriteRecipes([])}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Clear Favorites
                  </button>
                  <button
                    onClick={() => {
                      if (window.confirm('Are you sure you want to clear your pantry?')) {
                        setIngredients([]);
                      }
                    }}
                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Clear Pantry
                  </button>
                </div>
                
                {error && (
                  <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-4">
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
              
              {/* Recipe results and favorites section */}
              <div className="lg:col-span-2 space-y-6">
                {/* Suggested Recipes */}
                <div className="bg-white shadow rounded-lg p-6">
                  <h2 className="text-xl font-medium text-gray-900 mb-6">
                    {recipes.length > 0 
                      ? 'Suggested Recipes' 
                      : 'Add ingredients and generate recipes'}
                  </h2>
                  
                  {loading ? (
                    <div className="flex justify-center items-center py-12">
                      <svg className="animate-spin h-10 w-10 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    </div>
                  ) : recipes.length > 0 ? (
                    <div className="space-y-6">
                      {recipes.map((recipe) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          onSave={() => handleSaveRecipe(recipe.id)}
                          onFeedback={(rating, feedback) => handleFeedback(recipe.id, rating, feedback)}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No recipes yet</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Add ingredients from your pantry and generate recipes.
                      </p>
                    </div>
                  )}
                </div>

                {/* Favorite Recipes */}
                <div className="bg-white shadow rounded-lg p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-gray-900">Favorite Recipes</h2>
                    <span className="text-sm text-gray-500">{favoriteRecipes.length} saved</span>
                  </div>
                  
                  {favoriteRecipes.length > 0 ? (
                    <div className="space-y-6">
                      {favoriteRecipes.map((recipe) => (
                        <RecipeCard
                          key={recipe.id}
                          recipe={recipe}
                          onSave={() => handleSaveRecipe(recipe.id)}
                          onFeedback={(rating, feedback) => handleFeedback(recipe.id, rating, feedback)}
                          isFavorite={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-lg">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      <h3 className="mt-2 text-sm font-medium text-gray-900">No favorite recipes</h3>
                      <p className="mt-1 text-sm text-gray-500">
                        Save recipes you like to find them here!
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}