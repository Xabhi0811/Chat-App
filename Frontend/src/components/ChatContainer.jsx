import React, { useContext, useEffect, useRef, useState } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import { formatMessageTime } from '../lib/utils';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const ChatContainer = () => {
  const {messages, selectedUser, setSelectedUser, sendMessage, getMessages} = useContext(ChatContext)
  const { authUser, onlineUsers } = useContext(AuthContext)
  const scrollEnd = useRef();
  const [input, setInput] = useState('')

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if(input.trim() === "") return null
    await sendMessage({text: input.trim()})
    setInput("")
  }

  const handleSendImage = async (e) => {
    const file = e.target.files[0]
    if (!file || !file.type.startsWith("image/")) {
      toast.error("Select an image file");
      return;
    }
    const reader = new FileReader()
    reader.onloadend = async () => {
      await sendMessage({image: reader.result})
      e.target.value = ""
    }
    reader.readAsDataURL(file)
  }

  useEffect(() => {
    if(selectedUser){
      getMessages(selectedUser._id)
    }
  },[selectedUser])

  useEffect(() => {
    if (scrollEnd.current && messages) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return selectedUser ? (
    <div className="h-full overflow-hidden relative flex flex-col bg-gray-900 rounded-2xl border border-gray-700 shadow-xl">
      {/* ----- Header */}
      <div className="flex items-center gap-3 py-4 px-6 border-b border-gray-700 bg-gray-800">
        <img 
          src={selectedUser.profilePic || assets.avatar_icon} 
          alt="" 
          className="w-9 h-9 rounded-full object-cover border border-gray-600" 
        />
        <p className="flex-1 text-lg text-white font-medium flex items-center gap-2">
          {selectedUser.fullName}
          {onlineUsers.includes(selectedUser._id) && (
            <span className="w-2 h-2 rounded-full bg-green-500" />
          )}
        </p>
        <img
          onClick={() => setSelectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-6 cursor-pointer filter invert opacity-70 hover:opacity-100"
        />
        <img 
          src={assets.help_icon} 
          alt="" 
          className="hidden md:block w-5 filter invert opacity-70" 
        />
      </div>

      {/* ----- Chat Area */}
      <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6 space-y-3 bg-gray-900/50">
        {messages.map((msg, index) => {
          const isUser = msg.senderId !== authUser._id;

          return (
            <div
              key={index}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              {msg.image ? (
                <div className="relative group">
                  <img
                    src={msg.image}
                    alt=""
                    className="max-w-[230px] max-h-[300px] rounded-xl overflow-hidden border-2 border-gray-700 shadow-lg object-cover"
                  />
                  <span className="absolute bottom-2 right-2 text-xs bg-gray-900/70 text-gray-300 px-2 py-1 rounded">
                    {formatMessageTime(msg.createdAt)}
                  </span>
                </div>
              ) : (
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <p
                    className={`p-3 max-w-[250px] text-sm font-normal break-words text-white ${
                      isUser
                        ? 'bg-violet-600 rounded-2xl rounded-br-none'
                        : 'bg-gray-700 rounded-2xl rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </p>
                  <span className="text-xs text-gray-400 mt-1">
                    {formatMessageTime(msg.createdAt)}
                  </span>
                </div>
              )}
            </div>
          );
        })}
        <div ref={scrollEnd}></div>
      </div>
        
      {/*------- bottom area-------*/}
      <div className="sticky bottom-0 left-0 right-0 flex items-center gap-3 p-3 bg-gray-800 border-t border-gray-700">
        <div className="flex-1 flex items-center bg-gray-700 px-3 rounded-full border border-gray-600">
          <input 
            value={input} 
            onChange={(e)=>setInput(e.target.value)} 
            onKeyDown={(e)=>e.key === "Enter" ? handleSendMessage(e) : null} 
            type='text' 
            placeholder='Send a message' 
            className='flex-1 text-sm p-3 bg-transparent border-none outline-none text-white placeholder-gray-400'
          />
          <input 
            onChange={handleSendImage} 
            type='file' 
            id='image' 
            accept='image/png, image/jpeg' 
            hidden
          />
          <label htmlFor='image' className="cursor-pointer hover:opacity-80 transition-opacity">
            <img 
              src={assets.gallery_icon} 
              alt='' 
              className='w-5 mr-2 filter invert opacity-70' 
            />
          </label>
        </div>
        <button 
          onClick={handleSendMessage} 
          className="p-2 bg-violet-600 rounded-full hover:bg-violet-700 transition-colors"
        >
          <img 
            src={assets.send_button} 
            alt='Send' 
            className='w-5 filter invert' 
          />
        </button>
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-3 bg-gray-900 max-md:hidden h-full rounded-2xl border border-gray-700">
      <img src={assets.logo_icon} className="w-16 filter invert opacity-80" alt="" />
      <p className="text-lg font-medium text-gray-300">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;