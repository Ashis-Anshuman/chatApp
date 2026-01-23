import User from "../models/userModel.js";
import { generateToken } from "../lib/webToken.js";
import bcrypt from "bcryptjs";
// import { sendOtpEmail, sendWelcomeEmail } from "../email/emailHandler.js";
import dotenv from "dotenv";
import { error } from "console";
import cloudinary from "../lib/cloudinary.js";
import { sendOtp } from "./otpController.js";
dotenv.config();

export const signUp = async (req, res)=>{
    const {fullName, email, password} = req.body;

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
            // if(!existingUser.isEmailVerified){
            //     await sendOtp(existingUser);
            //     return res.status(200).json({message: "Otp is resend to your email"});
            // }

            return res.status(400).json({message : "Existing user"});
        }

        const salt = await bcrypt.genSalt(10)
        const hashPass = await bcrypt.hash(password,salt)  //password hashing
        const newUser = new User({
            fullName, 
            email, 
            password: hashPass,
            isEmailVerified: false
        });
        if(newUser){
            const savedUser = await newUser.save();
            // const isOtpSend = await sendOtp(savedUser);
            // if(!isOtpSend){return res.status(400).json({message: "Something went wrong"})};        //For send otp to verify email
            // return res.status(201).json({message:"Verify OTP"});

            generateToken(newUser._id, res);

            res.status(201).json({
                message: "User has created",
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            });

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
            try {
                const isMatch = await bcrypt.compare(password, loginUser.password);
                if(!isMatch){
                    return res.status(401).json({message: "Incorrect email or password"})
                }
                // if(!loginUser.isEmailVerified){
                //     return res.status(400).json({message: "You are not a Verified User"});
                // }
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
            return res.status(401).json({message: "Incorrect email or password"});
        }
        
    } catch (error) {
        console.error("unable to login", error);
        res.status(500).json({message: "Internal server error"});
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

        if (req.user.profilePicPublicId) {
            await cloudinary.uploader.destroy(req.user.profilePicPublicId);
        }
        
        const userId = req.user._id;
        const uploadPic = await cloudinary.uploader.upload(profilePic, {folder: "profile"});

        const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadPic.secure_url, profilePicPublicId: uploadPic.public_id}, {new:true});

        res.status(200).json(updateUser);
    } catch (error) {
        console.error("unable to update profile", error);
        res.status(500).json({message: "Internal server error"});
    }
}

