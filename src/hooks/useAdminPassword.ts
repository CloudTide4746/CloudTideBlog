import { useState, useEffect } from "react";

const ADMIN_PASSWORD_KEY = "admin_authenticated";

export function useAdminPassword(requiredPassword: string) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const authStatus = localStorage.getItem(ADMIN_PASSWORD_KEY);
    setIsAuthenticated(authStatus === "true");
    setLoading(false);
  }, []);

  const handleLogin = () => {
    if (password === requiredPassword) {
      localStorage.setItem(ADMIN_PASSWORD_KEY, "true");
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("密码错误");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(ADMIN_PASSWORD_KEY);
    setIsAuthenticated(false);
    setPassword("");
  };

  return {
    isAuthenticated,
    loading,
    password,
    setPassword,
    error,
    handleLogin,
    handleLogout,
  };
}
