import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import ChatFlowIndex from "./routes/ChatflowRoutes";
import CanvasView from "./views/canvas/CanvasView";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatflow" element={<ChatFlowIndex />} />
          <Route path="/canvas" element={<CanvasView />} />
          <Route
            path="/agentflow"
            element={
              <div className="p-8">
                <h1>Agentflow - Coming Soon</h1>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
