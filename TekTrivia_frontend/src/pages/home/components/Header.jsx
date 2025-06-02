import React from 'react'
import Navbar from './Navbar'

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full bg-white/90 border border-gray-200 rounded-2xl mx-auto max-w-7xl mt-6 px-6 shadow-lg">
      <Navbar/>
    </header>
  )
}

export default Header