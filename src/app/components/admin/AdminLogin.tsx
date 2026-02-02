import { motion } from "motion/react";
import { Lock, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface AdminLoginProps {
  password: string;
  setPassword: (password: string) => void;
  error: string;
  handleLogin: () => void;
}

export default function AdminLogin({ password, setPassword, error, handleLogin }: AdminLoginProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f7] dark:bg-[#1a1a1a] px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-white dark:bg-[#242424] rounded-2xl shadow-2xl p-8 border border-gray-200 dark:border-gray-800"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-16 h-16 bg-gradient-to-r from-amber-500 to-rose-500 rounded-full mx-auto mb-4 flex items-center justify-center"
          >
            <Lock className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-2xl font-serif font-bold text-gray-900 dark:text-gray-100 mb-2">
            管理员登录
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            请输入管理密码以访问后台
          </p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              placeholder="输入密码"
              className="w-full px-4 py-3 pr-12 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-400 focus:border-transparent text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label={showPassword ? "隐藏密码" : "显示密码"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-600 dark:text-red-400 text-center"
            >
              {error}
            </motion.p>
          )}

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLogin}
            className="w-full py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all"
          >
            登录
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
