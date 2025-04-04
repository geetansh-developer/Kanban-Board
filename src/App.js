import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import "./styles/style.css";
import '@fontsource/inter';
import KanbanBoard from "./components/KanbanBoard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<KanbanBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
