import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();
  
  const isActive = (path: string) => {
    return location.pathname === path ? 'bg-green-100 text-green-800' : 'text-gray-600 hover:bg-gray-100';
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-green-600">MealMind AI</h1>
            </div>
            <nav className="hidden md:flex space-x-4">
              <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/')}`}>
                Home
              </Link>
              <Link to="/pantry" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/pantry')}`}>
                Pantry Mode
              </Link>
              <Link to="/planner" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/planner')}`}>
                Planner Mode
              </Link>
              <Link to="/profile" className={`px-3 py-2 rounded-md text-sm font-medium ${isActive('/profile')}`}>
                Profile
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4 text-center text-sm text-gray-500">
            <p>© 2025 MealMind AI. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}