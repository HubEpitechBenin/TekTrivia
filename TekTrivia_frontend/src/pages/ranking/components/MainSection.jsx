import React from 'react'
import RightSidebar from './RightSidebar'
import RankingSection from './RankingSection'


const MainSection = () => {
  return (
    <div className="flex flex-1 overflow-hidden justify-between w-full h-full box-border">
        <RankingSection/>
        <RightSidebar/>
    </div>
  )
}

export default MainSection