import React from 'react'
import { useNavigate } from 'react-router-dom'
import TekTriviaLogo from '../../../components/TekTriviaLogo'
import LoginButton from '../../../components/LoginButton'

import ThemeSwitcher from '../../../components/layout/ThemeSwitcher'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between">
        <TekTriviaLogo
          className="w-32 h-32"
        />
        <div className="w-[60%] h-full">
          Menu
        </div>
        <div className="flex justify-end pr-2 w-[20%] items-center h-full">
          <LoginButton 
            className="bg-pm-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-pm-blueHover transition duration-200"
          />
        </div>
        <ThemeSwitcher/>
    </nav>
  )
}

export default Navbar
