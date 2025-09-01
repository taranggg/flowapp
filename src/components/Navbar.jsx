import React from "react";
import { Link } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "./ui/sidebar";
import AppSidebar from "./AppSidebar";
import defaultAvatar from "../assets/default-avatar.svg";

function Navbar() {
  return (
    <nav
      className="sticky top-4 z-50 sm:flex m-4 sm:items-center sm:justify-between px-4 py-2 border-b border-white/10 bg-white/10 backdrop-blur-xl shadow-lg rounded-xl"
      style={{
        WebkitBackdropFilter: "blur(20px)",
        backdropFilter: "blur(20px)",
      }}
    >
      <div className="flex flex-row gap-2 items-center w-fit">
        <SidebarTrigger />
        <Link
          to="/"
          className="hidden sm:flex text-2xl font-bold text-primary dark:text-red-400 hover:opacity-80 transition-opacity cursor-pointer"
        >
          Enablerminds
        </Link>
      </div>
      <div className="hidden sm:flex items-center gap-4 w-fit">
        <button className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-red-400/20">
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary dark:text-red-400"
          >
            <path d="M18 8a6 6 0 1 1-12 0" />
            <path d="M2 8a10 10 0 1 0 20 0" />
          </svg>
        </button>
        <button className="p-2 rounded-full hover:bg-primary/10 dark:hover:bg-red-400/20">
          <svg
            width="22"
            height="22"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-primary dark:text-red-400"
          >
            <rect x="3" y="3" width="16" height="16" rx="4" />
            <path d="M7 7h0" />
            <path d="M7 11h0" />
            <path d="M11 7h0" />
            <path d="M11 11h0" />
          </svg>
        </button>
        <img
          src={defaultAvatar}
          alt="avatar"
          className="w-8 h-8 rounded-full bg-white/30 border border-white/40 object-cover"
        />
      </div>
    </nav>
  );
}

export default Navbar;
