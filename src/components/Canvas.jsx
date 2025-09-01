import { useState, useCallback, useEffect } from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

function Canvas({ nodes: propNodes, edges: propEdges }) {
  const [nodes, setNodes] = useState(propNodes ?? []);
  // Sync local state when propNodes changes
  useEffect(() => {
    if (propNodes) setNodes(propNodes);
  }, [propNodes]);

  const [edges, setEdges] = useState(propEdges ?? []);
  // Sync local state when propEdges changes
  useEffect(() => {
    if (propEdges) setEdges(propEdges);
  }, [propEdges]);

  const onNodesChange = useCallback(
    (changes) =>
      setNodes((nodesSnapshot) => applyNodeChanges(changes, nodesSnapshot)),
    []
  );
  const onEdgesChange = useCallback(
    (changes) =>
      setEdges((edgesSnapshot) => applyEdgeChanges(changes, edgesSnapshot)),
    []
  );
  const onConnect = useCallback(
    (params) => setEdges((edgesSnapshot) => addEdge(params, edgesSnapshot)),
    []
  );

  return (
    <div style={{ width: "100%", height: "100%" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background />
      </ReactFlow>
    </div>
  );
}

export default Canvas;
