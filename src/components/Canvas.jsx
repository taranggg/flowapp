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
  Controls,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import ReActAgentNode from "../views/canvas/ReActAgentNode";
import ToolNode from "../views/canvas/ToolNode";

const Notification = ({ notification }) => {
  if (!notification) return null;
  const isSuccess = notification.type === "success";
  return (
    <div
      style={{
        position: "absolute",
        top: "20px",
        right: "20px",
        backgroundColor: isSuccess ? "#10b981" : "#ef4444",
        color: "white",
        padding: "12px 20px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        zIndex: 1000,
        fontSize: "14px",
        fontWeight: 500,
        display: "flex",
        alignItems: "center",
        gap: "8px",
      }}
    >
      <span>{isSuccess ? "✅" : "❌"}</span>
      {notification.message}
    </div>
  );
};

const DragOverlay = () => (
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
      <span style={{ fontSize: "18px", fontWeight: 600, color: "#1f2937" }}>
        Drop here to add node
      </span>
    </div>
  </div>
);

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
  ToolNode: (props) => (
    <ToolNode
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

    const nodeTypes = createNodeTypes(
      onOpenAdditionalParams,
      onCopyNode,
      onDeleteNode,
      onInfoNode
    );
    useEffect(() => {
      if (propNodes) {
        setNodes((currentNodes) => {
          if (propNodes.length > currentNodes.length) {
            const currentNodesMap = new Map();
            currentNodes.forEach((node) => {
              currentNodesMap.set(node.id, node);
            });
            const updatedNodes = propNodes.map((node) => {
              const currentNode = currentNodesMap.get(node.id);
              return currentNode
                ? {
                    ...node,
                    position: currentNode.position,
                    data: { ...node.data, ...currentNode.data },
                  }
                : node;
            });
            return updatedNodes;
          }
          const currentNodesMap = new Map();
          currentNodes.forEach((node) => {
            currentNodesMap.set(node.id, node);
          });
          return propNodes.map((node) => {
            const currentNode = currentNodesMap.get(node.id);
            return currentNode
              ? {
                  ...node,
                  position: currentNode.position,
                  data: { ...node.data, ...currentNode.data },
                }
              : node;
          });
        });
      }
    }, [propNodes]);

    const [edges, setEdges] = useState(propEdges ?? []);
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
      (params) => {
        if (!params) return;
        const { source, target, targetHandle } = params;

        const sourceNode = nodes.find((n) => n.id === source);
        const targetNode = nodes.find((n) => n.id === target);

        if (sourceNode?.type === "ToolNode") {
          if (
            targetNode?.type === "ReActAgentNode" &&
            targetHandle === "allowedTools"
          ) {
            setEdges((edgesSnapshot) =>
              addEdge({ ...params, animated: true }, edgesSnapshot)
            );
          } else {
            setNotification({
              message:
                "Tool outputs can only be connected to ReAct Agent Allowed Tools input.",
              type: "error",
            });
            setTimeout(() => setNotification(null), 3000);
          }
          return;
        }

        setEdges((edgesSnapshot) =>
          addEdge({ ...params, animated: true }, edgesSnapshot)
        );
      },
      [nodes, setEdges, setNotification]
    );

    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
      setIsDragOver(true);
    }, []);

    const onDragLeave = useCallback((event) => {
      if (!event.currentTarget.contains(event.relatedTarget)) {
        setIsDragOver(false);
      }
    }, []);

    const onDrop = useCallback((event) => {
      event.preventDefault();
      setIsDragOver(false);

      try {
        const data = event.dataTransfer.getData("application/json");
        const nodeData = JSON.parse(data);

        const rect = event.currentTarget.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const newNode = {
          id: `${nodeData.type}-${Date.now()}`,
          type: nodeData.type,
          position: { x: x - 140, y: y - 70 },
          data: {
            title: nodeData.name,
            description: nodeData.description,
            ...nodeData,
          },
        };

        setNodes((nds) => [...nds, newNode]);

        setNotification({
          message: `${nodeData.name} added successfully!`,
          type: "success",
        });

        setTimeout(() => setNotification(null), 3000);
      } catch (error) {
        console.error("Error adding node:", error);
      }
    }, []);

    useImperativeHandle(ref, () => ({
      getCanvasData: () => ({
        nodes,
        edges,
      }),
      getCurrentNodes: () => nodes,
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
        <Notification notification={notification} />
        {isDragOver && <DragOverlay />}

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
          defaultViewport={{ x: 0, y: 0, zoom: 0.6 }}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    );
  }
);

Canvas.displayName = "Canvas";

export default Canvas;
