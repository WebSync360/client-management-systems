import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";

const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const ClientDirectory = lazy(() => import("@/features/clients/pages/ClientDirectory"));
const ClientDetail = lazy(() => import("@/features/clients/pages/ClientDetail"));
const KanbanBoard = lazy(() => import("@/features/pipeline/pages/KanbanBoard"));

function PageLoader() {
  return (
    <div className="flex h-[60vh] w-full items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-brand-500 border-t-transparent" />
        <span className="text-xs font-medium text-brand-600 uppercase tracking-widest animate-pulse">
          Initializing Workspace...
        </span>
      </div>
    </div>
  );
}

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