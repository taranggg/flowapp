import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Canvas from "../../components/Canvas";
import { Button } from "../../components/ui/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../../components/ui/tooltip";

const CanvasView = () => {
  const [projectName, setProjectName] = useState("Untitled Chatflow");
  const [isEditingName, setIsEditingName] = useState(false);
  const [nameInput, setNameInput] = useState(projectName);
  const nameInputRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  const saveProjectName = () => {
    const trimmed = (nameInput || "").trim();
    if (trimmed.length === 0) {
      setProjectName("Untitled Chatflow");
    } else {
      setProjectName(trimmed);
    }
    setIsEditingName(false);
  };

  const cancelEditName = () => {
    setNameInput(projectName);
    setIsEditingName(false);
  };
  const navigate = useNavigate();

  // Local canvas data: nodes and edges passed down to Canvas
  const [nodes, setNodes] = useState([
    { id: "n1", position: { x: 0, y: 0 }, data: { label: "Start" } },
    { id: "n2", position: { x: 0, y: 100 }, data: { label: "First" } },
  ]);
  const [edges, setEdges] = useState([
    { id: "n1-n2", source: "n1", target: "n2" },
  ]);

  const handleAddNode = () => {
    // This would typically add a new node to the canvas
    console.log("Add node clicked");
  };

  const _handleDeleteSelected = () => {
    // This would typically delete selected nodes/edges
    console.log("Delete selected clicked");
  };

  const _handleZoomIn = () => {
    // This would typically zoom in on the canvas
    console.log("Zoom in clicked");
  };

  const _handleZoomOut = () => {
    // This would typically zoom out on the canvas
    console.log("Zoom out clicked");
  };

  const _handleFitView = () => {
    // This would typically fit the view to show all nodes
    console.log("Fit view clicked");
  };

  const handleSave = () => {
    console.log("Save clicked");
  };

  const handleExport = () => {
    // Get current canvas data from the canvas component
    const canvasData = canvasRef.current?.getCanvasData() || {
      nodes: [],
      edges: [],
    };

    // Build export payload with all relevant information
    const payload = {
      projectName: projectName,
      exportedAt: new Date().toISOString(),
      canvasData: {
        nodes: canvasData.nodes,
        edges: canvasData.edges,
      },
      metadata: {
        nodeCount: canvasData.nodes.length,
        edgeCount: canvasData.edges.length,
      },
    };

    const json = JSON.stringify(payload, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${projectName
      .replace(/\s+/g, "_")
      .toLowerCase()}_export.json`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const handleBackToPrevious = () => {
    navigate(-1);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
      {/* Header */}
      <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
        <div className="flex items-center space-x-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToPrevious}
                className="mr-2 rounded-full w-9 h-9 p-0 flex items-center justify-center transition-transform duration-200 hover:scale-105 active:translate-y-0.5 hover:bg-accent/40 shadow-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform duration-200"
                >
                  <path d="M19 12H6m0 0l6 6m-6-6l6-6" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>Back</TooltipContent>
          </Tooltip>
          <div className="flex flex-col">
            {!isEditingName ? (
              <h1
                className="text-xl font-semibold text-foreground cursor-text select-text"
                onClick={() => {
                  setNameInput(projectName);
                  setIsEditingName(true);
                }}
                title="Click to edit project name"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    setNameInput(projectName);
                    setIsEditingName(true);
                  }
                }}
              >
                {projectName}
              </h1>
            ) : (
              <input
                ref={nameInputRef}
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                onBlur={saveProjectName}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveProjectName();
                  if (e.key === "Escape") cancelEditName();
                }}
                className="text-xl font-semibold text-foreground bg-card border border-border rounded px-2 py-1 outline-none w-64"
              />
            )}
            <span className="text-sm text-muted-foreground">Flow Editor</span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleSave}
                title="Save"
                aria-label="Save"
                className="group rounded-full w-9 h-9 p-0 flex items-center justify-center transition-all duration-200 bg-indigo-50 text-indigo-600 hover:bg-gradient-to-br hover:from-indigo-600 hover:to-purple-600 hover:text-white shadow-sm hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300"
              >
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
                  className="transform transition-transform duration-200 group-hover:scale-95"
                >
                  <path d="M19 21H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2z" />
                  <path d="M17 21v-8H7v8" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>Save</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleExport}
                title="Export JSON"
                aria-label="Export JSON"
                className="group rounded-full w-9 h-9 p-0 flex items-center justify-center transition-all duration-200 bg-gray-100 text-gray-600 hover:bg-gray-700 hover:text-white shadow-sm hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
              >
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
                  className="transition-transform duration-200 group-hover:scale-95"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
              </Button>
            </TooltipTrigger>
            <TooltipContent sideOffset={6}>Export JSON</TooltipContent>
          </Tooltip>
        </div>
      </header>

      {/* Canvas Container */}
      <div className="flex-1 relative overflow-hidden">
        {/* Canvas Component */}
        <div className="w-full h-full">
          <Canvas ref={canvasRef} nodes={nodes} edges={edges} />
        </div>

        {/* Floating Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={handleAddNode}
            title="Add Node"
            aria-label="Add node"
            className="rounded-full w-10 h-10 p-0 shadow-2xl flex items-center justify-center transition-transform transition-shadow duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/50 bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-2xl elevated-btn"
          >
            {/* simple plus icon (no outer circle) */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-current"
            >
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          </Button>
        </div>

        {/* Floating Tools - Right Side
        <div className="absolute top-4 right-4 z-10 flex flex-col space-y-2">
          <Button
            variant="secondary"
            size="icon"
            className="shadow-lg"
            title="Zoom In"
            onClick={handleZoomIn}
          >
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
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <line x1="11" y1="8" x2="11" y2="14" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="shadow-lg"
            title="Zoom Out"
            onClick={handleZoomOut}
          >
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
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
              <line x1="8" y1="11" x2="14" y2="11" />
            </svg>
          </Button>

          <Button
            variant="secondary"
            size="icon"
            className="shadow-lg"
            title="Fit View"
            onClick={handleFitView}
          >
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
              <path d="M8 3H5a2 2 0 0 0-2 2v3" />
              <path d="M21 8V5a2 2 0 0 0-2-2h-3" />
              <path d="M3 16v3a2 2 0 0 0 2 2h3" />
              <path d="M16 21h3a2 2 0 0 0 2-2v-3" />
            </svg>
          </Button>
        </div> */}
      </div>
    </div>
  );
};

export default CanvasView;
