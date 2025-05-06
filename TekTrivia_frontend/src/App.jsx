import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home'
import Login from './pages/login/Login'
import PageTransition from './components/layout/PageTransition'
import Rank from "./pages/ranking/Rank"

function App() {
  return (
    <>
      <BrowserRouter>
        <PageTransition>
          <Routes>
            <Route path="/rank" element={<Rank />} />
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </PageTransition>
      </BrowserRouter>
    </>
  )
}

export default App
