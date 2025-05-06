import React from 'react'
import MostAttemptQuiz from './MostAttemptQuiz'
import MostPopularBlogs from "./MostPopularBlogs";

const RightSidebar = () => {
  return (
    <div className="w-[30%] flex flex-col h-full box-border shadow-md text-black">
        <MostAttemptQuiz/>
        <MostPopularBlogs/>
    </div>
  )
}

export default RightSidebar