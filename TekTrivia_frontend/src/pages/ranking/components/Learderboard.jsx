import React from 'react'
import TopPlayers from './TopPlayers'
import ListPlayersContainer from './ListPlayersContainer'

const Learderboard = () => {
  return (
    <div className="w-full bg-white dark:bg-transparent flex flex-col h-[72%] rounded-t-2xl box-border mt-2">
        <TopPlayers/>
        <ListPlayersContainer/>
    </div>
  )
}

export default Learderboard