 import { Children, createContext, useState } from "react";
import axios from 'axios'

  const backendUrl = import.meta.env. VITE_BACKEND_URL
  axios.defaults. backendUrl =  backendUrl
 
 export const AuthContext = createContext();

 export const AuthProvider =({ Children}) =>{
    const [token , setToken] = useState(localStorage.getItem("token"))
    const [authUser , setAuthUser] = useState(null)
     const value ={

     }
 }

 return (
    <AuthContext.Provider value={value}>
        {Children}
    </AuthContext.Provider>
 )