import React from "react";
import { Bot } from "lucide-react";

export default function NodeInfoModal({ isOpen, onClose, nodeData }) {
  if (!isOpen || !nodeData) return null;

  return (
    <div
      className="fixed inset-0 bg-stone-950/80 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Bot className="text-blue-600" size={28} />
            <h2 className="text-xl font-semibold text-gray-800">
              {nodeData.title || "ReAct Agent for LLMs"}
            </h2>
          </div>
        </div>

        <div className="flex gap-2 mb-6">
          <span className="px-3 py-1 bg-yellow-200 text-yellow-800 rounded-full text-sm font-medium">
            reactAgentLLM_1
          </span>
          <span className="px-3 py-1 bg-green-200 text-green-800 rounded-full text-sm font-medium">
            version 2
          </span>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-gray-600 text-sm leading-relaxed">
            Agent that uses the ReAct logic to decide what action to take,
            optimized to be used with LLMs
          </p>
        </div>

        {/* Parameters Table */}
        <div className="space-y-6">
          <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
            Node Parameters
          </h3>

          <div className="overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Label
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Name
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Type
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-700">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">
                    Max Iterations
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    maxIterations
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">number</td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                    {nodeData.maxIterations || 0}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">Node Type</td>
                  <td className="py-3 px-4 text-sm text-gray-600">type</td>
                  <td className="py-3 px-4 text-sm text-gray-600">string</td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                    ReActAgentNode
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">Node ID</td>
                  <td className="py-3 px-4 text-sm text-gray-600">id</td>
                  <td className="py-3 px-4 text-sm text-gray-600">string</td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium font-mono text-xs">
                    {nodeData.nodeId || nodeData.id || "N/A"}
                  </td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm text-gray-900">Title</td>
                  <td className="py-3 px-4 text-sm text-gray-600">title</td>
                  <td className="py-3 px-4 text-sm text-gray-600">string</td>
                  <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                    {nodeData.title || "ReAct Agent for LLMs"}
                  </td>
                </tr>
                {nodeData.description && (
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4 text-sm text-gray-900">
                      Description
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">
                      description
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-600">string</td>
                    <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                      {nodeData.description}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
