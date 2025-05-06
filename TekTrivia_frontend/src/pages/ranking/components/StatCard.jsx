import React from 'react'

const StatCard = ({ icon, title, statNum, other }) => {
    return (
        <div className="flex flex-col p-4 rounded-2xl shadow-md bg-white dark:bg-pm-r10 dark:border-pm-rBorder border border-gray-200 w-full transition-transform transform hover:scale-105 duration-300">
            <div className="flex gap-2">
                <div className="text-2xl text-pm-blue300">
                    {icon}
                </div>
                <h3 className="text-[16px] text-gray-600 dark:text-gray-200">{title}</h3>
            </div>

            <div className="flex flex-col">
                <p className="mt-2 text-[22px] font-bold text-yellow-300">{statNum}</p>
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="text-[70%] text-gray-600 dark:text-gray-400">{other}</p>
                        <p className="text-[70%] text-gray-600 dark:text-gray-400">450</p>
                    </div>
                    <div className="border-l border-gray-400 pl-[9%]">
                        <p className="text-[70%] text-gray-600 dark:text-gray-400">Non Suscribed</p>
                        <p className="text-[70%] text-gray-600 dark:text-gray-400">450</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
  

export default StatCard