import React from "react";
import { Handle, Position } from "@xyflow/react";
import { Bot } from "lucide-react";
import "@xyflow/react/dist/style.css";

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
          ? "border-blue-400 shadow-lg shadow-blue-100/50"
          : "border-gray-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-100/30 focus-within:border-blue-300 focus-within:shadow-lg focus-within:shadow-blue-100/30"
      }`}
    >
      {/* Context Menu */}
      <div
        className={`absolute -top-4 -right-15 z-10 transition-all duration-200 ${
          selected
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100"
        }`}
      >
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-1 flex flex-col gap-1">
          <button
            onClick={() => onCopyNode && onCopyNode()}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            title="Copy Node"
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
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
            </svg>
          </button>
          <button
            onClick={() => onDeleteNode && onDeleteNode()}
            className="p-2 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors"
            title="Delete Node"
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
              <polyline points="3,6 5,6 21,6"></polyline>
              <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
            </svg>
          </button>
          <button
            onClick={() => onInfoNode && onInfoNode()}
            className="p-2 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-colors"
            title="Node Info"
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
              <circle cx="12" cy="12" r="10"></circle>
              <path d="m9,9h0a3,3 0 0,1 6,0c0,2 -3,3 -3,3"></path>
              <path d="m12,17h.01"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3 px-6 py-4">
        <Bot
          className={`transition-colors duration-200 ${
            selected
              ? "text-blue-600"
              : "text-gray-400 group-hover:text-blue-600"
          }`}
          size={24}
        />
        <h3 className="font-semibold text-gray-800 text-lg">
          {data?.toolName ?? "Tool Name"}
        </h3>
      </div>

      {/* Content */}
      <div className="px-6 pb-6">
        <div className="mb-4">
          <div className="flex items-center gap-2">
            <span className="text-gray-700 text-sm font-medium">Tool ID:</span>
            <span className="text-gray-900 text-sm">{data?.toolId ?? "-"}</span>
          </div>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-gray-700 text-sm font-medium">
              Description:
            </span>
            <span className="text-gray-900 text-sm">
              {data?.toolDescription ?? "-"}
            </span>
          </div>
        </div>

        {/* Additional Parameters Button */}
        <div className="flex justify-center mb-6">
          <button
            type="button"
            className={`text-blue-500 text-sm border border-blue-300 rounded-full px-6 py-2 hover:bg-blue-50 transition-colors relative`}
            onClick={onOpenAdditionalParams}
          >
            Additional Parameters
          </button>
        </div>

        {/* Additional Parameters Section */}
        {data?.additionalParameters && (
          <div className="bg-gray-50 rounded-lg p-3 mt-2">
            <h4 className="text-gray-600 text-xs font-medium mb-1">
              Additional Parameters
            </h4>
            <pre className="text-xs text-gray-800 whitespace-pre-wrap">
              {JSON.stringify(data.additionalParameters, null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* Single Connection Handle */}
      <Handle
        type="source"
        id="toolOutput"
        position={Position.Right}
        className={`!w-2 !h-2 !border-0 transition-colors duration-200 ${
          selected ? "!bg-blue-500" : "!bg-gray-400"
        }`}
        style={{ top: 120 }}
      />
    </div>
  );
}
