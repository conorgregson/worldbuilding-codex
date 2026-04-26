import { createBrowserRouter, Navigate } from "react-router-dom";
import { ProtectedRoute } from "../components/layout/ProtectedRoute";
import { AppShell } from "../components/layout/AppShell";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import WorldsPage from "../pages/WorldsPage";
import WorldDetailPage from "../pages/WorldDetailPage";
import EntityDetailPage from "../pages/EntityDetailPage";
import NotFoundPage from "../pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/worlds" replace />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <RegisterPage />,
  },
  {
    element: (
      <ProtectedRoute>
        <AppShell />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/worlds",
        element: <WorldsPage />,
      },
      {
        path: "/worlds/:worldId",
        element: <WorldDetailPage />,
      },
      {
        path: "/entities/:entityId",
        element: <EntityDetailPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);