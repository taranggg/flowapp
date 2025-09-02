import {
  useState,
  useCallback,
  useEffect,
  useImperativeHandle,
  forwardRef,
} from "react";
import {
  ReactFlow,
  applyNodeChanges,
  applyEdgeChanges,
  addEdge,
  Background,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ReActAgentNode from "../views/canvas/ReActAgentNode";

// Define node types
const createNodeTypes = (
  onOpenAdditionalParams,
  onCopyNode,
  onDeleteNode,
  onInfoNode
) => ({
  ReActAgentNode: (props) => (
    <ReActAgentNode
      {...props}
      onOpenAdditionalParams={() => onOpenAdditionalParams(props.id)}
      onCopyNode={() => onCopyNode(props.id, props.data)}
      onDeleteNode={() => onDeleteNode(props.id)}
      onInfoNode={() => onInfoNode(props.id, props.data)}
    />
  ),
});

const Canvas = forwardRef(
  (
    {
      nodes: propNodes,
      edges: propEdges,
      onOpenAdditionalParams,
      onCopyNode,
      onDeleteNode,
      onInfoNode,
    },
    ref
  ) => {
    const [nodes, setNodes] = useState(propNodes ?? []);
    const [isDragOver, setIsDragOver] = useState(false);
    const [notification, setNotification] = useState(null);

    // Create nodeTypes with callbacks
    const nodeTypes = createNodeTypes(
      onOpenAdditionalParams,
      onCopyNode,
      onDeleteNode,
      onInfoNode
    );
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

    // Handle drag over
    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      setIsDragOver(true);
    }, []);

    // Handle drag leave
    const onDragLeave = useCallback((event) => {
      // Only set dragOver to false if we're leaving the canvas entirely
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setIsDragOver(false);
      }
    }, []);

    // Handle drop
    const onDrop = useCallback((event) => {
      event.preventDefault();
      setIsDragOver(false);

      try {
        const data = event.dataTransfer.getData("application/json");
        const nodeData = JSON.parse(data);

        // Get the position where the node was dropped
        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        // Create a new node
        const newNode = {
          id: `${nodeData.type}-${Date.now()}`,
          type: nodeData.type,
          position: { x: x - 140, y: y - 70 }, // Center the node on cursor
          data: {
            title: nodeData.name,
            description: nodeData.description,
            ...nodeData,
          },
        };

        // Add the new node to the canvas
        setNodes((nds) => [...nds, newNode]);

        // Show success notification
        setNotification({
          message: `${nodeData.name} added successfully!`,
          type: "success",
        });

        // Clear notification after 3 seconds
        setTimeout(() => setNotification(null), 3000);
      } catch (error) {
        console.error("Error adding node:", error);
      }
    }, []);

    // Expose nodes and edges to parent component
    useImperativeHandle(ref, () => ({
      getCanvasData: () => ({
        nodes,
        edges,
      }),
      addNode: (nodeData) => {
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
        setNodes((nds) => [...nds, newNode]);
      },
    }));

    return (
      <div style={{ width: "100%", height: "100%", position: "relative" }}>
        {/* Success Notification */}
        {notification && (
          <div
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              backgroundColor:
                notification.type === "success" ? "#10b981" : "#ef4444",
              color: "white",
              padding: "12px 20px",
              borderRadius: "8px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
              zIndex: 1000,
              fontSize: "14px",
              fontWeight: "500",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span>{notification.type === "success" ? "✅" : "❌"}</span>
            {notification.message}
          </div>
        )}

        {/* Drag Over Overlay */}
        {isDragOver && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              border: "3px dashed #3b82f6",
              borderRadius: "12px",
              zIndex: 999,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                backgroundColor: "white",
                padding: "20px 30px",
                borderRadius: "12px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                border: "2px solid #3b82f6",
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <div style={{ fontSize: "24px" }}>📋</div>
              <span
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1f2937",
                }}
              >
                Drop here to add node
              </span>
            </div>
          </div>
        )}

        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDrop={onDrop}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
        </ReactFlow>
      </div>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
