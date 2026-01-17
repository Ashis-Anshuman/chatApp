import ProfileHeader from "../components/ProfileHeader";
import ActiveTabSwitch from "../components/ActiveTabSwitch";
import DefaultChatContainer from "../components/DefaultChatContainer";
import ContactList from "../components/ContactList";
import ChatContainer from "../components/ChatContainer";
import {Search} from "lucide-react";
import { useChatStore } from "../store/chatStore";
import ChatsList from "../components/ChatsList";
import BorderAnimation from "../components/BorderAnimation";


const ChatPage = () => {
  const {selectedUser, activeTab, isSidebarOpen, setIsSidebarOpen} = useChatStore();


  return (
    <div className="h-[95vh] w-full max-w-[96%] flex overflow-hidden backdrop-blur-xl">
      <BorderAnimation>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* LEFT SIDEBAR */}
      <aside
        className={`
          fixed md:static z-40
          w-80 h-full
          bg-slate-900/90 border-r border-slate-800
          transform transition-transform duration-300
          ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
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
   </BorderAnimation>
    </div>
  );
};

export default ChatPage;


