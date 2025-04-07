import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div className="py-10">
      <header>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Welcome to MealMind AI</h1>
        </div>
      </header>
      <main>
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-6 bg-white">
              <div className="text-center">
                <h2 className="text-xl font-semibold text-gray-900">Your AI-Powered Meal Planning Assistant</h2>
                <p className="mt-2 text-gray-600">
                  Get personalized meal suggestions based on your dietary preferences and available ingredients.
                </p>
              </div>
              
              <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="bg-green-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-green-800">Pantry Mode</h3>
                  <p className="mt-2 text-sm text-green-700">
                    Input the ingredients you have on hand, and we'll suggest recipes you can make right now.
                  </p>
                  <div className="mt-4">
                    <Link
                      to="/pantry"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Get Started
                    </Link>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-6 shadow-sm">
                  <h3 className="text-lg font-medium text-blue-800">Planner Mode</h3>
                  <p className="mt-2 text-sm text-blue-700">
                    Create a complete meal plan for the week based on your dietary goals and preferences.
                  </p>
                  <div className="mt-4">
                    <Link
                      to="/planner"
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      Plan My Week
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-10">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Key Features</h3>
                <ul className="space-y-3">
                  <li className="flex">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">AI-generated recipes based on your available ingredients</span>
                  </li>
                  <li className="flex">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Weekly meal plans tailored to your dietary goals</span>
                  </li>
                  <li className="flex">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Detailed nutritional information for all recipes</span>
                  </li>
                  <li className="flex">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Shopping lists that can be exported to grocery delivery services</span>
                  </li>
                  <li className="flex">
                    <svg className="h-6 w-6 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Personalized recommendations that improve over time</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}