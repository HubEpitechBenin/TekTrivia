import React from "react";
import StatCard from "./StatCard";
import { FaUsers } from "react-icons/fa";

const Stats = () => {
  const statData = [
    {
      icon: <FaUsers />,
      title: "Total Users",
      statNum: "500,000",
      other: "Subscribed",
    },
    {
      icon: <FaUsers />,
      title: "Active Users",
      statNum: "320,000",
      other: "Online now",
    },
    {
      icon: <FaUsers />,
      title: "Premium",
      statNum: "80,000",
      other: "Gold Tier",
    }
  ];

  return (
    <div className="flex flex-col w-full h-[28%] box-border py-2">
    <h2 className="text-black text-xl font-semibold py-2 rounded-md mb-4">
        Dashboard
    </h2>

    <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2 rounded-lg">
        {statData.map((item, index) => (
        <StatCard
            key={index}
            icon={item.icon}
            title={item.title}
            statNum={item.statNum}
            other={item.other}
        />
        ))}
    </div>
    </div>
  );
};

export default Stats;
