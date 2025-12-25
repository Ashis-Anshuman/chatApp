import { create } from 'zustand';

export const useUserAuthStore = create((set)=>({
    authUser: { name: "Ashis", _id: 125, age: 20 },
    isLogedIn: false,

    login: ()=>{
        console.log("login")
        set({
            isLogedIn: true
        })

    },
}));