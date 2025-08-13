import React, { useContext } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePages from './pages/HomePage'
import LoginPages from './pages/LoginPages'
import ProfilePages from './pages/ProfilePages'
import { Toaster } from "react-hot-toast"
import { AuthContext } from '../context/AuthContext'

const App = () => {
  const context = useContext(AuthContext)
  const authUser = context?.authUser // Optional chaining to prevent errors

  return (
    <div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Toaster/>
      <Routes>
        <Route path='/' element={authUser ? <HomePages/> : <Navigate to='/login'/>}/>
        <Route path='/login' element={!authUser ? <LoginPages/> : <Navigate to='/'/>}/>
        <Route path='/profile' element={authUser ? <ProfilePages/> : <Navigate to='/login'/>}/>
      </Routes>
    </div>
  )
}

export default App