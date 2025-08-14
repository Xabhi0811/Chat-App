import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePages from './pages/HomePage'
import LoginPages from './pages/LoginPages'
import ProfilePages from './pages/ProfilePages'
import { Toaster } from "react-hot-toast"
import { useAuth } from '../context/AuthContext' // Using the custom hook

const App = () => {
  const { authUser } = useAuth() // Destructure directly from the hook

  return (
    <div className="bg-[url('../assets/bgImage.svg')] bg-contain"> {/* Fixed path */}
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