import { Children, createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext()

export const ChatProvider = ({children}) =>{
    const [ messages, setMessages] = useState([])
     const [ users, setUsers] = useState([])
      const [ selectedUser, setSelectedUser] = useState(null)
         const [ unseenMessages,  setUnseenMessages] = useState({})

         const {socket , axios} = useContext(AuthContext)



         //function to get user in sidebar
         const getUsers = async () =>{
            console.log("Fetching users..."); 
            if (!axios) return;
            try {
               const {data}  =  await axios.get("/api/message/users")
                console.log("Users response:", data);

               if(data.success){
                setUsers(data.users) // this for list of all users 
                setUnseenMessages(data.unseenMessages)
               }
            } catch (error) {
                toast.error(error.message)
            }
         }       
        
         // ab selected user ke liye messages

         const getMessages = async (userId) =>{
            try {
                  const {data} = await axios.get(`/api/message/${userId}`)
                  if(data.message){
                    setMessages(data.messages)
                  }
            } catch (error) {
                 toast.error(error.message)
            }

         }


         //  seleted user ko message sen karne ke liye 
           const sendMessages = async (messageData)=>{
            try {

                const {data} = await axios.post(`/api/message/send/${selectedUser._id}`, messageData);

                if(data.success){
                    setMessages((prevMessages)=>[...prevMessages, data.newMessage])
                } else{
                    toast.error(data.message)
                }
                
            } catch (error) {
                  toast.error(error.message)
            }
           }


           //function to subcribe to messages for selected user

           const subscribeToMessages = async () =>{
            if(!socket) return 
             
            socket.on("Message" , (newMessage)=>{
                if(selectedUser && newMessage.senderId === selectedUser._id){
                    newMessage.seen = true
                     setMessages((prevMessages)=>[...prevMessages,newMessage])
                     axios.put(`/api/message/mark/${newMessage._id}`)
                } else{
                    setUnseenMessages((prevUnseenMessages)=>({
                     ...prevUnseenMessages,[newMessage.senderId] : 
                     prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages
                     [newMessage.senderId] + 1 : 1
                    }))
                }
            })
           }


      //ab  unsbcribe messages ke liye 
      
      const  unsubscribeFromMessages = () =>{
        if(socket) socket.off("newMessage")
      }

      useEffect(()=>{
        subscribeToMessages()
        return ()=> unsubscribeFromMessages()

      },[socket , selectedUser])




   
    const value ={
        messages, users , selectedUser , getUsers,
        setMessages, sendMessages,
        setSelectedUser , unseenMessages, setUnseenMessages

    }


    return (<ChatContext.Provider value={value}>
            
            {children}
    </ChatContext.Provider>)
}