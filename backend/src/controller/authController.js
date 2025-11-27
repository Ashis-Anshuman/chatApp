import User from "./models/userModel.js";
import bcrypt from "bcryptjs";

export const signUp = async (req, res)=>{
    const {fullName, email, password} = req.body

    try {
        if(!fullName || !email || !password){
        return res.staus(400).json({message : "All field are required!!"});
        }

        if(password.length<8){
            return res.staus(400).json({message : "Password atleast 8 character"});
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)){
            return res.staus(400).json({message : "Invalid email"})
        }

        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.staus(400).json({message : "Existing user"});
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)
        const newUser = new User({
            fullName, 
            email, 
            password: hashPass
        });
        if(newUser){
            newUser.save();
        }else{
            return res.status(400).json({message:"Invalid user data"})
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({message:"Internal server error"});
    }

    
}