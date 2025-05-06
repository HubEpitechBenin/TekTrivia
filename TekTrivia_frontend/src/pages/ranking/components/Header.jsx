import React from 'react'
import ThemeSwitcher from '../../../components/layout/ThemeSwitcher'

const Header = () => {
  return (
    <div className="bg-gray-200 dark:border dark:border-pm-rBorder dark:bg-pm-rBlack dark:text-white flex min-h-[6%] w-full box-border text-black">
        <ThemeSwitcher/>
    </div>
  )
}

export default Header
