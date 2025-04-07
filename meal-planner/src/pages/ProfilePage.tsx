import { useState } from 'react';
import { UserPreferences } from '../types';

export default function ProfilePage() {
  const [preferences, setPreferences] = useState<UserPreferences>({
    dietaryRestrictions: ['Vegetarian'],
    allergies: ['Nuts'],
    cuisinePreferences: ['Italian', 'Mexican', 'Asian'],
    calorieTarget: 2000,
    macroTargets: {
      protein: 150,
      carbs: 200,
      fat: 70,
    },
  });
  
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [saved, setSaved] = useState(false);
  
  const handleSavePreferences = () => {
    // In a real app, this would save to a database or API
    console.log('Saving preferences:', { name, email, preferences });
    setSaved(true);
    
    // Reset the saved message after 3 seconds
    setTimeout(() => {
      setSaved(false);
    }, 3000);
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
  
  const handleCuisineChange = (cuisine: string) => {
    setPreferences((prev) => {
      const current = [...prev.cuisinePreferences];
      const index = current.indexOf(cuisine);
      
      if (index === -1) {
        current.push(cuisine);
      } else {
        current.splice(index, 1);
      }
      
      return {
        ...prev,
        cuisinePreferences: current,
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
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <p className="mt-2 text-gray-600">
            Manage your account and dietary preferences.
          </p>
        </div>
      </header>
      
      <main className="mt-8">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 sm:px-0">
            <div className="bg-white shadow rounded-lg overflow-hidden">
              <div className="p-6 sm:p-8">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Account Information</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6 sm:p-8">
                <h2 className="text-xl font-medium text-gray-900 mb-6">Dietary Preferences</h2>
                
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
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
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
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`allergy-${allergy}`} className="ml-2 text-sm text-gray-700">
                            {allergy}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Cuisine Preferences */}
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Cuisine Preferences</h3>
                    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4">
                      {['Italian', 'Mexican', 'Asian', 'Mediterranean', 'American', 'Indian', 'French', 'Middle Eastern'].map((cuisine) => (
                        <div key={cuisine} className="flex items-center">
                          <input
                            id={`cuisine-${cuisine}`}
                            type="checkbox"
                            checked={preferences.cuisinePreferences.includes(cuisine)}
                            onChange={() => handleCuisineChange(cuisine)}
                            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                          />
                          <label htmlFor={`cuisine-${cuisine}`} className="ml-2 text-sm text-gray-700">
                            {cuisine}
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
                </div>
              </div>
              
              <div className="border-t border-gray-200 p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <button
                    onClick={handleSavePreferences}
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    Save Preferences
                  </button>
                  
                  {saved && (
                    <span className="text-sm text-green-600">
                      Preferences saved successfully!
                    </span>
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