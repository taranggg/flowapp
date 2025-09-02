import React, { useState } from "react";
import { Bot } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

// Node types data - for now just ReAct Agent
const nodeTypes = {
  agents: [
    {
      id: "react-agent-for-llms",
      name: "ReAct Agent for LLMs",
      description:
        "Agent used to answer queries with chain of thoughts for self-guided task completion",
      icon: Bot,
      type: "AgentNode",
      category: "Agents",
    },
  ],
};

const AddNodes = ({ open, onOpenChange, onAddNode }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [draggedNode, setDraggedNode] = useState(null);

  // Filter nodes based on search term
  const filterNodes = (nodes) => {
    if (!searchTerm) return nodes;
    return nodes.filter(
      (node) =>
        node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        node.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleDragStart = (event, node) => {
    setDraggedNode(node);
    event.dataTransfer.setData("application/json", JSON.stringify(node));
    event.dataTransfer.effectAllowed = "copy";
  };

  const handleDragEnd = () => {
    setDraggedNode(null);
  };

  const handleAddNodeClick = (node) => {
    if (onAddNode) {
      onAddNode(node);
      onOpenChange(false);
    }
  };

  const NodeCard = ({ node }) => {
    const isDragging = draggedNode?.id === node.id;

    return (
      <div
        draggable
        onDragStart={(e) => handleDragStart(e, node)}
        onDragEnd={handleDragEnd}
        onClick={() => handleAddNodeClick(node)}
        className={`
          group relative p-4 border border-border rounded-lg cursor-grab active:cursor-grabbing hover:cursor-pointer
          transition-all duration-200 hover:shadow-md hover:border-primary/50
          ${isDragging ? "opacity-50" : ""}
          bg-card hover:bg-accent/50 select-none
        `}
      >
        <div className="flex items-start gap-3">
          <div className="text-2xl flex-shrink-0 w-8 h-8 flex items-center justify-center">
            {React.isValidElement(node.icon)
              ? node.icon
              : React.createElement(node.icon, {
                  className: "text-blue-600",
                  size: 20,
                })}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {node.name}
              </h3>
              <div className="text-xs text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                Click to add
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {node.description}
            </p>
          </div>
        </div>

        {/* Drag indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            className="text-muted-foreground"
          >
            <path
              d="M8 6h.01M8 10h.01M8 14h.01M8 18h.01M12 6h.01M12 10h.01M12 14h.01M12 18h.01M16 6h.01M16 10h.01M16 14h.01M16 18h.01"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    );
  };

  const TabButton = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 text-sm font-medium rounded-md transition-all duration-200
        ${
          isActive
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
        }
      `}
    >
      {label}
    </button>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          variant="secondary"
          size="icon"
          title="Add Node"
          aria-label="Add node"
          className="rounded-full w-10 h-10 p-0 shadow-2xl flex items-center justify-center transition-transform transition-shadow duration-200 hover:scale-105 active:scale-95 focus:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/50 bg-gradient-to-br from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 hover:shadow-2xl elevated-btn"
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
            className="text-current"
          >
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
        </Button>
      </DialogTrigger>

      <DialogContent
        showCloseButton={true}
        className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 fixed left-8 top-30 z-50 grid w-full max-w-sm gap-4 rounded-xl border bg-background p-6 shadow-2xl duration-200"
      >
        <DialogHeader>
          <DialogTitle>Add Nodes</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Drag & drop or click to add nodes to your canvas
          </p>
        </DialogHeader>

        <div className="space-y-4 flex-1 overflow-hidden max-h-[70vh]">
          {/* Search Input */}
          <div className="relative">
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <Input
              placeholder="Search nodes"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 border-2 border-primary/20 focus:border-primary transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M18 6L6 18M6 6l12 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>

          {/* Category Tabs - For now just showing Agents */}
          <div className="flex gap-2 p-1 bg-muted rounded-lg">
            <TabButton
              label="Agents"
              isActive={true}
              onClick={() => {}} // No-op for now
            />
            <div className="px-2 py-2 text-xs text-muted-foreground/50">
              More coming soon...
            </div>
          </div>

          <Separator />

          {/* Node Lists */}
          <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
            <div>
              <h3 className="text-base font-semibold mb-3 text-foreground">
                Agents
              </h3>
              <div className="grid gap-3">
                {filterNodes(nodeTypes.agents).map((node) => (
                  <NodeCard key={node.id} node={node} />
                ))}
              </div>
            </div>

            {/* No results message */}
            {searchTerm && filterNodes(nodeTypes.agents).length === 0 && (
              <div className="text-center py-6">
                <div className="text-3xl mb-2">🔍</div>
                <p className="text-muted-foreground text-sm">
                  No nodes found matching "{searchTerm}"
                </p>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddNodes;
