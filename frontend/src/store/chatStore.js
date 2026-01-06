import {create} from 'zustand';
import { apiInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useChatStore = create((set, get)=>({
    chats: [],
    messages: [],
    allContacts: [],
    isUsersLoading: false,
    isChatsLoading: false,
    selectedUser: true,
    activeTab: "chats",
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toogleSound: ()=>{
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({isSoundEnabled: !get().isSoundEnabled});
        // console.log(isSoundEnabled);
    },

    setActiveTab: (tab)=>{
        set({activeTab: tab});
    },

    getAllContacts: async ()=>{
        set({isUsersLoading: true});
        try {
            const res = await apiInstance.get('/messages/contacts');
            set({allContacts: res.data});
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading: false});
        }
    },

    getAllChatPatners: async ()=>{
        set({isUsersLoading: false});
        try {
            const res = await apiInstance.get('/message/chats');
            set({chats: res.data})
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}))