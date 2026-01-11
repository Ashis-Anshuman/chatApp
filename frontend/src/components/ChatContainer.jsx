import { MoreVertical, Paperclip, Send, Smile, XIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useChatStore } from '../store/chatStore'
import MessageLoadingSkeleton from './MessageLoadingSkeleton';



function ChatContainer() {
  const {setIsSidebarOpen, selectedUser, isMessagesLoading, getMessageById, setSelectedUser, messages} = useChatStore();

  useEffect(()=>{
    getMessageById(selectedUser._id);
  },[selectedUser, getMessageById])

  if(isMessagesLoading){return <MessageLoadingSkeleton/>}
  return (
    <main className="flex-1 flex flex-col min-h-0 bg-slate-900/30 backdrop-blur-xl">
      {/* Header */}
      <div className="h-14 sm:h-16 shrink-0 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          {/* Mobile menu / back button */}
          <button onClick={()=>setIsSidebarOpen(true)} className="md:hidden btn btn-ghost btn-xs text-slate-400">
            ☰
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
            <p className="text-[10px] sm:text-xs text-green-500">
              ● Online
            </p>
          </div>
        </div>

        <button onClick={()=>setSelectedUser(null)} className="btn btn-ghost btn-xs sm:btn-sm text-slate-400">
          <XIcon size="17"/>
        </button>
      </div>


      {/* Messages */}
      <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4">
        {messages.map((msg)=>(
          msg.senderId===selectedUser._id? 
          <div className="flex items-start gap-2 sm:gap-3">
            <div className='avatar'>
              <div className="size-8 rounded-full overflow-hidden relative group">
                <img src={selectedUser.profilePic || "/avatar.png"} alt="" className='size-full object-cover'/>
              </div>
            </div>
            <div className="bg-slate-800/70 rounded-2xl rounded-tl-none px-3 py-2 max-w-[85%] sm:max-w-md">
              <p className="text-sm text-white">
                {msg.text}
              </p>
            </div>
          </div>
          : <div className="flex justify-end">
          <div className="bg-blue-600/80 rounded-2xl rounded-tr-none px-3 py-2 max-w-[85%] sm:max-w-md">
            <p className="text-sm text-white">
              {msg.text}
            </p>
          </div>
        </div>
        ))}

      </div>

      {/* Input */}
      <div className="shrink-0 p-3 sm:p-4 border-t border-slate-800">
        <div className="flex items-center gap-2 sm:gap-3">

          {/* INPUT WRAPPER */}
          <div className="relative flex-1">

            <button
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 md:hidden"
            >
              <Paperclip size={16} />
            </button>

            <button
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 md:hidden"
            >
              <Smile size={16} />
            </button>

            <input
              type="text"
              placeholder="Type a message..."
              className="
                input w-full
                bg-slate-950/50 border-none ring-1 ring-slate-800
                text-white text-sm
                pl-10 pr-10
                md:pl-3 md:pr-3
              "
            />
          </div>

          {/* Desktop icons (outside input) */}
          <button className="hidden md:flex btn btn-ghost btn-sm text-slate-400">
            <Paperclip />
          </button>

          <button className="hidden md:flex btn btn-ghost btn-sm text-slate-400">
            <Smile />
          </button>

          {/* Send */}
          <button className="btn btn-primary btn-sm sm:btn-md bg-blue-600 hover:bg-blue-500 border-none">
            <Send size={16} />
          </button>
        </div>
      </div>

    </main>

  )
}

export default ChatContainer
