import React from 'react'
import { useNavigate } from 'react-router-dom'

const LoginButton = ({className}) => {
    const navigatTo = useNavigate();

    return (
        <button 
            onClick={() => navigatTo('/login')} 
            className={className}
        >
            Log In
        </button>
    )
}

export default LoginButton
