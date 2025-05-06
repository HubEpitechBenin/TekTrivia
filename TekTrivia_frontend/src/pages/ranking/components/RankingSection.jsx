import React from 'react'
import Learderboard from './Learderboard'
import Stats from './Stats'


const RankingSection = () => {
  return (
    <div className="bg-white dark:text-white dark:bg-pm-r12 w-[70%] h-full px-[4%] box-border">
        <Stats/>
        <Learderboard/>
    </div>
  )
}

export default RankingSection