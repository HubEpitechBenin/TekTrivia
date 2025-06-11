import React from 'react'
import Hero from './Hero'
import LoginButton from '../../../components/LoginButton'
import game from '../../../assets/game.jpg'

const LeftSection = () => {
  return (
    <div className="flex flex-col max-w-2xl">
        <div className="bg-white rounded-3xl p-12 border border-gray-100" >
          <div className="text-sm text-center text-gray-500 mb-4 font-medium">
            Introducing Instructional Suite
          </div>
          <h1 className="text-5xl text-center font-bold text-gray-900 leading-tight mb-6">
            Introducing Instructional Suite “I had no idea Quizizz ?could do that.”
          </h1>
          <p className="text-gray-600 text-center mb-8 text-lg leading-relaxed">
            Create and deliver bell-to-bell curriculum ? resources that meet the needs of every student.
          </p>
          <div className="flex justify-between">
            <LoginButton
              className="bg-pm-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-pm-blueHover transition duration-200"
            />
            <LoginButton
              className="bg-pm-blue text-white font-semibold px-4 py-2 rounded-md hover:bg-pm-blueHover transition duration-200"
            />
          </div>
        </div>
    </div>
  )
}



const RightSection = () => {
  return (
    <div className="flex flex-col max-w-xl">
        <div className="relative" >
          <div className="bg-white rounded-3xl p-8">
            <div className="rounded-2xl relative overflow-hidden">
              <img
                src={game}
                alt="Hero Game Image"
                className="object-cover size-[500px]"
              />
            </div>

            {/* Floating elements */}
            <div className="absolute top-4 left-4 w-8 h-8 bg-cyan-400 rounded-full animate-bounce"></div>
            <div className="absolute top-8 right-6 w-6 h-6 bg-pink-400 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-8 w-4 h-4 bg-yellow-400 rounded-full animate-ping"></div>
            <div className="absolute bottom-4 right-4 w-10 h-10 bg-purple-400 rounded-full animate-bounce delay-75"></div>

          </div>
        </div>
    </div>
  )
}



const HeroSection = () => {
  return (
    <section className="flex items-center justify-center min-h-screen px-6">
      <div className="max-w-7xl w-full flex flex-row items-center justify-between gap-0">
        {/* Left Section */}
        <LeftSection/>

        {/* Right Section */}
        <RightSection/>
      </div>
    </section>
  )
}

export default HeroSection