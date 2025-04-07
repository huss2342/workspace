import { useState } from 'react';
import { ShoppingListItem } from '../types';

interface ShoppingListProps {
  items: ShoppingListItem[];
  onToggleItem: (id: string, checked: boolean) => void;
  onExport?: () => void;
}

export default function ShoppingList({ items, onToggleItem, onExport }: ShoppingListProps) {
  const [filter, setFilter] = useState('all'); // 'all', 'pending', 'completed'
  
  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ShoppingListItem[]>);
  
  // Filter items based on current filter
  const filteredGroupedItems = Object.entries(groupedItems).reduce((acc, [category, categoryItems]) => {
    const filtered = categoryItems.filter(item => {
      if (filter === 'all') return true;
      if (filter === 'pending') return !item.checked;
      if (filter === 'completed') return item.checked;
      return true;
    });
    
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    
    return acc;
  }, {} as Record<string, ShoppingListItem[]>);
  
  // Calculate progress
  const totalItems = items.length;
  const checkedItems = items.filter(item => item.checked).length;
  const progress = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 sm:p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900">Shopping List</h3>
          
          {onExport && (
            <button
              onClick={onExport}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export List
            </button>
          )}
        </div>
        
        {/* Progress bar */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm text-gray-500">{checkedItems} of {totalItems} items</span>
            <span className="text-sm font-medium text-gray-700">{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-green-600 h-2.5 rounded-full" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        {/* Filter tabs */}
        <div className="border-b border-gray-200 mb-4">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setFilter('all')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                filter === 'all'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                filter === 'pending'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`pb-2 px-1 border-b-2 font-medium text-sm ${
                filter === 'completed'
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Completed
            </button>
          </nav>
        </div>
        
        {/* Shopping list by category */}
        {Object.keys(filteredGroupedItems).length === 0 ? (
          <div className="text-center py-6">
            <p className="text-gray-500">No items in this list</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(filteredGroupedItems).map(([category, categoryItems]) => (
              <div key={category}>
                <h4 className="text-sm font-medium text-gray-900 mb-2">{category}</h4>
                <ul className="divide-y divide-gray-200">
                  {categoryItems.map((item) => (
                    <li key={item.id} className="py-3 flex items-center">
                      <input
                        type="checkbox"
                        checked={item.checked}
                        onChange={(e) => onToggleItem(item.id, e.target.checked)}
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <span className={`ml-3 text-sm ${item.checked ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                        {item.quantity} {item.unit} {item.name}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}