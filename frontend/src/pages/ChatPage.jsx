// import React from 'react'
// import BorderAnimation from '../components/BorderAnimation';
// import { usechatStore } from '../store/chatStore';
// import ProfileHeader from '../components/ProfileHeader';
// import ActiveTabSwitch from '../components/ActiveTabSwitch';
// import ChatsList from '../components/ChatsList';
// import ContactList from '../components/ContactList';
// import ChatContainer from '../components/ChatContainer';
// import DefaultChatContainer from '../components/DefaultChatContainer';

// function ChatPage() {
//   const {activeTab, selectedUser} = usechatStore();
//   return (
//     <div className="relative w-full max-w-6xl h-[90vh]">
//   <BorderAnimation>
//     <div className="flex w-full h-full overflow-hidden rounded-2xl">

//       {/* LEFT SIDEBAR */}
//       <div className="w-80 bg-slate-800/50 backdrop-blur-sm flex flex-col shrink-0">
//         <ProfileHeader />
//         <ActiveTabSwitch />

//         <div className="flex-1 overflow-y-auto p-4 space-y-2">
//           {activeTab === "chats" ? <ChatsList /> : <ContactList />}
//         </div>
//       </div>

//       {/* RIGHT CHAT */}
//       <div className="flex-1 flex flex-col bg-slate-950/30 backdrop-blur-xl">
//         {selectedUser ? <ChatContainer /> : <DefaultChatContainer />}
//       </div>

//     </div>
//   </BorderAnimation>
// </div>

//   )
// }

// export default ChatPage



import React, { useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import DefaultChatContainer from "../components/DefaultChatContainer";
import ChatList from "../components/ChatsList";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import {
  MessageCircle,
  Search,
  LogOut,
  Volume2
} from "lucide-react";
import { useChatStore } from "../store/chatStore";
import ChatsList from "../components/ChatsList";

const users = [
  { id: 1, name: "Olivia Miller", online: true },
  { id: 2, name: "Sophia Davis", online: false },
  { id: 3, name: "William Clark", online: true },
  { id: 4, name: "John Doe", online: false }
];

const ChatPage = () => {
  const {selectedUser, activeTab} = useChatStore();
  const [selectedChat, setSelectedChat] = useState(null);

  return (
    <div className="h-[95vh] w-full max-w-[99%] flex overflow-hidden backdrop-blur-xl">

      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="w-80 shrink-0 hidden md:flex flex-col bg-slate-900/60 border-r border-slate-800">

          <ProfileHeader />
          <ActiveTabSwitch />
       

        {/* Search */}
        <div className="px-4 pb-3">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
            />
            <input
              type="text"
              placeholder="Search..."
              className="input input-sm w-full pl-9 bg-slate-950/50 border-none ring-1 ring-slate-800 text-white"
            />
          </div>
        </div>

        {/* <ChatList/> */}
        <div className="flex-1 overflow-y-auto space-y-2">
           {activeTab === "chats" ? <ChatsList /> : <ContactList />}
        </div>
        
      </aside>

      {/* ===== MAIN CHAT AREA ===== */}
      <div className="flex-1 flex flex-col bg-slate-950/30 backdrop-blur-xl">
        {selectedUser ? <ChatContainer /> : <DefaultChatContainer />}
       </div>
    </div>
  );
};

export default ChatPage;


