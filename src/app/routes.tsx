import { createHashRouter, Navigate } from "react-router";
import Root from "@/app/components/Root";
import Home from "@/app/components/Home";
import ArticleDetail from "@/app/components/ArticleDetail";
import About from "@/app/components/About";
import NotFound from "@/app/components/NotFound";
import Login from "@/app/components/Login";
import Register from "@/app/components/Register";
import Dashboard from "@/app/components/admin/Dashboard";
import ArticleList from "@/app/components/admin/ArticleList";
import ArticleEditor from "@/app/components/admin/ArticleEditor";
import ImageUploader from "@/app/components/admin/ImageUploader";
import StatsPanel from "@/app/components/admin/StatsPanel";
import ProtectedRoute from "@/app/components/ProtectedRoute";

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
      { path: "list", Component: ArticleList },
      { path: "new", Component: ArticleEditor },
      { path: "edit/:id", Component: ArticleEditor },
      { path: "stats", Component: StatsPanel },
      { path: "images", Component: ImageUploaderWrapper },
      { path: "*", Component: NotFound },
    ],
  },
]);
