import React from 'react'

const ToggleBox = ({isActive}) => {
  return (
    <div className="absolute w-full h-full">
      <div className={`absolute w-[300%] right-[-250%] h-full bg-pm-blue rounded-[150px] z-0 transition-all duration-700 ease-in-out ${isActive ? 'right-[50%]' : ''}`}></div>
    </div>
  )
}

export default ToggleBox
