import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext)
  const { logout, onlineUsers } = useContext(AuthContext)
  const [msgImages, setMsgImages] = useState([])

  useEffect(() => {
    setMsgImages(
      messages.filter(msg => msg.image).map(msg => msg.image)
    )
  }, [messages])

  return selectedUser && (
    <div className={`bg-gray-800 text-gray-200 w-full relative overflow-y-auto border-l border-gray-700
      ${selectedUser ? "max-md:hidden" : ""}`}>
      
      {/* Profile Section */}
      <div className="pt-8 pb-4 flex flex-col items-center gap-3 text-center px-4">
        <img 
          src={selectedUser?.profilePic || assets.avatar_icon} 
          alt="" 
          className="w-24 h-24 rounded-full object-cover border-2 border-gray-600 shadow-md" 
        />
        <h1 className="text-xl font-medium flex items-center gap-2 mt-2">
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
          )}
          {selectedUser.fullName}
        </h1>
        <p className="text-gray-400 text-sm max-w-xs">{selectedUser.bio}</p>
      </div>
      
      <hr className="border-gray-700 my-4" />
      
      {/* Media Section */}
      <div className="px-4 pb-16">
        <p className="text-sm font-medium text-gray-300 mb-3">Shared Media</p>
        <div className="max-h-[250px] overflow-y-auto">
          <div className="grid grid-cols-2 gap-3">
            {msgImages.map((url, index) => (
              <div 
                className="cursor-pointer rounded-md overflow-hidden border border-gray-700 hover:border-purple-500 transition-all"
                key={index} 
                onClick={() => window.open(url)}
              >
                <img 
                  className="w-full h-24 object-cover hover:scale-105 transition-transform" 
                  src={url} 
                  alt="" 
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Logout Button */}
      <button 
        onClick={() => logout()}
        className="sticky bottom-4 left-0 right-0 mx-auto w-[calc(100%-2rem)] bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium py-2 px-4 rounded-full cursor-pointer hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg"
      >
        Logout
      </button>
    </div>
  );
};

export default RightSidebar;