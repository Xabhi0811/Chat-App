import Message from "../models/Message.js"
import {io , userSocketMap} from "../server.js"


export const getUsersForSlidebar = async (req , res)=>{
    try{
        const userId = req.user._id
        const  fileredUsers = await User.find({_id: {$ne: userId}}).select("-password")

          //count unseenMessages no
        const unseenMessages = {}
        const promises = fileredUsers.map(async (user)=>{
             const message = await Message.find({senderId: user._id , receiverId: userId , seen: false})
             if(message.length > 0)
             {
                unseenMessages[userId._id] = message.length
             }
        })

        await Promise.all(promises)
        res.json({success: true , users: fileredUsers , unseenMessages})

    } catch(error){
        console.log(error.message)
        res.json({success: false , message: error.message})

    }
}

// get all message for selected user

export const getMessages = async (req, res) =>{
    try{
        
        const  {id: selectedUserId} = req.params
        const myId = req.user._id
           
        const message = await  Message.find({
            $or:[
                {senderId: myId , receiverId: selectedUserId},
                {senderId: selectedUserId , receiverId: myId}
            ]

        })

        await Message.updateManY({senderId: selectedUserId , receiverId: myId},
        {seen: true})

        res.json({success: true , message})

    } catch(error){
         console.log(error.message)
         res.json({success: false , message: error.message})
    }
}

   // message seen using message id
 export const markMessageAsSeen = async (req , res) =>{
    try{
         const { id } = req.params
         await Message.findByIdAndUpdate(id , {seen: true})
         res.josn({success: true})

    } catch(error){
        console.log(error.message)
        res.json({success: false , message: error.message})

    }
 }



 
//send message to selected user

export const sendMessage = async (req , res) =>{
    try {
          const { text , image} = req.body
          const receiverId = req.params._id
          const senderId = req.user._id

          let imageUrl
          if(image){
            const uploadResponse = await cloudinary.uploader.upload(image)
              imageUrl = uploadResponse.secure_url
          }

          const newMessage = await Message.create({
            senderId,
            receiverId,
            text,
            image: imageUrl
          })

          // receiver socket id for new message

          const receiverSocketId = userSocketMap[receiverId]
          if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage" , newMessage)
          }

          res.json({success: true, newMessage})
    } catch(error)
    {
        console.log(error.message)
        res.json({success: false , message: error.message})
    }

}
