import React from 'react'
import TekTriviaLogo from '../../../components/TekTriviaLogo'
import ThemeSwitcher from '../../../components/layout/ThemeSwitcher'
import LoginButton from '../../../components/LoginButton'


const Header = () => {
  return (
    <div className="bg-white border-b border-pm-blue300 items-center justify-between dark:border dark:border-pm-rBorder dark:bg-pm-rBlack dark:text-white flex min-h-[6%] w-full box-border  text-black">
        <div className="w-[70%] px-[4%] flex items-center justify-start">
          <TekTriviaLogo/>
        </div>
        <div className="w-[30%] h-[50%] flex items-center justify-end mx-8 box-border gap-6">
          <ThemeSwitcher
            buttonClassName="relative w-16 h-8 border border-pm-blue300 dark:border-pm-rBorder rounded-2xl overflow-hidden bg-gray-200 dark:bg-pm-r10 transition-colors duration-300"
            spanClassName="absolute top-1 left-1 w-5 h-5 flex items-center justify-center rounded-full
            transition-transform duration-300"
          />
          <LoginButton className="text-[12px] bg-pm-blue dark:bg-transparent flex items-center justify-center p-4 border rounded-2xl dark:border-red-500 h-full box-border text-white"/>
        </div>
    </div>
  )
}

export default Header
