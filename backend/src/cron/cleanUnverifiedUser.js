import cron from 'node-cron';
import User from '../models/userModel.js';

export const cleanFakeUsers = () =>{
    cron.schedule('* * * * *', async ()=>{
        try {
            // await User.de
        } catch (error) {
            
        }
    })
}