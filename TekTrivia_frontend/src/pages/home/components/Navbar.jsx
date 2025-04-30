import React from 'react'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className="m-5 bg-white h-[10%] w-full" >
      <LoginButton/>
    </div>
  )
}

const LoginButton = () => {
  const navigate = useNavigate();

  const LoginPage = () => {
    navigate('/login');
  };
  
  return (
    <button onClick={LoginPage} className="bg-pm-blue text-white font-semibold px-4 py-2 rounded hover:bg-[#093F68] transition duration-200">
      Login
    </button>
  )
}

export default Navbar
