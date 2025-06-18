import React from 'react';
import TopPlayerCard from './TopPlayerCard';
import avatar1 from '../../../assets/avatar1.jpg';
import avatar2 from '../../../assets/avatar2.jpg';
import avatar3 from '../../../assets/avatar3.jpg';

const TopPlayers = () => {
    const top3 = [
      { rank: 2, name: 'Roy Warren', xp: '220k', country: 'USA', avatar: avatar1 },
      { rank: 1, name: 'Patrice DAGBE', xp: '300k', country: 'Benin', avatar: avatar2 },
      { rank: 3, name: 'Jean-Baptiste VIOSSI', xp: '200k', country: 'Benin', avatar: avatar3 },
    ];
    
    return (
      <div className="w-full flex justify-center items-end bg-pm-blue dark:bg-pm-r10 dark:border dark:border-pm-rBorder py-4 rounded-t-2xl min-h-[35%] box-border">
        {top3.map((player) => (
          <TopPlayerCard
            key={player.rank}
            rank={player.rank}
            name={player.name}
            xp={player.xp}
            country={player.country}
            avatar={player.avatar}
          />
        ))}
      </div>
    );
}


export default TopPlayers