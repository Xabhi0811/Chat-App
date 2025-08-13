import { Children, createContext, useEffect, useState } from "react";
import axios from 'axios'
import toast from "react-hot-toast";
import {io} from "socket.io-client"

const backendUrl = import.meta.env.VITE_BACKEND_URL
axios.defaults.baseURL = backendUrl
 
export const AuthContext = createContext();

export const AuthProvider = ({ Children }) => {
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [authUser, setAuthUser] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const [socket, setSocket] = useState(null)

    // check user is Authorized if so, set the user data and connect 
    const checkAuth = async () => {
        try {
            const {data} = await axios.get("/api/auth/check")
            if(data.success) {
                setAuthUser(data.user)
                connectSocket(data.user)
            }
            checkAuth()
        } catch(error) {
            toast.error(error.message)
        }
    }

    // login function to handle user authentication and socket connection
    const login = async (state, credentials) => {
        try {
            const {data} = await axios.post(`/api/auth/${state}`, credentials)
            if(data.success) {
                setAuthUser(data.userData)
                connectSocket(data.userData)
                axios.defaults.headers.common["token"] = data.token
                setToken(data.token)
                localStorage.setItem("token", data.token)
                toast.success(data.message)
            } else {
                toast.error(data.message)
            }
        } catch(error) {
            toast.error(error.message)
        }
    }

    // logout function to handle user logout and socket disconnection
    const logout = async () => {
        localStorage.removeItem("token")
        setToken(null)
        setAuthUser(null)
        setOnlineUsers([])
        axios.defaults.headers.common["token"] = null
        toast.success("Logged out successfully")
        socket?.disconnect()
    }

    // user can update profile
    const updateProfile = async (body) => {
        try {
            const {data} = await axios.put("/api/auth/update-profile", body)
            setAuthUser(data.user)
            toast.success("Profile updated successfully")
        } catch(error) {
            toast.error(error.message)
        }
    }

    // socket function to handle socket
    const connectSocket = (userData) => {
        if(!userData || socket?.connected) return
        const newSocket = io(backendUrl, {
            query: {
                userId: userData._id,
            }
        })
        newSocket.connect()
        setSocket(newSocket)

        newSocket.on("getOnlineUsers", (userIds) => {
            setOnlineUsers(userIds)
        })
    }

    useEffect(() => {
        if(token) {
            axios.defaults.headers.common["token"] = token
        }
    }, [token])

    const value = {
        axios,
        authUser, 
        onlineUsers,
        socket, 
        login,
        logout,
        updateProfile
    }

    return (
        <AuthContext.Provider value={value}>
            {Children}
        </AuthContext.Provider>  
    )
}