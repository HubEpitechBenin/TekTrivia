import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import PageTransition from './components/layout/PageTransition'
import Rank from "./pages/ranking/Rank"
import Dashboard from "./pages/dashboard/Dashboard"

function App() {
  return (
    <>
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/rank" element={<Rank />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </>
  )
}

export default App
