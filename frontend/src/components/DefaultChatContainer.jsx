import { MessageCircle } from 'lucide-react';

function DefaultChatContainer() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-slate-400 h-full bg-slate-900/40">
  <div className="flex justify-center mb-4">
    <div className="w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center">
      <MessageCircle size={32} className="text-blue-400" />
    </div>
  </div>

  <h2 className="text-lg font-semibold text-white">
    Select a conversation
  </h2>

  <p className="text-sm text-slate-500 mt-1 max-w-sm">
    Choose a contact from the sidebar to start chatting or continue a previous conversation.
  </p>
</div>

  )
}

export default DefaultChatContainer
