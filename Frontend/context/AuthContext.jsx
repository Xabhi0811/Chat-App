import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios';
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const backendUrl = import.meta.env.VITE_BACKEND_URL;
axios.defaults.baseURL = backendUrl;

export const AuthContext = createContext();

// Custom hook for easier context consumption
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [authUser, setAuthUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [socket, setSocket] = useState(null);

  // Check if user is authenticated
  const checkAuth = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return; // No token, no need to check

    const { data } = await axios.get("/api/auth/check", {
      headers: {
        Authorization: `Bearer ${token}` // ✅ Send token to backend
      }
    });

    if (data.success) {
      setAuthUser(data.user);
      connectSocket(data.user);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

  // Handle login/signup
  const login = async (state, credentials) => {
    try {
      const { data } = await axios.post(`/api/auth/${state}`, credentials);
      if (data.success) {
        setAuthUser(data.userData);
        connectSocket(data.userData);

        // ✅ Set Authorization header globally
        axios.defaults.headers.common["Authorization"] = `Bearer ${data.token}`;
        setToken(data.token);
        localStorage.setItem("token", data.token);

        toast.success(data.message);
        return data;
      } else {
        toast.error(data.message);
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
      throw error;
    }
  };

  // Handle logout
  const logout = async () => {
    localStorage.removeItem("token");
    setToken(null);
    setAuthUser(null);
    setOnlineUsers([]);
    axios.defaults.headers.common["Authorization"] = null;
    toast.success("Logged out successfully");
    socket?.disconnect();
  };

  // Update user profile
  const updateProfile = async (body) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const { data } = await axios.put("/api/auth/update-profile", body, {
        headers: {
          Authorization: `Bearer ${token}` // ✅ Always use Bearer token
        }
      });

      if (data.success) {
        setAuthUser(data.user);
        toast.success("Profile updated successfully");
        return data;
      }
      throw new Error(data.message || "Profile update failed");
    } catch (error) {
      if (error.response?.status === 401) {
        logout();
        toast.error("Session expired. Please login again.");
      } else {
        toast.error(error.response?.data?.message || error.message);
      }
      throw error;
    }
  };

  // Connect to socket
  const connectSocket = (userData) => {
    if (!userData || socket?.connected) return;
    const newSocket = io(backendUrl, {
      query: { userId: userData._id },
    });
    newSocket.connect();
    setSocket(newSocket);

    newSocket.on("getOnlineUsers", (userIds) => {
      setOnlineUsers(userIds);
    });
  };

  useEffect(() => {
    if (token) {
      // ✅ Ensure Authorization header is set on reload
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      checkAuth();
    }
  }, [token]);

  const value = {
    authUser,
    onlineUsers,
    socket,
    login,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
