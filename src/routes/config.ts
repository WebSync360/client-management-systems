import React, { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PageLoader from "@/components/shared/PageLoader";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const ClientDirectory = lazy(() => import("@/features/clients/pages/ClientDirectory"));
const ClientDetail = lazy(() => import("@/features/clients/pages/ClientDetail"));
const KanbanBoard = lazy(() => import("@/features/pipeline/pages/KanbanBoard"));

// Helper to wrap lazy components without using JSX tags
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
      {
        path: "pipeline",
        element: Loadable(KanbanBoard),
      },
      {
        path: "*",
        element: React.createElement(Navigate, { to: "/", replace: true }),
      },
    ],
  },
]);