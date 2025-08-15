import React, { useContext, useState } from 'react'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'
import { ChatContext } from '../../context/ChatContext'


const Homepage = () => {
  const {selectedUser} = useContext(ChatContext)

  return (
    <div className='border w-full h-screen'>
      <div className={`border-2  backdrop-blur-xl border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative 
        ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' :'md:grid-cols-2'}`}>
        <Sidebar />
        <ChatContainer />
         <RightSidebar />
      </div>
    </div>
  )
}

export default Homepage
