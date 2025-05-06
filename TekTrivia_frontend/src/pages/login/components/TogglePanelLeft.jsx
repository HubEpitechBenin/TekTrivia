import React from 'react'

const TogglePanelLeft = ({isActive, setIsActive}) => {
  return (
    <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white z-10 transition-all duration-900 ease-in-out ${isActive ? 'left-[-250%]': 'right-0 '}`}>
      <h1 className="text-3xl font-semibold mb-2">Hello, Welcome!</h1>
      <p className="mb-4">Don't have an account?</p>
      <button onClick={() => setIsActive(true)} className="w-40 h-11 border-2 border-white text-white rounded-lg cursor-pointer ">Register</button>
    </div>
  )
}

export default TogglePanelLeft