import React, { useEffect, useRef } from 'react';
import assets, { messagesDummyData } from '../assets/assets';
import { formatMessageTime } from '../lib/utils';

const ChatContainer = ({ selectedUser, setselectedUser }) => {
  const scrollEnd = useRef();

  useEffect(() => {
    if (scrollEnd.current) {
      scrollEnd.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return selectedUser ? (
    <div className="h-full overflow-hidden relative flex flex-col bg-gradient-to-br from-[#181a23]
     to-[#13141b] backdrop-blur-lg rounded-2xl border border-gray-700 shadow-lg">
      {/* ----- Header */}
      <div className="flex items-center gap-3 py-4 px-6 border-b border-gray-700">
        <img src={assets.profile_martin} alt="" className="w-9 h-9 rounded-full" />
        <p className="flex-1 text-lg text-white font-medium flex items-center gap-2">
          Martin Johnson
          <span className="w-2 h-2 rounded-full bg-green-500" />
        </p>
        <img
          onClick={() => setselectedUser(null)}
          src={assets.arrow_icon}
          alt=""
          className="md:hidden w-6 cursor-pointer"
        />
        <img src={assets.help_icon} alt="" className="hidden md:block w-5" />
      </div>

      {/* ----- Chat Area */}
      <div className="flex flex-col flex-1 overflow-y-auto px-4 py-6 space-y-2">
        {messagesDummyData.map((msg, index) => {
          const isUser = msg.senderId === '680f50e4f3cd28382ecf9';

          return (
            <div
              key={index}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
            >
              {msg.img ? (
                <img
                  src={msg.image}
                  alt=""
                  className="max-w-[230px] rounded-xl overflow-hidden border border-gray-700 shadow"
                />
              ) : (
                <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}>
                  <p
                    className={`p-3 max-w-[250px] text-sm font-normal break-words text-white ${
                      isUser
                        ? 'bg-violet-600/30 rounded-2xl rounded-br-none'
                        : 'bg-violet-800/30 rounded-2xl rounded-bl-none'
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
        
         {/*------- bottom area-------*/ }

         <div className="absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3">
           <div className=" flex-1 flex items-center bg-gray-100/12 px-3 rounded-full">
            <input type='text' placeholder='Send a message ' 
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'/>
             <input type='file' id='image' accept='image/png, image/jpeg' hidden/>
             <label htmlFor='image'>
              <img src={assets.gallery_icon} alt='' className='w-5 mr-2 cursor-pointer' />
             </label>
           </div>
           <img src={assets.send_button} alt='' className='w-7 cursor-pointer' />
         </div>





    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-3 text-gray-500 bg-white/5 max-md:hidden h-full rounded-2xl">
      <img src={assets.logo_icon} className="w-16" alt="" />
      <p className="text-lg font-medium text-white">Chat anytime, anywhere</p>
    </div>
  );
};

export default ChatContainer;