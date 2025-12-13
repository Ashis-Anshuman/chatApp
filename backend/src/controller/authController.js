import User from "../models/userModel.js";
import { generateToken } from "../lib/webToken.js";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../email/emailHandler.js";
import dotenv from "dotenv";
import { error } from "console";
import { measureMemory } from "vm";
import cloudinary from "../lib/cloudinary.js";
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
                // await sendWelcomeEmail(savedUser.fullName, savedUser.email, process.env.CLINT_URL);  //sending succesfully signup email
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


export const login = async (req, res)=>{
    const {email, password} = req.body;

    console.log(email);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!regex.test(email)){
            return res.status(400).json({message : "Invalid email"});
        }

    const loginUser = await User.findOne({email});
    try {
        if(loginUser){
            console.log("email sucess");
            try {
                const isMatch = await bcrypt.compare(password, loginUser.password);
                if(!isMatch){
                    return res.status(401).json({message: "Incorrect email or password"})
                }
                generateToken(loginUser._id, res);

                return res.status(200).json({
                    message: "login sucessfully",
                    _id: loginUser._id,
                    fullName: loginUser.fullName,
                    email: loginUser.email
                })
            } catch (error) {
                console.error("unable to compare password", error)
            }
            
        }else{
            return res.status(401).json({message: "Incorrect email or password"})
        }
        
    } catch (error) {
        console.error("unable to login", error)
        res.status(500).json({message: "Internal server error"})
    }
}

export const logout = async (req, res)=>{
    try{
        res.cookie("jwt_token", "", {
        maxAge:0,
        })
        res.status(200).json({message: "Logout sucessfully"});
    }catch(error){
        console.error("unable to logout", error)
        res.status(500).json({message: "Internal server error"});
    }
    
}

export const updateProfile = async (req, res)=>{
    try {
        const {profilePic}= req.body;
        if(!profilePic){return res.status(404).json({message: "No content"})};
        
        const userId = req.user._id;
        const uploadPic = await cloudinary.uploader.upload(profilePic);

        const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadPic.secure_url}, {new:true});

        res.status(200).json({message:"Updated succesfully"});
    } catch (error) {
        console.error("unable to update profile", error);
        res.status(500).json({message: "Internal server error"});
    }
}