import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Bot } from "lucide-react";
import "@xyflow/react/dist/style.css";

const IconButton = ({ title, onClick, className = "", children }) => (
  <button onClick={onClick} className={`p-2 rounded-md transition-colors ${className}`} title={title}>
    {children}
  </button>
);

const ContextMenu = ({ selected, onCopyNode, onDeleteNode, onInfoNode }) => (
  <div
    className={`absolute -top-4 -right-15 z-10 transition-all duration-200 ${
      selected ? "opacity-100 scale-100" : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
    }`}
  >
    <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex flex-col gap-1">
      <IconButton title="Copy Node" onClick={() => onCopyNode && onCopyNode()} className="hover:bg-gray-100">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
        </svg>
      </IconButton>
      <IconButton title="Delete Node" onClick={() => onDeleteNode && onDeleteNode()} className="hover:bg-red-50 hover:text-red-600">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="3,6 5,6 21,6"></polyline>
          <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
        </svg>
      </IconButton>
      <IconButton title="Node Info" onClick={() => onInfoNode && onInfoNode()} className="hover:bg-blue-50 hover:text-blue-600">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9,9h0a3,3 0 0,1 6,0c0,2 -3,3 -3,3"></path>
          <path d="m12,17h.01"></path>
        </svg>
      </IconButton>
    </div>
  </div>
);

const NodeHeader = ({ selected, title }) => (
  <div className="flex items-center gap-3 px-6 py-4">
    <Bot className={`transition-colors duration-200 ${selected ? "text-blue-600" : "text-gray-400 group-hover:text-blue-600"}`} size={24} />
    <h3 className="font-semibold text-gray-800 text-lg">{title ?? "ReAct Agent for LLMs"}</h3>
  </div>
);

const SectionHeader = ({ children }) => (
  <div className="bg-gray-100 rounded-lg p-1">
    <h4 className="text-gray-600 text-sm font-medium text-center">{children}</h4>
  </div>
);

const RequiredLabel = ({ text }) => (
  <div className="flex items-center">
    <span className="text-gray-700 text-sm">{text}</span>
    <span className="text-red-500 ml-1">*</span>
  </div>
);

const AdditionalParamsButton = ({ hasValue, onClick }) => (
  <div className="flex justify-center mb-6">
    <button
      type="button"
      className={`text-blue-500 text-sm border border-blue-300 rounded-full px-6 py-2 hover:bg-blue-50 transition-colors relative ${hasValue ? "bg-blue-50" : ""}`}
      onClick={onClick}
    >
      Additional Parameters
    </button>
  </div>
);

export default function ReActAgentNode({
  data,
  selected,
  onOpenAdditionalParams,
  onCopyNode,
  onDeleteNode,
  onInfoNode,
}) {
  return (
    <div
      className={`relative w-[360px] bg-white rounded-xl border transition-all duration-200 font-sans group ${
        selected
          ? "border-blue-400 shadow-lg shadow-blue-100/50"
          : "border-gray-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/30 focus-within:border-blue-300 focus-within:shadow-lg focus-within:shadow-blue-100/30"
      }`}
    >
      <ContextMenu selected={selected} onCopyNode={onCopyNode} onDeleteNode={onDeleteNode} onInfoNode={onInfoNode} />

      <NodeHeader selected={selected} title={data?.title} />

      <div className="px-6 pb-6">
        <SectionHeader>Inputs</SectionHeader>
        <div className="mb-6 -mx-6 px-6 py-4">
          <div className="space-y-4">
            <RequiredLabel text="Allowed Tools" />
            <RequiredLabel text="Language Model" />
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm">Input Moderation</span>
              <div className="w-4 h-4 rounded-full bg-gray-400 flex items-center justify-center">
                <span className="text-white text-xs">i</span>
              </div>
            </div>
          </div>
        </div>

        <AdditionalParamsButton hasValue={data?.maxIterations > 0} onClick={onOpenAdditionalParams} />

        <div>
          <SectionHeader>Output</SectionHeader>
          <div className="flex justify-end">
            <span className="text-gray-800 font-medium text-sm">AgentExecutor</span>
          </div>
        </div>
      </div>

      <Handle
        type="target"
        id="allowedTools"
        position={Position.Left}
        className={`!w-2 !h-2 !border-0 transition-colors duration-200 ${selected ? "!bg-blue-500" : "!bg-gray-400"}`}
        style={{ top: 115 }}
      />
      <Handle
        type="target"
        id="languageModel"
        position={Position.Left}
        className={`!w-2 !h-2 !border-0 transition-colors duration-200 ${selected ? "!bg-blue-500" : "!bg-gray-400"}`}
        style={{ top: 155 }}
      />
      <Handle
        type="target"
        id="inputModeration"
        position={Position.Left}
        className={`!w-2 !h-2 !border-0 transition-colors duration-200 ${selected ? "!bg-blue-500" : "!bg-gray-400"}`}
        style={{ top: 195 }}
      />
      <Handle
        type="source"
        id="agentExecutor"
        position={Position.Right}
        className={`!w-2 !h-2 !border-0 transition-colors duration-200 ${selected ? "!bg-blue-500" : "!bg-gray-400"}`}
        style={{ top: 355 }}
      />
    </div>
  );
}
