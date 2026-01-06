import User from "../models/userModel.js";
import { generateToken } from "../lib/webToken.js";
import bcrypt from "bcryptjs";
import { sendOtpEmail, sendWelcomeEmail } from "../email/emailHandler.js";
import dotenv from "dotenv";
import { error } from "console";
import cloudinary from "../lib/cloudinary.js";
import { otp } from "../lib/otpGenerate.js";
import Otp from "../models/otpModel.js";
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
            // if(!existingUser.isEmailVerified){

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
            let otpCode = otp();
            if(otpCode){
                try {
                    const otpHashCode = await bcrypt.hash(otpCode, salt);
                    await Otp.deleteMany({email: savedUser.email});
                    await Otp.create({
                        email: savedUser.email,
                        otpHash: otpHashCode,
                        expiresAt: Date.now() + 10 * 60 * 1000 // 10 min
                    })
                    await sendOtpEmail(savedUser.fullName, savedUser.email, otpCode);
                } catch (error) {
                    console.error("Unable to send Otp",error);
                }finally{
                    otpCode = null;
                }
            }
            
            return res.status(201).json({message:"Verify OTP"});

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
                if(!loginUser.isEmailVerified){
                    return res.status(400).json({message: "You are not a Verified User"});
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
        
        const userId = req.user._id;
        const uploadPic = await cloudinary.uploader.upload(profilePic);

        const updateUser = await User.findByIdAndUpdate(userId, {profilePic:uploadPic.secure_url}, {new:true});

        res.status(200).json(updateUser);
    } catch (error) {
        console.error("unable to update profile", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const verifyOtp = async (req, res)=>{
    const {email, otpCode} = req.body;
    console.log(email, otpCode);
    try {
        const otpRecord = await Otp.findOne({email});
        if(!otpRecord){
            return res.status(400).json({message: "OTP not Found"});
        }
        if(otpRecord.expiresAt < Date.now()){
            return res.status(400).json({message: "Expired OTP"});
        }

        const isValidOtp = await bcrypt.compare(otpCode, otpRecord.otpHash);
        if(!isValidOtp){
            return res.status(400).json({message: "Invalid OTP"})
        }
        await Otp.deleteOne({email});

        const user = await User.findOne({email});
        const updateEmialVerified = await User.updateOne({email},{$set:{isEmailVerified: true}});
        if(!updateEmialVerified){
            return res.status(404).json({message: "Unable to update verfied status"});
        }
        generateToken(user._id, res);

        res.status(201).json({
            message: "User has created",
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        });

        try {
            await sendWelcomeEmail(user.fullName, user.email, process.env.CLIENT_URL);  //sending succesfully signup email
        } catch (error) {
            console.error("unable to send email", error);
        }

    } catch (error) {
        console.error("Unable to Verify OTP", error);
        res.status(500).json({message: "Internal Server Error"});
    }
}