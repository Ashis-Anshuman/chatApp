import { resendClint, sender } from "../lib/resend.js";
import { createWelcomeEmailBody } from "./emailBody.js";

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

    console.error("Sucessfully send the email ", data)
}