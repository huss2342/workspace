import { useState } from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSave?: () => void;
  onFeedback?: (rating: number, feedback: string) => void;
}

export default function RecipeCard({ recipe, onSave, onFeedback }: RecipeCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  const totalTime = recipe.prepTime + recipe.cookTime;
  
  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onFeedback && rating > 0) {
      onFeedback(rating, feedback);
      setShowFeedbackForm(false);
      setFeedback('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      {/* Recipe header */}
      <div className="p-4 sm:p-6">
        <h3 className="text-lg font-medium text-gray-900">{recipe.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{recipe.description}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{totalTime} min ({recipe.prepTime} prep, {recipe.cookTime} cook)</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500">
            <svg className="h-5 w-5 text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span>{recipe.servings} servings</span>
          </div>
        </div>
        
        {/* Nutrition info */}
        <div className="mt-4 grid grid-cols-4 gap-2 text-center">
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Calories</div>
            <div className="font-medium">{recipe.nutrition.calories}</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Protein</div>
            <div className="font-medium">{recipe.nutrition.protein}g</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Carbs</div>
            <div className="font-medium">{recipe.nutrition.carbs}g</div>
          </div>
          <div className="bg-gray-50 p-2 rounded">
            <div className="text-xs text-gray-500">Fat</div>
            <div className="font-medium">{recipe.nutrition.fat}g</div>
          </div>
        </div>
        
        <div className="mt-4 flex justify-between">
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-green-600 hover:text-green-800"
          >
            {expanded ? 'Show less' : 'Show details'}
          </button>
          
          {onSave && (
            <button
              onClick={onSave}
              className="text-sm text-green-600 hover:text-green-800 flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Save recipe
            </button>
          )}
          
          {onFeedback && (
            <button
              onClick={() => setShowFeedbackForm(!showFeedbackForm)}
              className="text-sm text-green-600 hover:text-green-800 flex items-center"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Rate recipe
            </button>
          )}
        </div>
      </div>
      
      {/* Expanded details */}
      {expanded && (
        <div className="border-t border-gray-200 p-4 sm:p-6">
          {/* Ingredients */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Ingredients</h4>
            <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.quantity} {ingredient.unit} {ingredient.name}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Instructions */}
          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">Instructions</h4>
            <ol className="list-decimal pl-5 text-sm text-gray-700 space-y-2">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
          
          {/* Tags */}
          {recipe.tags && recipe.tags.length > 0 && (
            <div className="mt-4">
              <div className="flex flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
      
      {/* Feedback form */}
      {showFeedbackForm && (
        <div className="border-t border-gray-200 p-4 sm:p-6">
          <h4 className="text-sm font-medium text-gray-900 mb-2">Rate this recipe</h4>
          <form onSubmit={handleFeedbackSubmit}>
            <div className="flex items-center mb-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`h-8 w-8 focus:outline-none ${
                    rating >= star ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                >
                  <svg fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
            
            <div className="mb-4">
              <label htmlFor="feedback" className="block text-sm font-medium text-gray-700 mb-1">
                Comments (optional)
              </label>
              <textarea
                id="feedback"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                placeholder="What did you like or dislike about this recipe?"
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setShowFeedbackForm(false)}
                className="mr-3 inline-flex justify-center py-2 px-4 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={rating === 0}
                className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}