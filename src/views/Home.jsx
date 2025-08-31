import React from "react";
import Navbar from "@/components/navbar";
import { SidebarProvider, SidebarTrigger } from "../components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";

function Home() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div>
          <AppSidebar />
          <main className="flex-1 flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-center">
              Welcome to FlowApp
            </h1>
            <p className="mt-4 text-lg text-center">
              Your one-stop solution for all your workflow needs.
            </p>
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Home;
