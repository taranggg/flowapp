import React from "react";

function Navbar() {
  return (
    <nav
      className="m-4 flex items-center justify-between px-4 py-2 border-b border-white/10 bg-white/10 backdrop-blur-xl shadow-lg rounded-xl"
      style={{
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)"
      }}
    >
    
      {/* Left: Logo */}
      <div className="flex items-center gap-2 text-2xl font-bold text-primary dark:text-red-400">
        Enablerminds
      </div>
      {/* Right: Icons */}
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-red-400/20">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary dark:text-red-400"><path d="M18 8a6 6 0 1 1-12 0"/><path d="M2 8a10 10 0 1 0 20 0"/></svg>
        </button>
        <button className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-red-400/20">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-primary dark:text-red-400"><rect x="3" y="3" width="16" height="16" rx="4"/><path d="M7 7h0"/><path d="M7 11h0"/><path d="M11 7h0"/><path d="M11 11h0"/></svg>
        </button>
        <div className="w-8 h-8 rounded-full bg-white/30 border border-white/40 overflow-hidden">
          {/* User avatar placeholder */}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;