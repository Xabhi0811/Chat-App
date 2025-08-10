import User from "../models/models"
import{generateToken} from '../lib/utils'
import bcrypt from "bcrypt"




//Sign-up function

export const  Sign = async (req ,res) =>{

    const { fullName , password , email  , bio} = req.body

    try{

         if(!fullName ,!password, !email, !bio)
         {
            return res.json({msg: "All field are reqired"})
         }
             
         const user = User.findOne({email})
         if(user){
             return res.status(400).json({msg: "Email Already used"})
         }

         const salt = brcyit.gensalt(10)
         const hashedPassword = await bcrypt.hash(password, salt)


         const newUser = await User.create({
           
            fullName,
            password: hashedPassword,
            bio,
            email,

         })

   const token = generateToken(newUser._id)
  res.json({success: true , token , userData: newUser , msg: "Account Created Successfully"})

    }     

     catch(error)
     {
        console.log(error.message)
         res.json({success: false, msg: "Account not Created "})

     }
}


// Login function

 export const Login = async (req, res) =>{
    try{

        const {email , password} = req.body
        const userData =  await User.findOne({email})

        const isPasswordCorrect = await bcrypt.compare(password ,userData.password)

        if(!isPasswordCorrect){
          return res.json({success: true , token , userData: newUser , msg: "Account Created Successfully"})
        }
            
          const token = generateToken(userData._id)

           res.json({success: true , token , userData: newUser , msg: "Account Created Successfully"})

     }
    catch(error){
          console.log(error.message)
         res.json({success: false, msg: "Account not Created "})
    }
 }


 //user authenticaticated
 export const checkAuth = (req, res) =>{
    res.json({success: true , user: req.user})
 }


// user profile update 

export const updateProfile = async (req, res)=>{
    try{

        const {profilePic, bio , fullName} = req.body

        const userId = req.user._id
        let updateUser
        if(!profilePic){
            await User.findByAndUpdate(userId , {bio ,fullName}, {new: true})
        }else{
            const upload = await
        }

    } catch(error){

    }

}







