import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
//contexts providers imports
import { AuthContextProvider } from "@/contexts/AuthContextProvider";
import { ProdsContextProvider } from "@/contexts/ProdsContextProvider";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ProdsContextProvider>
      <AuthContextProvider>
        <App />
      </AuthContextProvider>
    </ProdsContextProvider>
  </StrictMode>,
);
