import React from 'react'
import RightSidebar from './RightSidebar'
import RankingSection from './RankingSection'


const MainSection = () => {
  return (
    <div className="flex justify-between w-full h-[94%] box-border">
        <RankingSection/>
        <RightSidebar/>
    </div>
  )
}

export default MainSection