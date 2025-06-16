import React from 'react';
import kingIcon from '../../../assets/kingIcon.png';

const TopPlayerCard = ({ rank, name, xp, country, avatar }) => {
  const rankColors = {
    1: 'border-yellow-500',
    2: 'border-red-500',
    3: 'border-orange-400',
  };

  const rankBorder = rankColors[rank];

  const containerMargin = rank === 1 ? 'mb-8' : '';
 
  return (
    <div className={`flex flex-col items-center mx-[5%] ${containerMargin}`}>
      <div className="-mb-2">
        {rank === 1 && (
          <img
          src={kingIcon}
          alt="kingIcon"
          className="w-10"
          />
        )}
      </div>

      <div className={`relative w-24 h-24 rounded-full border-4 ${rankBorder} overflow-hidden`}>
        <img
          src={avatar}
          alt={`${name} avatar`}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="text-white text-center mt-2">
        <p className="text-lg font-semibold">{xp} XP</p>
        <p className="text-sm">{name}</p>
        <p className="text-xs opacity-70">{country}</p>
      </div>
    </div>
  );
};

export default TopPlayerCard;
