import React from 'react'
import Header from './components/Header'
import HeroSection from './components/HeroSection'

const Home = () => {
  return (
    <div className="min-h-screen bg-pm-blue">
      <div className="container mx-auto px-4">
        <Header/>
        <HeroSection/>
        <HeroSection/>
        <HeroSection/>
        <HeroSection/>
        <HeroSection/>
      </div>
    </div>
  )
}

export default Home