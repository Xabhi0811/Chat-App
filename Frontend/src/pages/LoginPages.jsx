import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import assets from '../assets/assets';

const LoginPages = () => {
  const [currState, setCurrState] = useState('Sign-up');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDataSubmitted, setIsDataSubmitted] = useState(false);
  const [bio, setBio] = useState(''); 
  const navigate = useNavigate();
  const { login } = useAuth();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      if (currState === 'Sign-up') {
        if (!isDataSubmitted) {
          setIsDataSubmitted(true);
          return;
        }
        await login('signup', { fullName, email, password, bio });
      } else {
        await login('login', { email, password });
      }
      navigate('/');
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  return (
    <div className='min-h-screen bg-cover bg-center flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl'>
      {/* Logo section */}
      <img className='w-[min(30vw,250px)]' src={assets.logo_big} alt='' />

      {/* Form section */}
      <form onSubmit={onSubmitHandler} className='border-2 bg-white/8 text-white border-gray-500 p-6 flex flex-col gap-6 rounded-lg shadow-lg'>
        <h2 className='font-medium text-2xl flex justify-between items-center'>
          {currState}
          {isDataSubmitted && currState === 'Sign-up' && (
            <img 
              onClick={() => setIsDataSubmitted(false)} 
              src={assets.arrow_icon} 
              alt='back' 
              className='w-5 cursor-pointer' 
            />
          )}
        </h2>

        {currState === 'Sign-up' ? (
          <>
            {!isDataSubmitted ? (
              <>
                <input 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  type='text'
                  placeholder='Full Name'
                  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  required
                />
                <input 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  placeholder='Email'
                  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  required
                />
                <input 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  placeholder='Password'
                  className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                  required
                />
              </>
            ) : (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder='Provide a short bio.....'
                rows={4}
                className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
                required
              />
            )}
          </>
        ) : (
          <>
            <input 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Email'
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
            <input 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password'
              className='p-2 border border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500'
              required
            />
          </>
        )}

        <button 
          type='submit'
          className='py-3 bg-gradient-to-r from-purple-400 to-violet-600 text-white rounded-md cursor-pointer'
        >
          {currState === 'Sign-up' 
            ? (isDataSubmitted ? 'Complete Sign Up' : 'Continue') 
            : 'Login Now'}
        </button>

        {currState === 'Sign-up' && !isDataSubmitted && (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <input type='checkbox' required />
            <p>Agree to the terms of use & privacy policy.</p>
          </div>
        )}

        <div className="flex flex-col gap-2">
          {currState === 'Sign-up' ? (
            <p className='text-sm text-gray-600'>
              Already have an account?{' '}
              <span 
                onClick={() => {
                  setCurrState('Login');
                  setIsDataSubmitted(false);
                }}
                className='font-medium text-violet-500 cursor-pointer'
              >
                Login here
              </span>
            </p>
          ) : (
            <p className='text-sm text-gray-600'>
              Create an account{' '}
              <span 
                onClick={() => {
                  setCurrState('Sign-up');
                  setIsDataSubmitted(false);
                }}
                className='font-medium text-violet-500 cursor-pointer'
              >
                Click here
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default LoginPages;