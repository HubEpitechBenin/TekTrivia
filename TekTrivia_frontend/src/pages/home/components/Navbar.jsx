import React from 'react'
import { useNavigate } from 'react-router-dom';

import ThemeSwitcher from '../../../components/layout/ThemeSwitcher'

const Navbar = () => {
  return (
    <div className="flex-grow m-5 bg-white h-[10%] w-full" >
      <LoginButton/>
      <ThemeSwitcher/>
    </div>
  )
}

const LoginButton = () => {
  const navigatTo = useNavigate()
  return (
    <button
      onClick={() => navigatTo('/login')}
      className="bg-pm-blue text-white font-semibold px-4 py-2 rounded hover:bg-[#093F68] transition duration-200"
    >
      Login
    </button>
  )
}

export default Navbar
