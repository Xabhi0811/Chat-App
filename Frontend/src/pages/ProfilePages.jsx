import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import assets from '../assets/assets'
import { AuthContext } from '../../context/AuthContext'

const ProfilePages = () => {
  
  const {authUser, updateProfile} = useContext(AuthContext)
  const [selectedImg, setSelectedImg] = useState(null)
  const navigate = useNavigate()
  const [name, setName] = useState(authUser.fullName)
  const [bio, setBio] = useState(authUser.bio)

  const handlerSubmit = async (e) => {
    e.preventDefault()
    if(!selectedImg){
      await updateProfile({fullName: name , bio})
       navigate('/')
       return;
    }

    const reader = new FileReader()
    reader.readAsDataURL(selectedImg)
    reader.onload = async ()=>{
      const base64Image = reader.result
     
      await updateProfile({profilePic: base64Image , fullName: name , bio})
      navigate('/')
    }
  }

  return (
    <div className='min-h-screen bg-gray-900 flex items-center justify-center p-4'>
      <div className="w-full max-w-2xl bg-gray-800 text-gray-200 border border-gray-700 
      flex items-center justify-between max-sm:flex-col-reverse rounded-lg shadow-xl
      overflow-hidden">
        <form onSubmit={handlerSubmit} className='flex flex-col gap-5 p-8 flex-1'>
          <h3 className='text-xl font-medium text-white'>Profile details</h3>
          
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer text-gray-300 hover:text-white transition-colors'>
            <input 
              onChange={(e) => setSelectedImg(e.target.files[0])}
              type='file' 
              id='avatar' 
              accept='.png, .jpg, .jpeg' 
              hidden
            />
            <img 
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
              alt='' 
              className={`w-12 h-12 rounded-full object-cover ${selectedImg ? 'border-2 border-purple-500' : 'filter invert opacity-80'}`} 
            />
            <span>Upload profile image</span>
          </label>
          
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            type='text' 
            required 
            placeholder='Your name'
            className='p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none 
            focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400'
          />
          
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            placeholder='Write profile bio' 
            className='p-3 bg-gray-700 border border-gray-600 rounded-md focus:outline-none 
            focus:ring-2 focus:ring-purple-500 text-white placeholder-gray-400' 
            rows={4} 
            required
          ></textarea>
          
          <button 
            className='bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 
            hover:to-indigo-700 text-white py-3 rounded-md text-lg font-medium cursor-pointer 
            transition-all shadow-md' 
            type='submit'
          >
            Save
          </button>
        </form>
        
        <div className='p-8 flex items-center justify-center bg-gray-900/50 max-sm:w-full max-sm:py-6'>
          <img 
            className={`w-40 h-40 rounded-full object-cover border-4 border-gray-700 shadow-lg ${selectedImg && 'border-purple-500'}`} 
            src={authUser?.profilePic || assets.logo_icon} 
            alt='Profile' 
          />
        </div>
      </div>
    </div>
  )
}

export default ProfilePages