import React, { startTransition, useEffect } from 'react'
import {useChatStore} from '../store/chatStore'
import UsersLoadingSkeleton from './UsersLoadingSkeleton';

function ContanctList() {
  const {isUsersLoading, getAllContacts, contacts, setSelectedUser, selectedUser} = useChatStore();

  useEffect(()=>{
    startTransition(()=>{
      getAllContacts();
    })
  },[getAllContacts])

  if(isUsersLoading){return <UsersLoadingSkeleton/>}

  return (
    <div className="flex-1 overflow-y-auto px-2">
          {contacts.map((contac) => (
            <div
              key={contac._id}
              onClick={() => setSelectedUser(contac)}
              className={`flex items-center gap-3 px-3 py-3 rounded-xl cursor-pointer transition ${
                selectedUser?._id === contac._id
                  ? "bg-blue-600/10"
                  : "hover:bg-slate-800/50"
              }`}
            >
            <div className='flex items-center gap-3'>
              <div className='avatar online'>
                <div className="size-12 rounded-full">
                <img src={contac.profilePic || "/avatar.png"} alt={contac.fullName} />
              </div>
              </div>
            </div>

              <div>
                <p className="text-sm text-white">{contac.fullName}</p>
                <p className="text-xs text-slate-500">Last message...</p>
              </div>
            </div>
          ))}
        </div>
  )
}

export default React.memo(ContanctList);
