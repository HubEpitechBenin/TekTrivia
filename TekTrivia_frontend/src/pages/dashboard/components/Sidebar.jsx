// import React from 'react'
// import TekTriviaLogo from '../../../components/TekTriviaLogo'
// import MenuBar from './MenuBar'

// const Sidebar = () => {
//   return (
//     <div className="flex flex-col w-[7%] border border-r-[0.5px] border-pm-borderGray box-border">
//         <TekTriviaLogo className="w-32 h-32"/>
//         <MenuBar/>
//     </div>
//   )
// }

// export default Sidebar

import { Home, Grid3X3, Users, Settings, HelpCircle } from 'lucide-react';

const Sidebar = () => {
  const menuItems = [
    { icon: Home, active: true },
    { icon: Grid3X3, active: false },
    { icon: Users, active: false },
    { icon: Settings, active: false },
    { icon: HelpCircle, active: false },
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-white border-r border-gray-200 flex flex-col items-center py-6 z-10">
      <div className="mb-8">
        <div className="text-lg font-semibold text-gray-700">LOGO</div>
      </div>
      
      <div className="flex flex-col space-y-6">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`p-3 rounded-lg transition-colors ${
              item.active 
                ? 'bg-blue-500 text-white' 
                : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon size={20} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
