import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PageLoader from "@/components/shared/PageLoader";

// 1. DYNAMIC IMPORTS (Lazy Loading for Performance Optimization)
const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const ClientDirectory = lazy(() => import("@/features/clients/pages/ClientDirectory"));
const ClientDetail = lazy(() => import("@/features/clients/pages/ClientDetail"));
const KanbanBoard = lazy(() => import("@/features/pipeline/pages/KanbanBoard"));
const PerformanceHub = lazy(() => import("@/features/reporting/PerformanceHub"));
const SystemSettings = lazy(() => import("@/features/settings/SystemSettings"));

// Helper to wrap lazy components
const Loadable = (Component: React.ComponentType) => 
  React.createElement(Suspense, { 
    fallback: React.createElement(PageLoader),
    children: React.createElement(Component) 
  });

export const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(MainLayout),
    children: [
      {
        index: true,
        element: Loadable(Dashboard),
      },
      // CLIENTS DOMAIN
      {
        path: "clients",
        children: [
          {
            index: true,
            element: Loadable(ClientDirectory),
          },
          {
            path: ":id",
            element: Loadable(ClientDetail),
          },
        ],
      },
      // OPERATIONS DOMAIN
      {
        path: "pipeline",
        element: Loadable(KanbanBoard),
      },
      // INTELLIGENCE DOMAIN
      {
        path: "reporting",
        element: Loadable(PerformanceHub),
      },
      // SYSTEM DOMAIN
      {
        path: "settings",
        element: Loadable(SystemSettings),
      },
      // FALLBACK PROTECTION (Only catches truly broken links now)
      {
        path: "*",
        element: React.createElement(Navigate, { to: "/", replace: true }),
      },
    ],
  },
]);