import OpenAI from 'openai';
import { Ingredient, Recipe, UserPreferences, WeeklyMealPlan } from '../types';

// Initialize OpenAI client
// In a real app, you would store this in an environment variable
const openai = new OpenAI({
  apiKey: 'your-api-key-here', // Replace with actual API key in production
  dangerouslyAllowBrowser: true // Only for demo purposes
});

export const aiService = {
  /**
   * Generate recipes based on available ingredients
   */
  async generateRecipesFromIngredients(
    ingredients: Ingredient[],
    preferences: UserPreferences,
    count: number = 3
  ): Promise<Recipe[]> {
    try {
      const ingredientNames = ingredients.map(ing => ing.name).join(', ');
      
      const dietaryRestrictions = preferences.dietaryRestrictions.join(', ');
      const allergies = preferences.allergies.join(', ');
      
      const prompt = `Generate ${count} recipes using some or all of these ingredients: ${ingredientNames}.
      
      Dietary restrictions: ${dietaryRestrictions || 'None'}
      Allergies: ${allergies || 'None'}
      
      For each recipe, provide:
      1. Name
      2. Brief description
      3. Ingredients with quantities
      4. Step-by-step instructions
      5. Preparation time and cooking time
      6. Nutritional information (calories, protein, carbs, fat)
      
      Format the response as a JSON array of recipe objects.`;
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      });
      
      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from AI');
      
      const parsedContent = JSON.parse(content);
      return parsedContent.recipes;
    } catch (error) {
      console.error('Error generating recipes:', error);
      throw error;
    }
  },
  
  /**
   * Generate a weekly meal plan based on user preferences
   */
  async generateWeeklyMealPlan(
    preferences: UserPreferences,
    startDate: string
  ): Promise<WeeklyMealPlan> {
    try {
      const dietaryRestrictions = preferences.dietaryRestrictions.join(', ');
      const allergies = preferences.allergies.join(', ');
      const cuisinePreferences = preferences.cuisinePreferences.join(', ');
      
      let macroTargets = '';
      if (preferences.macroTargets) {
        macroTargets = `
        Protein: ${preferences.macroTargets.protein}g
        Carbs: ${preferences.macroTargets.carbs}g
        Fat: ${preferences.macroTargets.fat}g`;
      }
      
      const prompt = `Generate a 7-day meal plan starting from ${startDate}.
      
      Dietary restrictions: ${dietaryRestrictions || 'None'}
      Allergies: ${allergies || 'None'}
      Cuisine preferences: ${cuisinePreferences || 'Any'}
      Calorie target: ${preferences.calorieTarget || 'Not specified'}
      Macro targets: ${macroTargets || 'Not specified'}
      
      For each day, include:
      1. Breakfast
      2. Lunch
      3. Dinner
      4. 1-2 Snacks
      
      For each meal, provide:
      1. Recipe name
      2. Brief description
      3. Ingredients with quantities
      4. Step-by-step instructions
      5. Preparation time and cooking time
      6. Nutritional information (calories, protein, carbs, fat)
      
      Also include a consolidated shopping list for the entire week.
      
      Format the response as a JSON object with the meal plan and shopping list.`;
      
      const response = await openai.chat.completions.create({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' }
      });
      
      const content = response.choices[0]?.message?.content;
      if (!content) throw new Error('No response from AI');
      
      const parsedContent = JSON.parse(content);
      return parsedContent.mealPlan;
    } catch (error) {
      console.error('Error generating meal plan:', error);
      throw error;
    }
  },
  
  /**
   * Improve future recommendations based on user feedback
   */
  async provideFeedback(
    recipeId: string,
    rating: number,
    feedback: string
  ): Promise<void> {
    try {
      // In a real app, you would store this feedback and use it to improve future recommendations
      console.log(`Feedback for recipe ${recipeId}: ${rating}/5 - ${feedback}`);
      
      // This could be implemented with a fine-tuning approach or by storing user preferences
    } catch (error) {
      console.error('Error providing feedback:', error);
      throw error;
    }
  }
};