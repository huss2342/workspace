import { useState } from 'react';
import { Ingredient, Recipe } from '../types';

interface IngredientInputProps {
  onAddIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (id: string) => void;
  onRequestRecipe: (ingredient: string) => void;
  existingIngredients: Ingredient[];
  favoriteRecipes: Recipe[];
}

export default function IngredientInput({ 
  onAddIngredient, 
  onRemoveIngredient, 
  onRequestRecipe,
  existingIngredients, 
  favoriteRecipes 
}: IngredientInputProps) {
  const [name, setName] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [unit, setUnit] = useState('');
  const [showFavorites, setShowFavorites] = useState(false);
  const [requestedIngredient, setRequestedIngredient] = useState('');
  
  const commonUnits = ['g', 'kg', 'oz', 'lb', 'cup', 'tbsp', 'tsp', 'ml', 'l', 'piece', 'slice'];
  const commonCategories = ['Vegetables', 'Fruits', 'Grains', 'Protein', 'Dairy', 'Spices', 'Other'];
  const [category, setCategory] = useState(commonCategories[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) return;
    
    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: name.trim(),
      quantity,
      unit,
      category
    };
    
    onAddIngredient(newIngredient);
    
    // Reset form
    setName('');
    setQuantity(1);
    setUnit('');
  };

  const handleRequestRecipe = (e: React.FormEvent) => {
    e.preventDefault();
    if (requestedIngredient.trim()) {
      onRequestRecipe(requestedIngredient.trim());
      setRequestedIngredient('');
    }
  };

  return (
    <div className="space-y-6">
      {/* Recipe Request Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Request Specific Recipe</h3>
        <form onSubmit={handleRequestRecipe} className="flex gap-2">
          <input
            type="text"
            value={requestedIngredient}
            onChange={(e) => setRequestedIngredient(e.target.value)}
            placeholder="e.g., tuna, chicken, tofu"
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Find Recipes
          </button>
        </form>
      </div>

      {/* Ingredient Input Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Add Ingredient</h3>
        
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="ingredient-name" className="block text-sm font-medium text-gray-700">
                Ingredient Name
              </label>
              <input
                type="text"
                id="ingredient-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="e.g., Chicken breast"
                required
              />
            </div>
            
            <div className="sm:col-span-1">
              <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="0.1"
                step="0.1"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                required
              />
            </div>
            
            <div className="sm:col-span-1">
              <label htmlFor="unit" className="block text-sm font-medium text-gray-700">
                Unit
              </label>
              <select
                id="unit"
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                <option value="">Select unit</option>
                {commonUnits.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="sm:col-span-1">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <select
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
              >
                {commonCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mt-4">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Add Ingredient
            </button>
          </div>
        </form>
      </div>
      
      {/* Ingredients List */}
      {existingIngredients.length > 0 && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h4 className="text-md font-medium text-gray-900 mb-2">Your Ingredients</h4>
          <ul className="divide-y divide-gray-200">
            {existingIngredients.map((ingredient) => (
              <li key={ingredient.id} className="py-2 flex items-center justify-between">
                <span className="text-sm text-gray-800">
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </span>
                <div className="flex items-center space-x-4">
                  <span className="text-xs text-gray-500">{ingredient.category}</span>
                  <button
                    onClick={() => onRemoveIngredient(ingredient.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Favorites Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-md font-medium text-gray-900">Favorite Recipes</h4>
          <button
            onClick={() => setShowFavorites(!showFavorites)}
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            {showFavorites ? 'Hide' : 'Show'}
          </button>
        </div>

        {showFavorites && (
          <div className="space-y-4">
            {favoriteRecipes.length > 0 ? (
              <ul className="divide-y divide-gray-200">
                {favoriteRecipes.map((recipe) => (
                  <li key={recipe.id} className="py-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h5 className="text-sm font-medium text-gray-900">{recipe.name}</h5>
                        <p className="text-sm text-gray-500">{recipe.description}</p>
                      </div>
                      <div className="text-xs text-gray-500">
                        {recipe.prepTime + recipe.cookTime} min
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-500 text-center py-4">
                No favorite recipes yet. Save some recipes to see them here!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}