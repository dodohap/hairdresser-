import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "react-query";

import "./index.css";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AuthModalProvider } from "./context/AuthModalContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AuthModalProvider>
        <App />
      </AuthModalProvider>
    </AuthProvider>
  </QueryClientProvider>
);
