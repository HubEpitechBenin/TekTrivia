import React from 'react'
import ThemeSwitcher from '../../../components/layout/ThemeSwitcher'

const Header = () => {
  return (
    <div className="bg-gray-200 flex min-h-[6%] w-full box-border text-black">
        <ThemeSwitcher/>
    </div>
  )
}

export default Header
