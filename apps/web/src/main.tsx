import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import OrdersDemo from "./pages/OrdersDemo";
import Inbox from "./pages/Inbox";
import Jobs from "./pages/Jobs";
import Wallet from "./pages/Wallet";
import Admin from "./pages/Admin";
import "./styles/tailwind.css";
import "./lib/i18n";
import { ThemeProvider } from "./components/ThemeProvider";
import { ToasterProvider } from "./components/Toaster";

const router = createBrowserRouter([
  { path: "/", element: <App />, children: [
    { index: true, element: <Landing /> },
    { path: "login", element: <Login /> },
    { path: "register", element: <Register /> },
    { path: "orders-demo", element: <OrdersDemo /> },
    { path: "inbox", element: <Inbox /> },
    { path: "jobs", element: <Jobs /> },
    { path: "wallet", element: <Wallet /> },
    { path: "admin", element: <Admin /> }
  ]}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ToasterProvider>
          <RouterProvider router={router} />
        </ToasterProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
