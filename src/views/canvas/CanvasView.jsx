import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Canvas from "../../components/Canvas";
import AddNodes from "./AddNodes";
import AdditionalParametersModal from "./AdditionalParametersModal";
import NodeInfoModal from "./NodeInfoModal";
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

  // State for AddNodes modal
  const [isAddNodesOpen, setIsAddNodesOpen] = useState(false);

  // State for Additional Parameters modal
  const [isAdditionalParamsOpen, setIsAdditionalParamsOpen] = useState(false);
  const [currentEditingNode, setCurrentEditingNode] = useState(null);

  // State for Node Info modal
  const [isNodeInfoOpen, setIsNodeInfoOpen] = useState(false);
  const [currentInfoNode, setCurrentInfoNode] = useState(null);

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

  // Function to update node data
  const updateNodeData = (nodeId, newData) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) =>
        node.id === nodeId
          ? { ...node, data: { ...node.data, ...newData } }
          : node
      )
    );
  };

  // Copy node function
  const handleCopyNode = (nodeId, nodeData) => {
    // Get current nodes from Canvas to get updated positions
    const currentNodes = canvasRef.current?.getCurrentNodes() || nodes;
    const sourceNode = currentNodes.find((n) => n.id === nodeId);

    if (!sourceNode) return;

    // Find existing copies to determine the next number
    const baseName = nodeData.title || "ReAct Agent for LLMs";
    const existingCopies = nodes.filter(
      (node) =>
        node.data.title &&
        (node.data.title === baseName ||
          node.data.title.match(
            new RegExp(
              `^${baseName.replace(
                /[.*+?^${}()|[\]\\]/g,
                "\\$&"
              )} \\((\\d+)\\)$`
            )
          ))
    );

    const copyNumber = existingCopies.length;
    const newTitle = `${baseName} (${copyNumber})`;

    // Create new node with copied data
    const newNode = {
      ...sourceNode,
      id: `${nodeId}-copy-${Date.now()}`,
      position: {
        x: sourceNode.position.x + 50,
        y: sourceNode.position.y + 50,
      },
      data: {
        ...sourceNode.data,
        title: newTitle,
      },
    };

    setNodes((prevNodes) => [...prevNodes, newNode]);
    console.log(`Node copied: ${newTitle}`);
  };

  // Delete node function
  const handleDeleteNode = (nodeId) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
    console.log(`Node deleted: ${nodeId}`);
  };

  // Info node function
  const handleInfoNode = (nodeId, nodeData) => {
    // Get current nodes from Canvas to get updated data
    const currentNodes = canvasRef.current?.getCurrentNodes() || nodes;
    const currentNode = currentNodes.find((n) => n.id === nodeId);

    const nodeInfo = {
      nodeId: nodeId, // Store the nodeId separately
      id: nodeId,
      title: nodeData.title || "ReAct Agent for LLMs",
      maxIterations: nodeData.maxIterations || 0,
      type: "ReActAgentNode",
      description: nodeData.description,
      ...nodeData,
      // Add current node data if available
      ...(currentNode?.data || {}),
    };

    setCurrentInfoNode(nodeInfo);
    setIsNodeInfoOpen(true);
    console.log("Opening node info:", nodeInfo);
  };

  const navigate = useNavigate();

  // Local canvas data: nodes and edges passed down to Canvas
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

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

  const handleAddNode = (nodeData) => {
    const newNode = {
      id: `${nodeData.type}-${Date.now()}`,
      type: nodeData.type,
      position: { x: 100, y: 100 },
      data: {
        title: nodeData.name,
        description: nodeData.description,
        ...nodeData,
      },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
    console.log("New node added:", newNode);
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
          <Canvas
            ref={canvasRef}
            nodes={nodes}
            edges={edges}
            onOpenAdditionalParams={(nodeId) => {
              const node = nodes.find((n) => n.id === nodeId);
              setCurrentEditingNode(node);
              setIsAdditionalParamsOpen(true);
            }}
            onCopyNode={handleCopyNode}
            onDeleteNode={handleDeleteNode}
            onInfoNode={handleInfoNode}
          />
        </div>

        {/* Floating Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          <AddNodes
            open={isAddNodesOpen}
            onOpenChange={setIsAddNodesOpen}
            onAddNode={handleAddNode}
          />
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

      {/* Additional Parameters Modal */}
      <AdditionalParametersModal
        isOpen={isAdditionalParamsOpen}
        onClose={() => {
          setIsAdditionalParamsOpen(false);
          setCurrentEditingNode(null);
        }}
        nodeData={currentEditingNode}
        onSave={updateNodeData}
      />

      {/* Node Info Modal */}
      <NodeInfoModal
        isOpen={isNodeInfoOpen}
        onClose={() => {
          setIsNodeInfoOpen(false);
          setCurrentInfoNode(null);
        }}
        nodeData={currentInfoNode}
      />
    </div>
  );
};

export default CanvasView;
