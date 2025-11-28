import {Resend} from "resend";
import dotenv from "dotenv";
dotenv.config();

export const resendClint = new Resend(process.env.RESEND_API_KEY);

export const sender = {
    name : process.env.EMAIL_NAME,
    email : process.env.EMAIL_FROM
}