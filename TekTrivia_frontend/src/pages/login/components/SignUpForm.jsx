import React from 'react'

const SignUpForm = ({isActive}) => {
  return (
    <div className={`absolute ${isActive ? 'right-0' : '-right-1/2'} w-1/2 h-full flex flex-col items-center justify-center text-gray-800 px-10 z-10 transition-all duration-700 ease-in-out`}>
        <form className="w-full flex flex-col justify-center items-center">

            {/* Sign Up text */}
            <h2 className="text-3xl font-bold text-pm-blue mb-4">Sign Up</h2>

            {/* Microsoft Logo section */}
            <div className="mb-4">
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                    alt="Microsoft Logo"
                    className="w-10 h-10"
                />
            </div>
            <p className="text-sm text-gray-600 mb-6">Or use your email for registration</p>

            {/* Email input section */}
            <div className="relative w-full my-2 flex flex-col justify-center items-center">
                <input
                    type="text"
                    placeholder="tektrivia@epitech.eu"
                    className="w-full px-4 py-2 mb-3 border rounded-2xl placeholder-gray-500 bg-gray-200 focus:outline-none"
                    required
                />
                <i className='bx bxs-envelope absolute right-5 -translate-y-1/2 text-xl text-gray-500'></i>
            </div>

            {/* Password input section */}
            <div className="relative w-full my-2 flex flex-col justify-center items-center">
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full px-4 py-2 mb-3 border rounded-2xl placeholder-gray-500 bg-gray-200 focus:outline-none"
                    required
                />
                <i className='bx bxs-lock-alt absolute right-5 -translate-y-1/2 text-xl text-gray-500'></i>
            </div>

            {/* Confirm Password input section */}
            <div className="relative w-full my-2 flex flex-col justify-center items-center">
                <input
                    type="password"
                    placeholder="Confirm password"
                    className="w-full px-4 py-2 mb-3 border rounded-2xl placeholder-gray-500 bg-gray-200 focus:outline-none"
                    required
                />
                <i className='bx bxs-lock-alt absolute right-5 -translate-y-1/2 text-xl text-gray-500'></i>
            </div>

            {/* Sign UP button section */}
            <button type="submit" className="w-full bg-pm-blue text-white py-2 rounded-full font-semibold hover:bg-pm-blue-600 transition duration-200">
                SIGN UP
            </button>
        </form>
    </div>
  )
}

export default SignUpForm