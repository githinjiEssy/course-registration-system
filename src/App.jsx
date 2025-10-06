import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterForm from './components/RegisterForm'
import LoginForm from './components/LoginForm'
import StudentDashboard from './components/Dashboard/StudentDashboard'
import InstructorDashboard from './components/Dashboard/InstructorDashboard'
import Sidebar from './components/Sidebar'
import CourseRegistration from './components/Dashboard/CourseRegistration'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/' element={<RegisterForm />} />
        <Route path='/login' element={<LoginForm />} />
        <Route path='/student' element={<StudentDashboard/>}/>
        <Route path='/instructor' element={<InstructorDashboard/>}/> */}
        {/* <Route path='/' element={<Sidebar/>}/> */}
        <Route path='/' element={<StudentDashboard/>}/>
        <Route path='/course_registration' element={<CourseRegistration/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
