import { resendClint, sender } from "../lib/resend.js";
import { createWelcomeEmailBody } from "./emailBody.js";
import { createOtpEmailBody } from "./otpEmail.js";

export const sendWelcomeEmail = async(fullName, email, clintUrl) => {
    console.log(email);
    const {error, data} = await resendClint.emails.send({
        from:`${sender.name}, <${sender.email}>`,
        to: email,
        subject: "Welcome to the App",
        html: createWelcomeEmailBody(clintUrl, fullName)
    })

    if(error){
        console.error("Error sending email:", error);
        res.status(500).json({message:"Failed to send"})
    }

    console.log("Sucessfully send the email ", data)
}

export const sendOtpEmail = async (fullName, email, otpCode)=>{
    console.log(email);
    const {error, data} = await resendClint.emails.send({
        from:`${sender.name},<${sender.email}>`,
        to:email,
        subject:"Email Authentication",
        html: createOtpEmailBody(otpCode, fullName)
    })
    
    if(error){
        console.error("Unable to send OTP email", error);
        res.status(500).json({message:"Unable to send OTP"});
    }

    console.log("OTP send sucessfully", data);
}