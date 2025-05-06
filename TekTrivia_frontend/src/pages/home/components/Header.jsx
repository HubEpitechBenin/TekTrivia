import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <div className="bg-pm-blue rounded-sm flex items-center min-h-[8%] w-full fixed">
      <Navbar/>
    </div>
  )
}

export default Header