import Message from "../models/messageModel.js";
import User from "../models/userModel.js";
import cloudinary from "../lib/cloudinary.js";

export const getContacts = async (req, res)=>{
    try {
        const userId = req.user._id;
        const contact = await User.find({_id:{$ne:userId}}).select(["-password", "-email"]);

        res.status(200).json(contact);
    } catch (error) {
        console.error("unable to fetch contact", error);
        res.status(500).json({message: "Internal server error"});
    }
}

export const getChatPatners = async (req, res)=>{
    try {
        const myUserId = req.user._id;
        const chats = await Message.find({
            $or:[
                {senderId:myUserId},
                {receiverId:myUserId}
            ],
        }).select(["-text", "-image"]);
        
        const chatPatnersID = [
            ...new Set(
                chats.map((chat)=>
                    chat.senderId.toString() === myUserId.toString() ? chat.receiverId.toString() : chat.senderId.toString()
                )
            )
        ];

        const chatPatners = await User.find({_id: {$in:chatPatnersID}}).select(["-password", "-email"]);

        res.status(200).json(chatPatners);

    } catch (error) {
        console.error("Unable to get chat patners", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const getMessages = async (req, res)=>{
    try {
        const myUserId = req.user._id;
        const {id:receivedUserId} = req.params;

        const messages = await Message.find({
            $or:[
                {senderId:myUserId, receiverId:receivedUserId},
                {senderId:receivedUserId, receiverId:myUserId}
            ],
        });
        res.status(200).json(messages);
    } catch (error) {
        console.error("Unable to fetch messsages", error);
        res.status(500).json({message:"Internal server error"});
    }
}

export const sendMessage = async (req, res)=>{
    try {
        const {text, image} = req.body;
        const senderId = req.user._id;
        const {id:receiverId} = req.params;

        const receverExist = await User.exists({_id:receiverId});
        if(!receverExist){
            return res.status(404).json({message:"Recever not found"});
        }
        
        let imageUrl;
        if(image){
            const uploadImage = await cloudinary.uploader.upload(imageUrl);
            imageUrl = uploadImage.secure_url;
        }

        const newMessage = new Message ({
            senderId,
            receiverId,
            text,
            image: imageUrl
        })

        const save = await newMessage.save();

        res.status(200).json(receiverId);

    } catch (error) {
        console.error("Unable to send message", error);
        res.status(500).json({message:"Internal server error"});
    }
}