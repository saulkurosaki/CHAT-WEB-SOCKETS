import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { Toaster } from 'react-hot-toast';

import App from "./App";

import "./index.css";

const rootElement = document.getElementById("root");

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
      <Toaster position="bottom-right" />
    </StrictMode>
  );
} else {
  console.error("No se encontró el elemento 'root'");
}
