import User from "../models/userModel.js";
import { generateToken } from "../lib/webToken.js";
import bcrypt from "bcryptjs";
import { sendOtpEmail, sendWelcomeEmail } from "../email/emailHandler.js";
import dotenv from "dotenv";
import { otp } from "../lib/otpGenerate.js";
import Otp from "../models/otpModel.js";
dotenv.config();

export const sendOtp = async (savedUser)=>{
    let otpCode = otp();
    if(otpCode){
        try {
            const salt = await bcrypt.genSalt(10);
            const otpHashCode = await bcrypt.hash(otpCode, salt);
            await Otp.deleteMany({email: savedUser.email});
            await Otp.create({
                email: savedUser.email,
                otpHash: otpHashCode,
                expiresAt: Date.now() + 10 * 60 * 1000 // 10 min
            })
            try {
                await sendOtpEmail(savedUser.fullName, savedUser.email, otpCode);
            } catch (error) {
                console.error("Unable to send otp email", error);
            }
        }catch (error) {
            console.error("Unable to send Otp",error);
        }finally{
            otpCode = null;
        }
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