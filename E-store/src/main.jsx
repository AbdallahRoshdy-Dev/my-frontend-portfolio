import "./index.css";
import App from "./App.jsx";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createRoot } from "react-dom/client";
import AuthContextProvider from "./context/AuthContextProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <AuthContextProvider>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
    ,
  </AuthContextProvider>,
);
