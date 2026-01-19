import React, { useEffect } from 'react'
import { useChatStore } from '../store/chatStore'
import { XIcon, Menu } from 'lucide-react';
import { useUserAuthStore } from '../store/userAuthStore';

function ChatHeader() {
  const {selectedUser, setSelectedUser, setIsSidebarOpen } = useChatStore();
  const onlineUsers = useUserAuthStore(s => s.onlineUsers);

  const isOnline = onlineUsers.includes(selectedUser?._id);

  useEffect(()=>{
    const handelEscKey = (event)=>{
      if(event.key === "Escape"){setSelectedUser(null)};
    }

    window.addEventListener("keydown", handelEscKey);

    return ()=> window.removeEventListener("keydown", handelEscKey);
  },[setSelectedUser]);

  return (
    <div className="h-14 sm:h-16 shrink-0 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          {/* Mobile menu / back button */}
          <button onClick={()=>setIsSidebarOpen(true)} className="md:hidden btn btn-ghost btn-xs text-slate-400">
            <Menu size={17}/>
          </button>
          <div className='avatar'>
            <div className="size-10 rounded-full relative group overflow-hidden">
              <img src={selectedUser.profilePic || "/avatar.png"} alt="U" className="size-full object-cover"/>
            </div>
          </div>

          <div className="leading-tight">
            <p className="text-white text-sm sm:text-base font-medium">
              {selectedUser.fullName}
            </p>
    
            <p className={`text-[10px] sm:text-xs ${isOnline? "text-green-400": "text-red-400"}`}>
                {isOnline? "● Online" : "● Offline"}
            </p>
          </div>
        </div>

        <button onClick={()=>setSelectedUser(null)} className="btn btn-ghost btn-xs sm:btn-sm text-slate-400">
          <XIcon size="17"/>
        </button>
      </div>
  )
}

export default React.memo(ChatHeader);
