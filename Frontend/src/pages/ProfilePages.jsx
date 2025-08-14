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
    <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center'>
      <div className="w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2
      border-gray-600 flex items-center justify-between max-sm:flex-col-reverse
      rounded-lg">
        <form onSubmit={handlerSubmit} className='flex flex-col gap-5 p-10 flex-1'>
          <h3 className='text-lg'>Profile details</h3>
          <label htmlFor='avatar' className='flex items-center gap-3 cursor-pointer'>
            <input 
              onChange={(e) => setSelectedImg(e.target.files[0])} // Fixed files here
              type='file' 
              id='avatar' 
              accept='.png, .jpg, .jpeg' 
              hidden
            />
            <img 
              src={selectedImg ? URL.createObjectURL(selectedImg) : assets.avatar_icon} 
              alt='' 
              className={`w-12 h-12 ${selectedImg && 'rounded-full'}`} 
            />
            Upload profile image
          </label>
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)}
            type='text' 
            required 
            placeholder='Your name'
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-violet-500'
          />
          <textarea 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            placeholder='Write profile bio' 
            className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
            focus:ring-violet-500' 
            rows={4} 
            required
          ></textarea>
          <button 
            className='bg-gradient-to-r from-purple-400 to-violet-600
            text-white p-2 rounded-full text-lg cursor-pointer' 
            type='submit'
          >
            Save
          </button>
        </form>
        <img 
          className={`max-w-42 aspect-square rounded-full max-10 max-sm:mt-10 ${selectedImg && 'rounded-full'}`} 
          src={ authUser?.profilePic ||assets.logo_icon} 
          alt='' 
        />
      </div>
    </div>
  )
}

export default ProfilePages