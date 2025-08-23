import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { initScrollAnimations } from "./utils/scrollAnimation";
import "./index.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Initialize scroll animations after render
setTimeout(initScrollAnimations, 1000);