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

  const [isAddNodesOpen, setIsAddNodesOpen] = useState(false);

  const [isAdditionalParamsOpen, setIsAdditionalParamsOpen] = useState(false);
  const [currentEditingNode, setCurrentEditingNode] = useState(null);

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

  const updateNodeData = (nodeId, newData) => {
    let patchedData = { ...newData };
    const node = nodes.find((n) => n.id === nodeId);
    if (
      node &&
      node.data &&
      node.data.toolName &&
      (newData.toolParameters || newData.additionalParameters)
    ) {
      const values = newData.toolParameters || newData.additionalParameters;
      patchedData = { ...newData, toolParameterValues: values };
      delete patchedData.toolParameters;
      delete patchedData.additionalParameters;
    }
    setNodes((prevNodes) => {
      const updated = prevNodes.map((node) => {
        if (node.id === nodeId) {
          const updatedNode = {
            ...node,
            data: { ...node.data, ...patchedData },
          };
          return updatedNode;
        }
        return node;
      });
      return updated;
    });
  };

  const handleCopyNode = (nodeId, nodeData) => {
    const currentNodes = canvasRef.current?.getCurrentNodes() || nodes;
    const sourceNode = currentNodes.find((n) => n.id === nodeId);
    if (!sourceNode) return;

    const isTool = !!sourceNode.data.toolName;
    const baseName = isTool
      ? sourceNode.data.toolName || "Tool"
      : sourceNode.data.title || "ReAct Agent for LLMs";
    const nameField = isTool ? "toolName" : "title";

    // Find existing copies to determine the next number
    const existingCopies = currentNodes.filter((node) => {
      const val = node.data[nameField];
      return (
        val &&
        (val === baseName ||
          val.match(
            new RegExp(
              `^${baseName.replace(
                /[.*+?^${}()|[\\]\\]/g,
                "\\$&"
              )} \\((\\d+)\\)$`
            )
          ))
      );
    });
    const copyNumber = existingCopies.length;
    const newName = `${baseName} (${copyNumber})`;

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
        [nameField]: newName,
      },
    };
    setNodes((prevNodes) => [...prevNodes, newNode]);
  };

  const handleDeleteNode = (nodeId) => {
    setNodes((prevNodes) => prevNodes.filter((node) => node.id !== nodeId));
  };

  const handleInfoNode = (nodeId, nodeData) => {
    const currentNode = nodes.find((n) => n.id === nodeId);
    const isTool = !!currentNode?.data?.toolName;

    let nodeInfo;
    if (isTool) {
      nodeInfo = currentNode;
    } else {
      nodeInfo = {
        nodeId: nodeId,
        id: nodeId,
        title: nodeData.title || "ReAct Agent for LLMs",
        maxIterations: nodeData.maxIterations || 0,
        type: "ReActAgentNode",
        description: nodeData.description,
        ...nodeData,
        ...(currentNode?.data || {}),
      };
    }
    setCurrentInfoNode(nodeInfo);
    setIsNodeInfoOpen(true);
  };

  const handleOpenAdditionalParams = (nodeId) => {
    setIsNodeInfoOpen(false);
    setCurrentInfoNode(null);
    const node = nodes.find((n) => n.id === nodeId);
    setCurrentEditingNode(node);
    setIsAdditionalParamsOpen(true);
  };

  const navigate = useNavigate();

  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleSave = () => {};

  const handleExport = () => {
    const canvasData = canvasRef.current?.getCanvasData() || {
      nodes: [],
      edges: [],
    };
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
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background">
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
      <div className="flex-1 relative overflow-hidden">
        <div className="w-full h-full">
          <Canvas
            ref={canvasRef}
            nodes={nodes}
            edges={edges}
            onOpenAdditionalParams={handleOpenAdditionalParams}
            onCopyNode={handleCopyNode}
            onDeleteNode={handleDeleteNode}
            onInfoNode={handleInfoNode}
          />
        </div>
        <div className="absolute top-4 left-4 z-10 flex flex-col space-y-2">
          <AddNodes
            open={isAddNodesOpen}
            onOpenChange={setIsAddNodesOpen}
            onAddNode={handleAddNode}
          />
        </div>
      </div>
      <AdditionalParametersModal
        isOpen={isAdditionalParamsOpen}
        onClose={() => {
          setIsAdditionalParamsOpen(false);
          setCurrentEditingNode(null);
        }}
        nodeData={currentEditingNode}
        onSave={updateNodeData}
        schema={currentEditingNode?.data?.toolParameters}
        formData={currentEditingNode?.data?.additionalParameters}
      />
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
