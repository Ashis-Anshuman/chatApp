import { create } from 'zustand';
import {apiInstance} from '../lib/axios';
import toast from 'react-hot-toast';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useUserAuthStore = create((set)=>({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,

    checkAuth: async ()=>{
        try {
            const res = await apiInstance.get('/auth/check');
            set({
                authUser: res.data
            })
        } catch (error) {
            console.error("Error checking auth:", error);
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signUp: async (data)=>{
        set({isSigningUp:true});
        try {
            const res = await apiInstance.post('/auth/signUp', data);
            console.log(data);
            set({authUser: res.data});

            toast.success("SignUp successfully!");
            
        } catch (error) {
            console.error("Error during signUp:", error);
            toast.error(error.response.data.message);
        }finally{
            set({isSigningUp:false});
        }
    },

    login: async (data)=>{
        set({isLoggingIn:true});
        try {
            const res = await apiInstance.post('/auth/login', data);
            set({authUser: res.data});

            toast.success("Login successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
            
        }finally{
            set({isLoggingIn:false});
        }
    }
}));