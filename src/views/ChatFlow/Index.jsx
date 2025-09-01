import React from "react";
import { useNavigate } from "react-router-dom";
import { SidebarProvider, SidebarInset } from "../../components/ui/sidebar";
import AppSidebar from "../../components/AppSidebar";
import Navbar from "@/components/Navbar";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";

const ChatFlowIndex = () => {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate("/canvas");
  };

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <div className="flex-1 p-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Chatflows
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Build single-agent systems, chatbots and simple LLM flows
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  {/* Search Input */}
                  <div className="relative">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                    <Input
                      type="text"
                      placeholder="Search Name or Category [ ⌘ + F ]"
                      className="w-80 pl-10 pr-4"
                    />
                  </div>

                  {/* View Toggle Buttons */}
                  <div className="flex bg-muted rounded-lg p-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 bg-background shadow-sm"
                    >
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                    </Button>
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                      </svg>
                    </Button>
                  </div>

                  {/* Add New Button */}
                  <Button onClick={handleAddNew} className="hover:bg-red-700">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mr-2"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <line x1="12" y1="8" x2="12" y2="16" />
                      <line x1="8" y1="12" x2="16" y2="12" />
                    </svg>
                    Add New
                  </Button>
                </div>
              </div>

              {/* Empty State */}
              <div className="flex flex-col items-center justify-center h-96">
                <div className="relative">
                  {/* Main illustration with multiple robot characters */}
                  <div className="relative w-64 h-48 mb-6">
                    {/* Background elements */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl opacity-50"></div>

                    {/* Robot characters */}
                    <div className="absolute top-4 left-8">
                      <div className="w-12 h-16 bg-gray-800 rounded-lg relative">
                        <div className="w-8 h-8 bg-white rounded-full absolute top-1 left-2 flex items-center justify-center">
                          <div className="w-2 h-2 bg-gray-800 rounded-full"></div>
                        </div>
                        <div className="w-3 h-3 bg-gray-600 rounded-full absolute -top-2 left-4"></div>
                      </div>
                    </div>

                    <div className="absolute bottom-8 left-4">
                      <div className="w-10 h-14 bg-purple-600 rounded-lg relative">
                        <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-2 flex items-center justify-center">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                        </div>
                        <div className="w-2 h-2 bg-purple-400 rounded-full absolute -top-1 left-4"></div>
                      </div>
                    </div>

                    <div className="absolute bottom-4 right-8">
                      <div className="w-10 h-14 bg-purple-700 rounded-lg relative">
                        <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-2 flex items-center justify-center">
                          <div className="w-2 h-2 bg-purple-700 rounded-full"></div>
                        </div>
                        <div className="w-2 h-2 bg-purple-500 rounded-full absolute -top-1 left-4"></div>
                      </div>
                    </div>

                    <div className="absolute top-12 right-4">
                      <div className="w-10 h-14 bg-gray-700 rounded-lg relative">
                        <div className="w-6 h-6 bg-white rounded-full absolute top-1 left-2 flex items-center justify-center">
                          <div className="w-2 h-2 bg-gray-700 rounded-full"></div>
                        </div>
                        <div className="w-2 h-2 bg-gray-500 rounded-full absolute -top-1 left-4"></div>
                      </div>
                    </div>

                    {/* Browser window mockup in center */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2">
                      <div className="w-20 h-16 bg-white rounded border border-gray-300 shadow-sm">
                        <div className="flex space-x-1 p-1">
                          <div className="w-1.5 h-1.5 bg-red-400 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-yellow-400 rounded-full"></div>
                          <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                        </div>
                        <div className="px-2 py-1">
                          <div className="w-full h-1 bg-gray-200 rounded mb-1"></div>
                          <div className="w-3/4 h-1 bg-gray-200 rounded mb-1"></div>
                          <div className="w-1/2 h-1 bg-gray-200 rounded"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-gray-500 mb-2">
                  No Chatflows Yet
                </h3>
                <p className="text-sm text-muted-foreground text-center max-w-md">
                  Start building your first chatflow by clicking the "Add New"
                  button above. Create intelligent conversations with
                  drag-and-drop simplicity.
                </p>
              </div>
            </div>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default ChatFlowIndex;
