import { lazy, Suspense } from "react";
// STRATEGY: Explicit Type Import
// This satisfies 'verbatimModuleSyntax' by ensuring the compiler 
// knows 'RouteObject' is removed during the JS transpilation.
import { Navigate, type RouteObject } from "react-router-dom";
import MainLayout from "@/layouts/MainLayout";
import PageLoader from "@/components/shared/PageLoader";

// Feature Lazy Loading
const Dashboard = lazy(() => import("@/features/dashboard/Dashboard"));
const ClientDirectory = lazy(() => import("@/features/clients/pages/ClientDirectory"));
const ClientDetail = lazy(() => import("@/features/clients/pages/ClientDetail"));
const KanbanBoard = lazy(() => import("@/features/pipeline/pages/KanbanBoard"));

const withLoading = (Component: React.ElementType) => (
  <Suspense fallback={<PageLoader />}>
    <Component />
  </Suspense>
);

export const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: withLoading(Dashboard) },
      {
        path: "clients",
        children: [
          { index: true, element: withLoading(ClientDirectory) },
          { path: ":id", element: withLoading(ClientDetail) },
        ],
      },
      { path: "pipeline", element: withLoading(KanbanBoard) },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },
];