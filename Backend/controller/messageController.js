import Message from "../models/Message"


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
        res.json({success: false , users: fileredUsers , unseenMessages})

    }
}


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

        await Message.updateManY({senderId: selectedUserId , receiverId: myId}),
        {seen: true}

        res.json({success: true , message})

    } catch(error){
         console.log(error.message)
         res.json({success: false , message: error.message})
    }
}