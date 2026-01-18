import React, { startTransition, useEffect, useRef } from 'react'
import { useChatStore } from '../store/chatStore'
import MessageLoadingSkeleton from './MessageLoadingSkeleton';
import ChatHeader from './ChatHeader';
import NoChat from './NoChat';
import { useUserAuthStore } from '../store/userAuthStore';
import MessageInputBar from './MessageInputBar';



function ChatContainer() {
  const {selectedUser, isMessagesLoading, getMessageById, messages} = useChatStore();
  // const {authUser} = useUserAuthStore();
  const authUser = useUserAuthStore((s)=>s.authUser);
  const messageEndRef = useRef(null);

  useEffect(()=>{
    if(!selectedUser._id)return;
    startTransition(()=>{
      getMessageById(selectedUser._id);
    });
  },[selectedUser, getMessageById]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main className="flex-1 flex flex-col min-h-0 bg-slate-900/30 backdrop-blur-xl">

      <ChatHeader/>

      {/* Messages */}
      <div className="flex-1 px-6 overflow-y-auto py-8">
        {messages.length > 0 && !isMessagesLoading ? (
          <div className='max-w-6xl mx-auto space-y-1'>
            {messages.map((msg) => (
              <div key={msg._id} className={`chat ${msg.senderId === authUser._id ? "chat-end" : "chat-start"}`}>
                <div className={`chat-bubble relative ${msg.senderId === authUser._id ? "bg-blue-500 text-slate-200": "bg-slate-800 text-slate-200"}`}>

                  {msg.image && (<img src={msg.image} alt='shared image' className='rounded-lg h-48 object-cover'/>)}
                  {msg.text && <p className="mt-2">{msg.text}</p>}
                  {/* <p className="text-xs mt-1 opacity-75 flex items-center gap-1">
                    
                  </p> */}
                </div>
                  <p className='chat-footer opacity-50'>
                    {new Date(msg.createdAt).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        )
        : isMessagesLoading ? <MessageLoadingSkeleton/> :
        (<NoChat name={selectedUser.fullName}/>)}

      </div>

      {/* Input */}
      <MessageInputBar/>

    </main>

  )
}

export default React.memo(ChatContainer);
