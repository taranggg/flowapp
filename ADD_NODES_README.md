# Add Nodes Modal - Drag & Drop Feature

## Overview

The Add Nodes modal provides a seamless drag-and-drop interface for adding different types of nodes to the canvas.

## Features

### 🎯 Main Components

- **AddNodes Modal**: A side panel that opens when you click the '+' button on the canvas
- **Drag & Drop**: Visual drag-and-drop functionality to add nodes to the canvas
- **Search**: Filter nodes by name or description
- **Categories**: Organized node types (currently focused on Agents)

### 🚀 How to Use

1. **Open the Modal**

   - Click the blue '+' button in the top-left corner of the canvas
   - The modal will slide in from the right side

2. **Search for Nodes**

   - Use the search bar to filter nodes by name or description
   - Search is case-insensitive and searches both name and description

3. **Drag & Drop Nodes**

   - Hover over any node card to see the drag cursor
   - Click and drag the node card onto the canvas
   - A visual preview will follow your cursor during drag
   - When hovering over the canvas, you'll see a drop zone indicator
   - Release to add the node at that position

4. **Visual Feedback**
   - Dragging shows a custom preview of the node
   - Canvas shows a dashed border drop zone when dragging over it
   - Success notification appears when a node is successfully added
   - Node cards have hover effects and drag states

### 🛠️ Current Node Types

#### Agents

- **ReAct Agent**: Agent used to answer queries with chain of thoughts for self-guided task completion
  - Type: `ReActAgentNode`
  - Icon: 🤖
  - Features: Fully functional with inputs for tools, language models, and moderation

### 🎨 Visual Features

- **Drag Preview**: Custom styled drag image with node details
- **Drop Zone**: Animated drop zone with instructions
- **Hover Effects**: Smooth transitions and visual feedback
- **Success Notifications**: Temporary notifications for successful actions
- **Responsive Design**: Works on different screen sizes

### 🔧 Technical Implementation

#### File Structure

- `AddNodes.jsx`: Main modal component with drag functionality
- `Canvas.jsx`: Canvas component with drop handling
- `ReActAgentNode.jsx`: Sample node component
- `CanvasView.jsx`: Main view that integrates everything

#### Key Features

- **State Management**: Local state for drag operations and modal control
- **Event Handling**: Proper drag/drop event handling with data transfer
- **Visual Feedback**: Real-time visual states during drag operations
- **Error Handling**: Graceful error handling for failed drop operations

### 🚧 Future Enhancements

- More node types (LLMs, Utilities, etc.)
- Node templates and presets
- Bulk operations
- Node grouping and categories
- Advanced search and filtering
- Keyboard shortcuts

## Getting Started

1. Start the development server: `npm run dev`
2. Navigate to the canvas view
3. Click the '+' button to open the Add Nodes modal
4. Drag the ReAct Agent onto the canvas
5. The node will appear at the drop location

Enjoy building your flows! 🎉
