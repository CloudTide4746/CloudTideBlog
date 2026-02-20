/** @format */

import { Navigate } from "react-router";
import { useAdminPassword } from "@/hooks/useAdminPassword";

//调用本地env变量

// 确保环境变量存在
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "140322Bk";

export function AdminProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isAuthenticated, loading } = useAdminPassword(ADMIN_PASSWORD);

  if (loading) {
    return (
      <div className='min-h-screen flex items-center justify-center'>
        <div className='w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin' />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to='/admin' replace />;
  }

  return <>{children}</>;
}

export default AdminProtectedRoute;
