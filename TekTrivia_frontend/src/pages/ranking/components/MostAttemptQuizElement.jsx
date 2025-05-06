import React from 'react'

const MostAttemptQuizElement = ({title, image, attemptCount}) => {
  return (
    <div className="h-[19%] flex p-4 items-center justify-between border-b border-pm-blue-300">
        <div>
            <p className="items-center">
                <span className="text-2xl text-pm-blue">{image}</span>
            </p>
        </div>
        <div className="border-l-2 border-pm-blue-300 pl-[7%]">
            <p className="text-black text-[15px]">{attemptCount} attempt</p>
        </div>
    </div>
  )
}

export default MostAttemptQuizElement