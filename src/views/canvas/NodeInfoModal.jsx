import React from "react";
import { Bot, Wrench } from "lucide-react";

const Badge = ({ children, className = "" }) => (
  <span className={`px-3 py-1 rounded-full text-sm font-medium ${className}`}>
    {children}
  </span>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-lg font-medium text-gray-800 border-b border-gray-200 pb-2">
    {children}
  </h3>
);

const JsonBlock = ({ value }) => (
  <pre className="bg-gray-50 rounded p-3 text-xs text-gray-800 whitespace-pre-wrap overflow-x-auto">
    {JSON.stringify(value, null, 2)}
  </pre>
);

const ToolParametersTable = ({ values }) => {
  const hasValues = values && Object.keys(values).length > 0;
  return (
    <div className="overflow-hidden">
      <table className="w-full">
        <thead>
          <tr className="border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
            <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {hasValues ? (
            Object.entries(values).map(([key, value]) => (
              <tr key={key} className="hover:bg-gray-50">
                <td className="py-3 px-4 text-sm text-gray-900">{key}</td>
                <td className="py-3 px-4 text-sm text-gray-900 font-medium">
                  {typeof value === "object" && value !== null ? (
                    <pre className="bg-gray-100 rounded p-2 text-xs text-gray-800 whitespace-pre-wrap overflow-x-auto">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    String(value)
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="py-3 px-4 text-sm text-gray-500" colSpan={2}>
                No tool parameters set.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

const AgentParametersTable = ({ node }) => (
  <div className="overflow-hidden">
    <table className="w-full">
      <thead>
        <tr className="border-b border-gray-200">
          <th className="text-left py-3 px-4 font-medium text-gray-700">Label</th>
          <th className="text-left py-3 px-4 font-medium text-gray-700">Name</th>
          <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
          <th className="text-left py-3 px-4 font-medium text-gray-700">Value</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-100">
        <tr className="hover:bg-gray-50">
          <td className="py-3 px-4 text-sm text-gray-900">Max Iterations</td>
          <td className="py-3 px-4 text-sm text-gray-600">maxIterations</td>
          <td className="py-3 px-4 text-sm text-gray-600">number</td>
          <td className="py-3 px-4 text-sm text-gray-900 font-medium">{node.maxIterations || 0}</td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="py-3 px-4 text-sm text-gray-900">Node Type</td>
          <td className="py-3 px-4 text-sm text-gray-600">type</td>
          <td className="py-3 px-4 text-sm text-gray-600">string</td>
          <td className="py-3 px-4 text-sm text-gray-900 font-medium">ReActAgentNode</td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="py-3 px-4 text-sm text-gray-900">Node ID</td>
          <td className="py-3 px-4 text-sm text-gray-600">id</td>
          <td className="py-3 px-4 text-sm text-gray-600">string</td>
          <td className="py-3 px-4 text-sm text-gray-900 font-medium font-mono text-xs">{node.nodeId || node.id || "N/A"}</td>
        </tr>
        <tr className="hover:bg-gray-50">
          <td className="py-3 px-4 text-sm text-gray-900">Title</td>
          <td className="py-3 px-4 text-sm text-gray-600">title</td>
          <td className="py-3 px-4 text-sm text-gray-600">string</td>
          <td className="py-3 px-4 text-sm text-gray-900 font-medium">{node.title || "ReAct Agent for LLMs"}</td>
        </tr>
        {node.description && (
          <tr className="hover:bg-gray-50">
            <td className="py-3 px-4 text-sm text-gray-900">Description</td>
            <td className="py-3 px-4 text-sm text-gray-600">description</td>
            <td className="py-3 px-4 text-sm text-gray-600">string</td>
            <td className="py-3 px-4 text-sm text-gray-900 font-medium">{node.description}</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const ModalHeader = ({ isTool, node, tool }) => (
  <div className="flex items-center justify-between mb-6">
    <div className="flex items-center gap-3">
      {isTool ? <Wrench className="text-green-600" size={28} /> : <Bot className="text-blue-600" size={28} />}
      <h2 className="text-xl font-semibold text-gray-800">
        {isTool ? node.toolName || "Tool Node" : node.title || "ReAct Agent for LLMs"}
      </h2>
    </div>
  </div>
);

export default function NodeInfoModal({ isOpen, onClose, nodeData }) {
  if (!isOpen || !nodeData) return null;
  const isTool = nodeData.type === "ToolNode";
  const toolData = isTool && nodeData.data ? nodeData.data : nodeData;

  return (
    <div className="fixed inset-0 bg-stone-950/80 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-xl p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <ModalHeader isTool={isTool} node={nodeData} tool={toolData} />

        {isTool ? (
          <>
            <div className="flex gap-2 mb-6">
              {toolData.toolId && <Badge className="bg-green-200 text-green-800">{toolData.toolId}</Badge>}
              <Badge className="bg-blue-100 text-blue-800">Tool</Badge>
            </div>
            {toolData.toolDescription && (
              <div className="mb-8">
                <p className="text-gray-600 text-sm leading-relaxed">{toolData.toolDescription}</p>
              </div>
            )}
            <div className="space-y-6">
              <SectionTitle>Tool Parameters</SectionTitle>
              <ToolParametersTable values={toolData.toolParameterValues} />
            </div>
            <div className="mt-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-1">All Additional Parameters</h4>
              <JsonBlock value={toolData.toolParameterValues || {}} />
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-2 mb-6">
              <Badge className="bg-yellow-200 text-yellow-800">reactAgentLLM_1</Badge>
              <Badge className="bg-green-200 text-green-800">version 2</Badge>
            </div>
            <div className="mb-8">
              <p className="text-gray-600 text-sm leading-relaxed">Agent that uses the ReAct logic to decide what action to take, optimized to be used with LLMs</p>
            </div>
            <div className="space-y-6">
              <SectionTitle>Node Parameters</SectionTitle>
              <AgentParametersTable node={nodeData} />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
