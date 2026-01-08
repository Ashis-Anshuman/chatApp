import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/chatStore';
import UsersLoadingSkeleton from './UsersLoadingSkeleton';

// const users = [
//   { id: 1, name: "Olivia Miller", online: true },
//   { id: 2, name: "Sophia Davis", online: false },
//   { id: 3, name: "William Clark", online: true },
//   { id: 4, name: "John Doe", online: false }
// ];

function ChatsList() {
//  const [selectedChat, setSelectedChat] = useState(null);
 const {getAllChatPatners, isUsersLoading, chats, selectedUser, setSelectedUser} =  useChatStore();

 useEffect(()=>{
  getAllChatPatners();
 },[getAllChatPatners])

 if(isUsersLoading){return <UsersLoadingSkeleton/>}
 
  return (
    <div className="flex-1 overflow-y-auto px-2">
          {chats.map((user) => (
            <div
              key={user._id}
              onClick={() => setSelectedUser(user)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition ${
                selectedUser?._id === user._id
                  ? "bg-blue-600/10"
                  : "hover:bg-slate-800/50"
              }`}
            >
            <div className='flex items-center gap-3'>
              <div className='avatar online'>
                <div className="size-12 rounded-full">
                <img src={user.profilePic || "/avatar.png"} alt={user.fullName} />
              </div>
              </div>
            </div>

              <div>
                <p className="text-sm text-white">{user.fullName}</p>
                <p className="text-xs text-slate-500">Last message...</p>
              </div>
            </div>
          ))}
        </div>
  )
}

export default ChatsList
