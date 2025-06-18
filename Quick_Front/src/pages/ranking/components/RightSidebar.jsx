import React from 'react'
import MostAttemptQuiz from './MostAttemptQuiz'
import MostPopularBlogs from "./MostPopularBlogs";

const RightSidebar = () => {
  return (
    <div className="w-[30%] flex flex-1 overflow-hidden flex-col h-full box-border dark:border-x dark:border-pm-rBorder shadow-md dark:shadow-none text-black dark:text-white">
        <MostAttemptQuiz/>
        <MostPopularBlogs/>
    </div>
  )
}

export default RightSidebar