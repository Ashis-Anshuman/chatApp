
function MessageLoadingSkeleton() {
  return (
    <main className="flex-1 flex flex-col min-h-0 bg-slate-900/30 backdrop-blur-xl animate-pulse">
      
      {/* ===== Header Skeleton ===== */}
      <div className="h-14 sm:h-16 px-4 sm:px-6 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="size-10 rounded-full bg-slate-700" />

          {/* Username */}
          <div className="space-y-2">
            <div className="h-3 w-24 bg-slate-700 rounded" />
            <div className="h-2 w-12 bg-slate-800 rounded" />
          </div>
        </div>

      </div>

      {/* ===== Messages Skeleton ===== */}
      <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
        {[...Array(6)].map((_, index) => (
        <div
          key={index}
          className={`chat ${index % 2 === 0 ? "chat-start" : "chat-end"} animate-pulse`}
        >
          <div className={`chat-bubble bg-slate-800 text-white w-32`}></div>
        </div>
      ))}
      </div>

      {/* ===== Input Skeleton ===== */}
      <div className="p-3 sm:p-4 border-t border-slate-800">
        <div className="flex items-center gap-3">
          <div className="flex-1 h-10 bg-slate-800 rounded-lg" />
          <div className="h-10 w-10 bg-blue-500/40 rounded-lg" />
        </div>
      </div>

    </main>
  )
}

export default MessageLoadingSkeleton
