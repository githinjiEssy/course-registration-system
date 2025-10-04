import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import StudentDashboard from './components/Dashboard/StudentDashboard'
import InstructorDashboard from './components/Dashboard/InstructorDashboard'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/student' element={<StudentDashboard/>}/>
        <Route path='/instructor' element={<InstructorDashboard/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
