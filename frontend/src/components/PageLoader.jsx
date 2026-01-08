import React from 'react'
import {LoaderIcon} from 'lucide-react'

function PageLoader() {
  return (
    // <div className='flex justify-center items-center h-screen'>
    //   <LoaderIcon className='size-10 animate-spin' />
    // </div>
    <div className="h-[95vh] w-full max-w-[99%] flex overflow-hidden animate-pulse">

      {/* ===== LEFT SIDEBAR ===== */}
      <aside className="w-80 hidden md:flex flex-col bg-slate-900/60 border-r border-slate-800 p-4">

        {/* Profile Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-full bg-slate-700" />
          <div className="space-y-2">
            <div className="w-28 h-3 bg-slate-700 rounded" />
            <div className="w-16 h-2 bg-slate-800 rounded" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 h-9 bg-slate-800 rounded-lg" />
          <div className="flex-1 h-9 bg-slate-900 rounded-lg" />
        </div>

        {/* Search */}
        <div className="h-9 bg-slate-900 rounded-lg mb-4" />

        {/* Chat List */}
        <div className="space-y-3 flex-1 overflow-hidden">
          {[1, 2, 3, 4].map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 rounded-xl bg-slate-900"
            >
              <div className="w-10 h-10 rounded-full bg-slate-700" />
              <div className="flex-1 space-y-2">
                <div className="w-24 h-3 bg-slate-700 rounded" />
                <div className="w-16 h-2 bg-slate-800 rounded" />
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ===== MAIN CHAT AREA ===== */}
      <main className="flex-1 flex items-center justify-center bg-slate-950/30">

        <div className="flex flex-col items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-slate-700" />
          <div className="w-48 h-4 bg-slate-700 rounded" />
          <div className="w-64 h-3 bg-slate-800 rounded" />
        </div>

      </main>
    </div>
  )
}

export default PageLoader
