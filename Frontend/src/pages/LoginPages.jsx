import React, { useState } from 'react'
import assets from '../assets/assets'


{/*bio dono me a rha hai */ }
const LoginPages = () => {
  const [currState , setCurrState] = useState('Sign-up')
    const [fullName , setFullName] = useState('')
      const [email , setEmail] = useState('')
        const [password , setPassword] = useState('')
          const [isDataSubmitted , setIsDataSubmitted ] = useState(false)
          const[bio , setBio] = useState('')
          
          const onSubmitHandler=(event)=>{
            event.perventDefault();

            if(currState === 'Sign-up' && !isDataSubmitted)
            {
              setIsDataSubmitted(true)
              return 
            }
          }


  return (
    <div className=' min-h-screen bg-cover bg-center flex items-center
    justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>

      {/* -------left-------*/}

      <img className='w-[min(30vw,250px)]' src={assets.logo_big} alt='' />

      {/* -------right-------*/}
       
      
        <form  onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex
        flex-col gap-6 rounded-lg shadow-lg'>
          <h2 className='font-medium text-2xl flex justify-between items-center'>{currState}
            {isDataSubmitted &&    <img onClick={()=>setIsDataSubmitted(false)} src={assets.arrow_icon} alt='' className='w-5 cursor-pointer' /> }
         
          </h2>
          {currState=== "Sign-up" && ! isDataSubmitted && (<input value={fullName} onChange={(e)=>{ setFullName(e.target.value)
            
               }} type='text' className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
               focus:ring-indigo-500'
          placeholder='Full Name' required />)}

          {!isDataSubmitted &&(
            <>
               <input value={email} onChange={(e)=>{ setEmail(e.target.value)
            
               }}  type='text' placeholder='email' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
               focus:ring-indigo-500'/>



                 <input value={password} onChange={(e)=>{ setPassword(e.target.value)
            
               }}  type='password' placeholder='password' required className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2
               focus:ring-indigo-500'/>


            </>
          )}
                   
                   {
                     
                     <textarea  required value={bio} onChange={(e)=>setBio(e.target.value)} placeholder='provide a short bio.....' rows={4}
                     className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500
                     '
                     ></textarea>
                     
                   }
                   

                   <button type='sumbit' className='py-3 bg-gradient-to-r from-purple-400
                   to-violet-600 text-white rounded-md cursor-pointer'>
                    {currState === "Sign-up" ? "Create Account": "Login Now"}
                   </button>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <input type='checkbox'/>
                    <p> Agress to the terms of use & privacy policy.</p>
                  </div>
                 

                 <div className="flex flex-col gap-2">
                  {currState === "Sign-up" ? (<p className='text-sm text-gray-600'>Already have an account?
                     <span onClick={()=>{setCurrState('Login'); setIsDataSubmitted(false)}} className='font-medium text-violet-500 cursor-pointer'>Login here</span></p>) :
                     (<p className='text-sm text-gray-600'>Create an account
                      <span onClick={()=>{setCurrState('Sing-up')}} className='font-medium text-violet-500 cursor-pointer'>Click here</span></p>)}
                 </div>
          
        </form>
    

    </div>
  )
}

export default LoginPages
