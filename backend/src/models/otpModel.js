import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
    email:{
        type: String,
        require: true
    },
    otpHash:{
        type: String,
    },
    expiresAt:{
        type: Date
    }
})

const Otp = mongoose.model("Otp", otpSchema);

export default Otp;