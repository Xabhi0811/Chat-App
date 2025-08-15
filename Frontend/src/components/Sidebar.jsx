import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, unseenMessages, setUnseenMessages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const filteredUsers = input
    ? (users || []).filter((u) => u.fullName?.toLowerCase().includes(input.toLowerCase()))
    : (users || []);

  useEffect(() => {
    getUsers();
  }, [onlineUsers]);

  return (
    <div className={`bg-gray-900 h-full overflow-y-auto text-gray-200 w-full ${
      selectedUser ? 'max-md:hidden' : ''
    }`}>
      {/* Header Section */}
      <div className="sticky top-0 bg-gray-900 z-10 p-4 border-b border-gray-800">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold text-white">QuickChat</h1>
          
          {/* Dropdown Menu */}
          <div className="relative group">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 cursor-pointer text-gray-400 hover:text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-800 border border-gray-700 hidden group-hover:block">
              <div className="py-1">
                <p
                  onClick={() => navigate('/profile')}
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
                >
                  Edit Profile
                </p>
                <p 
                  onClick={() => logout()} 
                  className="block px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 cursor-pointer"
                >
                  Logout
                </p>
              </div>
            </div>
          </div>
        </div>
          
        {/* Search Bar */}
        <div className='bg-gray-800 rounded-lg flex items-center gap-3 py-2 px-4 mt-4'>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            type='text' 
            className='bg-transparent border-none outline-none text-white text-sm placeholder-gray-500 flex-1' 
            placeholder='Search User' 
          />
        </div>
      </div>

      {/* Users List */}
      <div className="divide-y divide-gray-800">
        {filteredUsers.map((user, index) => (
          <div 
            onClick={() => {
              setSelectedUser(user);
              setUnseenMessages(prev => ({...prev, [user._id]: 0}));
            }}
            key={index}
            className={`flex items-center gap-3 p-4 cursor-pointer ${
              selectedUser?._id === user._id 
                ? 'bg-gray-800' 
                : 'hover:bg-gray-800'
            }`}
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center">
                <span className="text-gray-300 font-medium">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
              </div>
              {onlineUsers.includes(user._id) && (
                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-gray-900"></div>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <p className="font-medium text-white truncate">
                {user.fullName}
              </p>
              <p className={`text-xs ${
                onlineUsers.includes(user._id)
                  ? 'text-green-400' 
                  : 'text-gray-500'
              }`}>
                {onlineUsers.includes(user._id) ? 'Online' : 'Offline'}
              </p>
            </div>
            
            {unseenMessages[user._id] > 0 && (
              <div className='ml-auto bg-purple-600 text-white text-xs h-5 w-5 flex items-center justify-center rounded-full'>
                {unseenMessages[user._id]}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;