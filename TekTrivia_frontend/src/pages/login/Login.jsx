import React, { useState } from "react";
import SignInForm from './components/SignInForm'
import SignUpForm from './components/SignUpForm'
import ToggleBox from './components/ToggleBox'
import TogglePanelLeft from './components/TogglePanelLeft'
import TogglePanelRight from './components/TogglePanelRight'

const Login = () => {
  const [isActive, setIsActive] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen bg-pm-blue600">
      <Container isActive={isActive} setIsActive={setIsActive} />
    </div>
  )
}

const Container = ({isActive, setIsActive}) => {
  return (
    <div className="relative w-[850px] h-[500px] bg-white rounded-[30px] overflow-hidden transition-all duration-500">
      <SignInForm isActive={isActive}/>
      <SignUpForm isActive={isActive}/>
      <ToggleBox isActive={isActive}/>
      <TogglePanelLeft isActive={isActive} setIsActive={setIsActive} />
      <TogglePanelRight isActive={isActive} setIsActive={setIsActive} />
    </div>
  )
}

export default Login;
