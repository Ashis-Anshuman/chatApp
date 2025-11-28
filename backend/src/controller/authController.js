import User from "../models/userModel.js";
import { generateToken } from "../lib/webToken.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import dotenv from "dotenv";
dotenv.config();

export const signUp = async (req, res)=>{
    const {fullName, email, password} = req.body;
    // console.log(fullName);
    // console.log(email);
    // console.log(password);

    try {
        if(!fullName || !email || !password){
        return res.status(400).json({message : "All field are required!!"});
        }

        if(password.length<8){
            return res.status(400).json({message : "Password atleast 8 character"});
        }

        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)){
            return res.status(400).json({message : "Invalid email"})
        }

        const existingUser = await User.findOne({email:email});
        if(existingUser){
            return res.status(400).json({message : "Existing user"});
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)  //password hashing
        const newUser = new User({
            fullName, 
            email, 
            password: hashPass
        });
        if(newUser){
            const savedUser = await newUser.save();
            generateToken(newUser._id, res)  //webtoken generated

            
            res.status(201).json({
                message: "User has created",
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            })
            
            try {
                console.log("fgdgf")
                await sendWelcomeEmail(savedUser.fullName, savedUser.email, process.env.CLINT_URL);
            } catch (error) {
                console.error("unable to send email", error)
            }
            

        }else{
            return res.status(400).json({message:"Invalid user data"})
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Internal server error"});
    }

}