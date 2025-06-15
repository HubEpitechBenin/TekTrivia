import React from 'react'
import ListPlayersElement from './ListPlayersElement'
import avatar from '../../../assets/avatar2.jpg';

const ListPlayersContainer = () => {
  const players = [
    { name: 'Jon Bailey', country: 'France', xp: '180k', image: avatar },
    { name: 'Alice Smith', country: 'UK', xp: '170k', image: avatar },
    { name: 'Carlos Lopez', country: 'Spain', xp: '160k', image: avatar },
    { name: 'Satoshi Nakamoto', country: 'Japan', xp: '150k', image: avatar },
    { name: 'Léa Dupont', country: 'France', xp: '140k', image: avatar },
    { name: 'Ahmed Zaki', country: 'Egypt', xp: '130k', image: avatar },
    { name: 'Mia Chen', country: 'China', xp: '120k', image: avatar },
    { name: 'Tom Hardy', country: 'Australia', xp: '110k', image: avatar },
    { name: 'Olga Ivanova', country: 'Russia', xp: '100k', image: avatar },
    { name: 'Mohammed Ali', country: 'Morocco', xp: '90k', image: avatar }
  ];

  return (
    <div className="dark:border-x dark:border-pm-rBorder h-[65%] shadow-md box-border overflow-auto no-scrollbar">
      {players.map((player, index) => (
        <ListPlayersElement
          key={index}
          index={index + 4}
          image={player.image}
          name={player.name}
          country={player.country}
          xp={player.xp}
        />
      ))}
    </div>
  )
}  

export default ListPlayersContainer