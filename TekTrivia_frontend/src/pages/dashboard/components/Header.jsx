import { Search, Bell, Home } from 'lucide-react';

const Header = () => {
  return (
    <div className="flex items-center justify-between px-12 py-4 bg-white border-b border-gray-200">
      <div className="flex items-center flex-1 max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="search"
            placeholder="Search a quiz..."
            className="w-full pl-10 pr-4 py-3 bg-gray-100 rounded-lg border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-6">
        <div className="flex items-center space-x-2 bg-gray-100 px-3 py-2 rounded-lg">
          <Home className="text-blue-500" size={16} />
          <span className="font-semibold text-gray-700">LEVEL</span>
          <span className="font-bold text-gray-900">9</span>
        </div>
        
        <div className="relative">
          <Bell className="text-gray-600" size={20} />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">3</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <img
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <div className="font-semibold text-gray-900">Patrice DAGBE</div>
            <div className="text-sm text-gray-500">patrko.dagbe@epitech.eu</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
