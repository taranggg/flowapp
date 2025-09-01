import React from "react";
import Navbar from "@/components/navbar";
import { SidebarProvider, SidebarInset } from "../components/ui/sidebar";
import AppSidebar from "../components/AppSidebar";

function Home() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset className="flex-1">
            <main className="flex-1 space-y-16 p-8">
              {/* Hero Section */}
              <section className="text-center space-y-6 py-12">
                <div className="space-y-4">
                  <h1 className="text-5xl font-bold text-center bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                    Welcome to FlowApp
                  </h1>
                  <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    Empower your business with intelligent conversational AI.
                    Build, deploy, and manage sophisticated chatbots and agent
                    workflows with unprecedented ease.
                  </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto mt-12">
                  <div className="bg-card border rounded-lg p-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      500+
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Active Workflows
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      99.9%
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Uptime Reliability
                    </div>
                  </div>
                  <div className="bg-card border rounded-lg p-6">
                    <div className="text-3xl font-bold text-primary mb-2">
                      24/7
                    </div>
                    <div className="text-sm text-muted-foreground">
                      AI Support
                    </div>
                  </div>
                </div>
              </section>

              {/* Key Features */}
              <section className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">
                    Powerful Features for Modern Businesses
                  </h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Everything you need to create, manage, and scale your
                    conversational AI solutions
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                  <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-blue-600"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">
                      Visual Flow Builder
                    </h3>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      Create complex conversational flows with our intuitive
                      drag-and-drop interface. No coding required.
                    </p>
                  </div>

                  <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-purple-600"
                      >
                        <polyline points="16 18 22 12 16 6" />
                        <polyline points="8 6 2 12 8 18" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">
                      Smart AI Integration
                    </h3>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      Leverage advanced AI models with intelligent branching
                      logic and contextual understanding.
                    </p>
                  </div>

                  <div className="bg-card border rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-green-600"
                      >
                        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                        <polyline points="7.5 4.21 12 6.81 16.5 4.21" />
                        <polyline points="7.5 19.79 7.5 14.6 3 12" />
                        <polyline points="21 12 16.5 14.6 16.5 19.79" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-center">
                      Enterprise Ready
                    </h3>
                    <p className="text-muted-foreground text-center leading-relaxed">
                      Deploy anywhere with multiple export formats, scalable
                      architecture, and enterprise security.
                    </p>
                  </div>
                </div>
              </section>

              {/* How It Works */}
              <section className="space-y-8">
                <div className="text-center">
                  <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Get started with FlowApp in three simple steps
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  <div className="text-center space-y-4">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-primary font-bold text-xl">
                      1
                    </div>
                    <h3 className="text-lg font-semibold">
                      Choose Your Flow Type
                    </h3>
                    <p className="text-muted-foreground">
                      Start with Chatflow for simple conversations or Agentflow
                      for complex multi-step processes.
                    </p>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-primary font-bold text-xl">
                      2
                    </div>
                    <h3 className="text-lg font-semibold">Design Your Flow</h3>
                    <p className="text-muted-foreground">
                      Use our visual editor to create, connect, and configure
                      your conversation logic effortlessly.
                    </p>
                  </div>

                  <div className="text-center space-y-4">
                    <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mx-auto text-primary font-bold text-xl">
                      3
                    </div>
                    <h3 className="text-lg font-semibold">Deploy & Monitor</h3>
                    <p className="text-muted-foreground">
                      Launch your AI assistant and track performance with
                      real-time analytics and insights.
                    </p>
                  </div>
                </div>
              </section>

              {/* Getting Started CTA */}
              <section className="bg-gradient-to-r from-primary/5 via-primary/3 to-secondary/5 rounded-2xl p-8 text-center space-y-6">
                <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
                  Explore the sidebar to begin creating your first
                  conversational AI workflow. Start with Chatflow for simple
                  bots or dive into Agentflow for advanced automation.
                </p>
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M9 12l2 2 4-4" />
                    <path d="M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.746 3.746 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12z" />
                  </svg>
                  <span>
                    No setup required • Start building immediately • Free to
                    explore
                  </span>
                </div>
              </section>
            </main>
          </SidebarInset>
        </div>
      </div>
    </SidebarProvider>
  );
}

export default Home;
