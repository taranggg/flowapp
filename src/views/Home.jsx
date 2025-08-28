import React from "react";
import Navbar from "@/components/navbar";

function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-background to-red-100 dark:bg-gradient-to-b dark:from-black dark:to-red-100">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-center">Welcome to FlowApp</h1>
        <p className="mt-4 text-lg text-center">
          Your one-stop solution for all your workflow needs.
        </p>
      </main>
    </div>
  );
}

export default Home;
