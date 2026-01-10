import {create} from 'zustand';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useChatStore = create((set, get)=>({
    chats: [],
    messages: [],
    contacts: [],
    isUsersLoading: false,
    isChatsLoading: false,
    selectedUser: null,
    activeTab: "chats",
    isSidebarOpen: false,
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toogleSound: ()=>{
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({isSoundEnabled: !get().isSoundEnabled});
        // console.log(isSoundEnabled);
    },

    setIsSidebarOpen: (value)=>{
        set({isSidebarOpen: value});
    },

    setActiveTab: (tab)=>{
        set({activeTab: tab});
    },

    setSelectedUser: (selectedUser) => set({ selectedUser }),

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
        try {
            const res = await apiInstance.get(`/messages/${id}`);
            set({messages: res.data});

            toast.success("Your messages are here");
        } catch (error) {
            toast.error(error.response.data.message || "Can't find your messages");
            console.error("can't find messages", error);
        }
    }
}))