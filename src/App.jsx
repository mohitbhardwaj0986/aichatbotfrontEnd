import React from 'react'
import Home from './pages/Home'
import ChatbotContainer from './pages/ChatbotContainer'
import { Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/chat' element={<ChatbotContainer/>} />
      </Routes>
    </div>
  )
}

export default App