export function createExportPayload(
  projectName,
  canvasData = { nodes: [], edges: [] }
) {
  const nodes = (canvasData && canvasData.nodes) || [];
  const edges = (canvasData && canvasData.edges) || [];
  return {
    projectName: projectName || "Untitled Chatflow",
    exportedAt: new Date().toISOString(),
    canvasData: {
      nodes,
      edges,
    },
    metadata: {
      nodeCount: nodes.length,
      edgeCount: edges.length,
    },
  };
}

export function exportCanvasToJson(
  projectName,
  canvasData = { nodes: [], edges: [] }
) {
  const payload = createExportPayload(projectName, canvasData);
  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  const safeName = (projectName || "untitled_chatflow")
    .replace(/\s+/g, "_")
    .toLowerCase();
  a.download = `${safeName}_export.json`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return payload;
}
