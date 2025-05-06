import React from 'react'
import TopPlayers from './TopPlayers'
import ListPlayersContainer from './ListPlayersContainer'

const Learderboard = () => {
  return (
    <div className="w-full h-[72%]">
        <TopPlayers/>
        <ListPlayersContainer/>
    </div>
  )
}

export default Learderboard