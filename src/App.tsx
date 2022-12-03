import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainBlock from "./components/MainBlock";
import "./App.css";
import Result from "./components/Result";
import NotFound from "./components/NotFound";
function App() {
  return (
    <Routes>
      <Route path="/" element={<MainBlock />} />
      <Route path="/result" element={<Result />} />
      <Route path="/404" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/404" />} />
    </Routes>
  );
}

export default App;
