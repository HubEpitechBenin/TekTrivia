import React from 'react'

const MostAttemptQuizElement = ({title, image, attemptCount}) => {
  return (
    <div className="h-[19%] flex px-2 items-center justify-between border-b border-pm-blue300 dark:border-gray-500 box-border">
        <div className="flex items-center">
            <p className="items-center">
                <span className="text-2xl text-pm-blue dark:text-gray-300">{image}</span>
            </p>
            <p className="pl-3 items-center">
                <span className="text-[17px]"> {title} </span>
            </p>
        </div>
        <div className="border-l-2 border-pm-blue300 dark:border-gray-500 pl-[6%]">
            <p className="text-black dark:text-gray-300 text-[15px]">{attemptCount} attempt</p>
        </div>
    </div>
  )
}

export default MostAttemptQuizElement