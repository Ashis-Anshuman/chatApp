import React, { useState } from 'react'

const users = [
  { id: 1, name: "Olivia Miller", online: true },
  { id: 2, name: "Sophia Davis", online: false },
  { id: 3, name: "William Clark", online: true },
  { id: 4, name: "John Doe", online: false }
];

function ChatsList() {
 const [selectedChat, setSelectedChat] = useState(null);
  return (
    <div className="flex-1 overflow-y-auto px-2">
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedChat(user)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition ${
                selectedChat?.id === user.id
                  ? "bg-blue-600/10"
                  : "hover:bg-slate-800/50"
              }`}
            >
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-slate-700"></div>
                {user.online && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full ring-2 ring-slate-900"></span>
                )}
              </div>

              <div>
                <p className="text-sm text-white">{user.name}</p>
                <p className="text-xs text-slate-500">Last message...</p>
              </div>
            </div>
          ))}
        </div>
  )
}

export default ChatsList
