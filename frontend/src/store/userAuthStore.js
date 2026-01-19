import { create } from 'zustand';
import {apiInstance} from '../lib/axios';
import toast from 'react-hot-toast';
import { io } from 'socket.io-client';

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useUserAuthStore = create((set, get)=>({
    authUser: null,
    pendingEmail: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLoggingIn: false,
    showOtp: false,
    isValidingOtp: false,
    isUpdatingProfile: false,
    socket: null,
    onlineUsers: [],

    checkAuth: async ()=>{
        try {
            const res = await apiInstance.get('/auth/check');
            set({
                authUser: res.data
            })
            get().connectSocket();
        } catch (error) {
            console.error("Error checking auth:", error);
            set({authUser: null});
        }finally{
            set({isCheckingAuth: false});
        }
    },

    signUp: async (data)=>{
        set({isSigningUp:true,
            pendingEmail: data.email
        });
        try {
            const res = await apiInstance.post('/auth/signUp', data);
            console.log(data);
            set({showOtp:true});
            toast.success("Verify your Email");
            
            get().connectSocket();

        } catch (error) {
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

            get().connectSocket();

        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isLoggingIn:false});
        }
    },

    logout: async ()=>{
        try {
            await apiInstance.post('/auth/logout');
            set({authUser:null});

            get().disConnectSocket();
            toast.success("Logout Successfully");

        } catch (error) {
            toast.error(error.response.data.message);
        }
    },

    updateProfile: async (data)=>{
        set({isUpdatingProfile: true});
        console.log("data");
        try {
            const res = await apiInstance.put('/auth/updateProfile', data);
            set({authUser: res.data});
            toast.success("Successfully Update the profile");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isUpdatingProfile: false});
        }
    },

    verifyOtp: async (data)=>{
        set({isValidingOtp: true});
        try {
            console.log(data);
            const res = await apiInstance.post('/auth/verifyEmail', data);
            set({pendingEmail:null,
                authUser: res.data
            });

            toast.success("OTP Verified");
        } catch (error) {
            toast.error(error.response.data.message);
        }finally{
            set({isValidingOtp: false,
                pendingEmail:null
            });
        }
    },

    connectSocket: ()=>{
        const {authUser} = get();
        if(!authUser || get().socket?.connected) return;

        const socket = io(BASE_URL, {withCredentials:true});

        socket.connect();
        set({socket});

        socket.on("online-users", (userIds)=>{
            set({onlineUsers: userIds});
        });
    },

    disConnectSocket: ()=>{
        if(get().socket?.connected){ get().socket.disconnect()};
        set({socket: null});
    }
}));