import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Wrench } from "lucide-react";
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
      <IconButton title="Node Info" onClick={() => onInfoNode && onInfoNode()} className="hover:bg-green-50 hover:text-green-600">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="m9,9h0a3,3 0 0,1 6,0c0,2 -3,3 -3,3"></path>
          <path d="m12,17h.01"></path>
        </svg>
      </IconButton>
    </div>
  </div>
);

const ToolNodeHeader = ({ selected, name }) => (
  <div className="flex items-center gap-3 px-6 py-4">
    <Wrench className={`transition-colors duration-200 ${selected ? "text-green-600" : "text-gray-400 group-hover:text-green-600"}`} size={24} />
    <h3 className="font-semibold text-gray-800 text-lg">{name ?? "Tool Name"}</h3>
  </div>
);

const InfoRow = ({ label, value }) => (
  <div className="flex items-center gap-2 mt-2 first:mt-0">
    <span className="text-gray-700 text-sm font-medium">{label}:</span>
    <span className="text-gray-900 text-sm">{value ?? "-"}</span>
  </div>
);

const AdditionalParamsButton = ({ onClick }) => (
  <div className="flex justify-center mb-6">
    <button
      type="button"
      className="text-green-600 text-sm border border-green-300 rounded-full px-6 py-2 hover:bg-green-50 transition-colors relative"
      onClick={onClick}
    >
      Additional Parameters
    </button>
  </div>
);

const AdditionalParamsPreview = ({ params }) =>
  params ? (
    <div className="bg-gray-50 rounded-lg p-3 mt-2">
      <h4 className="text-gray-600 text-xs font-medium mb-1">Additional Parameters</h4>
      <pre className="text-xs text-gray-800 whitespace-pre-wrap">{JSON.stringify(params, null, 2)}</pre>
    </div>
  ) : null;

export default function ToolNode({
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
          ? "border-green-400 shadow-lg shadow-green-100/50"
          : "border-gray-200 hover:border-green-300 hover:shadow-lg hover:shadow-green-100/30 focus-within:border-green-300 focus-within:shadow-lg focus-within:shadow-green-100/30"
      }`}
    >
      <ContextMenu selected={selected} onCopyNode={onCopyNode} onDeleteNode={onDeleteNode} onInfoNode={onInfoNode} />

      <ToolNodeHeader selected={selected} name={data?.toolName} />

      <div className="px-6 pb-6">
        <div className="mb-4">
          <InfoRow label="Tool ID" value={data?.toolId} />
          <InfoRow label="Description" value={data?.toolDescription} />
        </div>

        <AdditionalParamsButton onClick={onOpenAdditionalParams} />

        <AdditionalParamsPreview params={data?.additionalParameters} />
      </div>
      <Handle
        type="source"
        id="toolOutput"
        position={Position.Right}
        className={`!w-2 !h-2 !border-0 transition-colors duration-200 ${selected ? "!bg-green-500" : "!bg-gray-400"}`}
        style={{ top: 120 }}
      />
    </div>
  );
}
