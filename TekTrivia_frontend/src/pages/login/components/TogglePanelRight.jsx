import React from 'react'

const TogglePanelRight = ({isActive, setIsActive}) => {
  return (
    <div className={`absolute w-1/2 h-full flex flex-col justify-center items-center text-white z-10 transition-all duration-900 ease-in-out ${isActive ? 'left-0 delay-150': '-left-1/2'}`}>
      <h1 className="text-3xl font-semibold mb-2">Welcome Back!</h1>
      <p className="mb-4">Already have an account?</p>
      <button onClick={() => setIsActive(false)} className="w-40 h-11 border-2 border-white text-white rounded-lg">Login</button>
    </div>
  )
}

export default TogglePanelRight