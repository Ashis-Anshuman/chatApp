import React, { startTransition, useCallback } from 'react';
import { useChatStore } from '../store/chatStore';

const mouseClickSound = new Audio('/sounds/mouse-click.mp3');

function ActiveTabSwitch() {
  const setActiveTab = useChatStore(s => s.setActiveTab);
  const activeTab = useChatStore(s => s.activeTab);
  const isSoundEnabled = useChatStore(s => s.isSoundEnabled);

  const handelTabClick = useCallback((tab) =>{
    startTransition(()=>{
      setActiveTab(tab);
    })
  },[setActiveTab]);

  const soundPlay = ()=>{
    if(isSoundEnabled){
      mouseClickSound.currentTime = 0;
      mouseClickSound.play().catch((error)=>{
        console.error("Error in playing sound", error);
      });
    }
  }

  return (
    <div className="flex gap-2 p-3">
          <button
            onClick={() =>{handelTabClick("chats");
              soundPlay();
            }}
            className={`flex-1 py-2 rounded-lg text-sm ${
              activeTab === "chats"
                ? "bg-blue-600/20 text-blue-400"
                : "text-slate-400"
            }`}
          >
            Chats
          </button>
          <button
            onClick={() =>{handelTabClick("contacts");
              soundPlay();
            }}
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

export default React.memo(ActiveTabSwitch);
