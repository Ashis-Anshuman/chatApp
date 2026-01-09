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
    isSoundEnabled: JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

    toogleSound: ()=>{
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({isSoundEnabled: !get().isSoundEnabled});
        // console.log(isSoundEnabled);
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
            toast.error(error.response.data.message);
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
            toast.error(error.response.data.message);
        }finally{
            set({isUsersLoading: false})
        }
    }
}))