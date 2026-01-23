import {create} from 'zustand';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useUserAuthStore } from './userAuthStore';

export const useChatStore = create((set, get)=>({
    chats: [],
    messages: [],
    contacts: [],
    isUsersLoading: false,
    isMessagesLoading: false,
    selectedUser: null,
    activeTab: "chats",
    isSidebarOpen: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toogleSound: ()=>{
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({isSoundEnabled: !get().isSoundEnabled});
        // console.log(get().isSoundEnabled);
    },

    setIsSidebarOpen: (value)=>{
        set({isSidebarOpen: value});
    },

    setActiveTab: (tab)=>{
        set({activeTab: tab});
    },

    setSelectedUser: (selectedUser) => set({ selectedUser, isSidebarOpen: false}),

    getAllContacts: async ()=>{
        set({isUsersLoading: true});
        try {
            const res = await apiInstance.get('/messages/contacts');
            set({contacts: res.data});
        } catch (error) {
            toast.error(error.response.data.message || "Failed to get contacts");
        }finally{
            set({isUsersLoading: false});
        }
    },

    getAllChatPatners: async ()=>{
        set({isUsersLoading: true});
        try {
            const res = await apiInstance.get('/messages/chats');
            set({chats: res.data})
        } catch (error) {
            toast.error(error.response.data.message || "Failed to get chats");
        }finally{
            set({isUsersLoading: false})
        }
    },

    getMessageById: async (id)=>{
        set({isMessagesLoading: true});
        try {
            const res = await apiInstance.get(`/messages/${id}`);
            set({messages: res.data});

            toast.success("Chat as you please");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to load");
            console.error("can't find messages", error);
        }finally{
            set({isMessagesLoading: false});
        }
    },

    sendMessage: async (data)=>{
        const {selectedUser, messages} = get();
        const {authUser} = useUserAuthStore.getState();

        const tempId = `temp-${Date.now()}`;
        const tempMessage = {
            _id: tempId,
            senderId: authUser._id,
            receverId: selectedUser._id,
            text: data.text,
            image: data.image,
            createdAt: new Date().toISOString()
        }
        set({messages: [...messages, tempMessage]});
        
        try {
            const res = await apiInstance.post(`/messages/send/${selectedUser._id}`, data);
            set({messages: messages.concat(res.data)})
        } catch (error) {
            set({messages: messages});
            toast.error(error.response?.data?.message || "Somthing went wrong");
            console.error("error in send message", error);
        }
    },

    subscribeToMessage: ()=>{
        const selectedUser = get().selectedUser;
        if(!selectedUser) return;

        const socket = useUserAuthStore.getState().socket;

        socket.on("newMessage", (newMessage)=>{
            if(selectedUser._id !== newMessage.senderId) return;
            const msg = get().messages;
            set({messages: [...msg,newMessage]});

            if(get().isSoundEnabled){
                const notificationSound = new Audio("/sounds/notification.mp3");
                
                notificationSound.currentTime = 0;
                notificationSound.play().catch((error)=> console.log("error in notificationSound", error));
            };
        });
    },

    unSubscribeToMessage: ()=>{
        const socket = useUserAuthStore.getState().socket;
        socket.off("newMessage");
    }
}))