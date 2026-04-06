import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import "./index.css";
import Index from "./Index";
import History from "./History";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />}></Route>
      <Route path="/history" element={<History />}></Route>
      <Route path="/logout" element={<Index />}></Route>
    </Routes>
  );
}

const root = document.getElementById("root");
createRoot(root).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
);
