import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [unseenMessages, setUnseenMessages] = useState({});

  const { socket, axios } = useContext(AuthContext);

  // Fetch all users and unseen messages
  const getUsers = async () => {
    if (!axios) return;
    try {
      const { data } = await axios.get("/api/message/users");
      if (data.success) {
        setUsers(data.users);
        setUnseenMessages(data.unseenMessages || {});
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Fetch messages for selected user
  const getMessages = async (userId) => {
    if (!axios) return;
    try {
      const { data } = await axios.get(`/api/message/${userId}`);
      if (data.success) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error("Error in getMessages:", error);
    }
  };

  // Send message to selected user
  const sendMessage = async (messageData) => {
    if (!selectedUser || !axios) return;
    try {
      const { data } = await axios.post(`/api/message/send/${selectedUser._id}`, messageData);
      if (data.success) {
        setMessages((prev) => [...prev, data.newMessage]);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Handle incoming messages via socket
  const handleNewMessage = (newMessage) => {
    const senderId = newMessage.senderId;

    if (selectedUser && senderId === selectedUser._id) {
      // If message is from current chat, mark as seen and add
      newMessage.seen = true;
      setMessages((prev) => [...prev, newMessage]);
      axios.put(`/api/message/mark/${newMessage._id}`);
    } else {
      // Increment unseen messages for other users
      setUnseenMessages((prev) => ({
        ...prev,
        [senderId]: prev[senderId] ? prev[senderId] + 1 : 1,
      }));
    }
  };

  // Subscribe to socket messages
  useEffect(() => {
    if (!socket) return;
    socket.on("newMessage", handleNewMessage);

    return () => {
      socket.off("newMessage", handleNewMessage);
    };
  }, [socket, selectedUser]);

  // When a user is selected, fetch messages and mark unseen as seen
  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);

      // Mark all unseen messages as seen
      if (unseenMessages[selectedUser._id]) {
        axios.put(`/api/message/markAll/${selectedUser._id}`);
        setUnseenMessages((prev) => ({
          ...prev,
          [selectedUser._id]: 0,
        }));
      }
    }
  }, [selectedUser]);

  // Optional: real-time unseen messages count in sidebar
  useEffect(() => {
    // Update sidebar users with latest unseen count
    if (users.length) {
      setUsers((prevUsers) =>
        prevUsers.map((user) => ({
          ...user,
          unseen: unseenMessages[user._id] || 0,
        }))
      );
    }
  }, [unseenMessages]);

  const value = {
    messages,
    users,
    selectedUser,
    getUsers,
    getMessages,
    sendMessage,
    setSelectedUser,
    unseenMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
