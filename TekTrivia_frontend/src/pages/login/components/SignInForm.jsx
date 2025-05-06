import React from 'react'

const SignInForm = ({isActive}) => {
  return (
    <div className={`absolute ${isActive ? '-left-1/2' : 'left-0'} w-1/2 h-full flex flex-col items-center justify-center text-gray-800 px-10 z-10 transition-all duration-700 ease-in-out`}>
        <form className="w-full flex flex-col justify-center items-center">
          {/* Sign In text */}
          <h2 className="text-3xl font-bold text-pm-blue mb-4">Sign In</h2>

          {/* Microsoft Logo section */}
          <div className="mb-4">
              <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg"
                  alt="Microsoft Logo"
                  className="w-10 h-10"
              />
          </div>
          <p className="text-sm text-gray-600 mb-6">Or use your email password</p>

          {/* Email input section */}
          <div className="relative w-full my-2 flex flex-col justify-center items-center">
            <input
                type="text"
                placeholder="Email"
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

          {/* Forgot password link section */}
          <div className="mb-4 text-sm">
            <a href="#" className="text-pm-blue">Forgot your password ?</a>
          </div>

          {/* Sign In button section */}
          <button type="submit" className="w-full bg-pm-blue text-white py-2 rounded-full font-semibold hover:bg-pm-blue-600 transition duration-200">
              SIGN IN
          </button>

          <p className="text-gray-600 text-sm mt-4 text-center">
              By logging in you agree to the,
              <a href="#" className="text-blue-700 ml-1 underline">Privacy Policy</a>
          </p>
        </form>
    </div>
  )
}

export default SignInForm