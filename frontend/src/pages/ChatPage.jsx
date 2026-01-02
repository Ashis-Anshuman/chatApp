import React from 'react'
import { useUserAuthStore } from '../store/userAuthStore'

function ChatPage() {
  const {logout} = useUserAuthStore();
  return (
    <div className='z-10'>
      <button onClick={logout}>Welcome to Chat Page</button>
    </div>
  )
}

export default ChatPage
