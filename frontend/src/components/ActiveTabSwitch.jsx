import { useChatStore } from '../store/chatStore';

function ActiveTabSwitch() {
  // const { setActiveTab, activeTab } = useChatStore((s) =>({
  //   setActiveTab: s.setActiveTab,
  //   activeTab: s.activeTab
  // }));
  const setActiveTab = useChatStore(s => s.setActiveTab);
  const activeTab = useChatStore(s => s.activeTab);

  const handelTabClick = (e) =>{
    setActiveTab(e.target.innerText.toLowerCase());
  }

  return (
    <div className="flex gap-2 p-3">
          <button
            onClick={handelTabClick}
            className={`flex-1 py-2 rounded-lg text-sm ${
              activeTab === "chats"
                ? "bg-blue-600/20 text-blue-400"
                : "text-slate-400"
            }`}
          >
            Chats
          </button>
          <button
            onClick={handelTabClick}
            className={`flex-1 py-2 rounded-lg text-sm ${
              activeTab === "contacts"
                ? "bg-blue-600/20 text-blue-400"
                : "text-slate-400"
            }`}
          >
            Contacts
          </button>
      </div>
  )
}

export default ActiveTabSwitch
