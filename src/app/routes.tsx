import { createHashRouter, Navigate } from "react-router";
import Root from "@/app/components/Root";
import Home from "@/app/components/Home";
import ArticleDetail from "@/app/components/ArticleDetail";
import About from "@/app/components/About";
import Portfolio from "@/app/components/Portfolio";
import NotFound from "@/app/components/NotFound";
import Login from "@/app/components/Login";
import Register from "@/app/components/Register";
import Dashboard from "@/app/components/admin/Dashboard";
import ArticleList from "@/app/components/admin/ArticleList";
import ArticleEditor from "@/app/components/admin/ArticleEditor";
import ImageUploader from "@/app/components/admin/ImageUploader";
import StatsPanel from "@/app/components/admin/StatsPanel";
import ProtectedRoute from "@/app/components/ProtectedRoute";
import AdminProtectedRoute from "@/app/components/AdminProtectedRoute";

function ImageUploaderWrapper() {
  return (
    <ProtectedRoute fallback={<Navigate to="/login" replace />}>
      <ImageUploader />
    </ProtectedRoute>
  );
}

export const router = createHashRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "article/:id", Component: ArticleDetail },
      { path: "about", Component: About },
      { path: "portfolio", Component: Portfolio },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/login",
    Component: Root,
    children: [
      { index: true, Component: Login },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/register",
    Component: Root,
    children: [
      { index: true, Component: Register },
      { path: "*", Component: NotFound },
    ],
  },
  {
    path: "/admin",
    Component: Root,
    children: [
      { index: true, Component: Dashboard },
      { 
        path: "list", 
        element: (
          <AdminProtectedRoute>
            <ArticleList />
          </AdminProtectedRoute>
        )
      },
      { 
        path: "new", 
        element: (
          <AdminProtectedRoute>
            <ArticleEditor />
          </AdminProtectedRoute>
        )
      },
      { 
        path: "edit/:id", 
        element: (
          <AdminProtectedRoute>
            <ArticleEditor />
          </AdminProtectedRoute>
        )
      },
      { 
        path: "stats", 
        element: (
          <AdminProtectedRoute>
            <StatsPanel />
          </AdminProtectedRoute>
        )
      },
      { path: "images", element: <ImageUploaderWrapper /> },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
