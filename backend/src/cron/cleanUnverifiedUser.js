import cron from 'node-cron';
import User from '../models/userModel.js';

export const cleanFakeUsers = () =>{
    cron.schedule('0 * * * *', async ()=>{
        try {
            await User.deleteMany({
            isVerified: false,
            createdAt: { $lt: new Date(Date.now() - 24 * 60 * 60 * 1000) }
        });
        } catch (error) {
            console.error("Error in corn job", error);
        }
    })
}