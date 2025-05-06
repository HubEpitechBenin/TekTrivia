import React from 'react'
import { useNavigate } from 'react-router-dom';

import ThemeSwitcher from '../../../components/layout/ThemeSwitcher'

const Navbar = () => {
  return (
    <div className="flex flex-grow my-[3%] justify-between mx-[10%] items-center rounded-md bg-white h-[50px] w-full" >
        <div className="w-[20%] h-full">
          Logo
        </div>
        <div className="w-[60%] h-full">
          Menu
        </div>
        <div className="flex justify-end pr-2 w-[20%] items-center h-full">
          <LoginButton/>
        </div>
      {/* <ThemeSwitcher/> */}
    </div>
  )
}

const LoginButton = () => {
  const navigatTo = useNavigate()
  return (
    <button
      onClick={() => navigatTo('/login')}
      className="bg-pm-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-pm-blueHover transition duration-200"
    >
      Log In
    </button>
  )
}

export default Navbar
