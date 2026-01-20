import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PageLoader from "@/components/shared/PageLoader"; // Import the externalized loader

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const ClientDirectory = lazy(() => import("@/features/clients/pages/ClientDirectory"));
const ClientDetail = lazy(() => import("@/features/clients/pages/ClientDetail"));
const KanbanBoard = lazy(() => import("@/features/pipeline/pages/KanbanBoard"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "clients",
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<PageLoader />}>
                <ClientDirectory />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ClientDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "pipeline",
        element: (
          <Suspense fallback={<PageLoader />}>
            <KanbanBoard />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);