import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
