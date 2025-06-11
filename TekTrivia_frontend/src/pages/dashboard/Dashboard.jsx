import React from 'react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Hero from './components/Hero'
import CategoryFilter from './components/CategoryFilter'
import QuizGrid from './components/QuizGrid'


const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="ml-20">
        <Header/>
        <main className="p-8">
          <Hero/>
          <CategoryFilter/>
          <QuizGrid/>
        </main>
      </div>
    </div>
  )
}

export default Dashboard