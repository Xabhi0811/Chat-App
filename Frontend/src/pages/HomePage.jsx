import React, { useState } from 'react'
import Sidebar from '../components/Sidebar'
import RightSidebar from '../components/RightSidebar'
import ChatContainer from '../components/ChatContainer'


const Homepage = () => {
  const [selectedUser , setselectedUser] = useState(false)

  return (
    <div className='border w-full h-screen'>
      <div className={`border-2  backdrop-blur-xl border-gray-600 rounded-2xl overflow-hidden h-[100%] grid grid-cols-1 relative 
        ${selectedUser ? 'md:grid-cols-[1fr_1.5fr_1fr] xl:grid-cols-[1fr_2fr_1fr]' :'md:grid-cols-2'}`}>
        <Sidebar setselectedUser={setselectedUser} selectedUser={selectedUser}/>
        <ChatContainer  setselectedUser={setselectedUser} selectedUser={selectedUser}/>
         <RightSidebar  setselectedUser={setselectedUser} selectedUser={selectedUser}/>
      </div>
    </div>
  )
}

export default Homepage
