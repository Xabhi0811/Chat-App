import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePages from './pages/HomePage'
import LoginPages from './pages/LoginPages'
import ProfilePages from './pages/ProfilePages'

const App = () => {
  return (
    < div className="bg-[url('./src/assets/bgImage.svg')] bg-contain">
      <Routes>
        <Route path='/' element={<HomePages/>}/>
         <Route path='/login' element={<LoginPages/>}/>
          <Route path='/profile' element={<ProfilePages/>}/>
      </Routes>
    </div>
  )
}

export default App
