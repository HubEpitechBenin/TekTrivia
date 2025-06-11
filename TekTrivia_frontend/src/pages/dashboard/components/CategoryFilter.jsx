import { Plus } from 'lucide-react';

const CategoryFilter = () => {
  const categories = [
    { name: 'All categories', active: true },
    { name: 'Mathematics', active: false },
    { name: 'Game', active: false },
    { name: 'Data Science', active: false },
    { name: 'Cyber Security', active: false },
  ];

  return (
    <div className="flex items-center justify-between mb-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Explore</h2>
        <div className="flex items-center space-x-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                category.active
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-medium flex items-center space-x-2 transition-colors">
          <Plus size={16} />
          <span>Create a quiz</span>
        </button>
        <button className="bg-gray-900 hover:bg-gray-800 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          See All
        </button>
      </div>
    </div>
  );
};

export default CategoryFilter;
