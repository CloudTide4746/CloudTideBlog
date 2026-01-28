import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { Mail, Lock, User, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";
import { signUp, isValidEmail, isValidPassword, getErrorMessage } from "@/lib/auth";

export default function Register() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 如果已登录，重定向到首页
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name || !email || !password || !confirmPassword) {
      setError("请填写所有必填项");
      return;
    }

    if (!isValidEmail(email)) {
      setError("请输入有效的邮箱地址");
      return;
    }

    if (!isValidPassword(password)) {
      setError("密码长度至少为 6 位");
      return;
    }

    if (password !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    setLoading(true);

    try {
      const result = await signUp(email, password, { full_name: name });

      if (result.error) {
        setError(getErrorMessage(result.error as any));
      } else {
        setError(null);
        // 注册成功后，显示提示
        alert("注册成功！请检查邮箱以确认账户。");
        navigate("/login");
      }
    } catch (err) {
      setError("注册失败，请重试");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-[#1a1a1a]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="max-w-md mx-auto px-6 py-12"
      >
        {/* Decorative background */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 8.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-200 to-rose-200 dark:from-amber-900/20 dark:to-rose-900/20 rounded-full blur-3xl"
          />
        </div>

        {/* Header */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-center mb-12"
        >
          <Link
            to="/login"
            className="inline-flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
            aria-label="返回登录"
          >
            <motion.div whileHover={{ x: -3 }} transition={{ duration: 0.2 }}>
              <ArrowLeft className="w-4 h-4" />
            </motion.div>
            <span>返回登录</span>
          </Link>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="bg-white dark:bg-[#242424] rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 dark:border-gray-800"
        >
          <h1 className="text-2xl md:text-3xl font-serif mb-2 text-gray-900 dark:text-gray-100 text-center">
            创建新账户
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            加入我们，开启你的创作之旅
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                昵称
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="请输入昵称"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                  disabled={loading}
                  aria-label="昵称"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                邮箱地址
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                  disabled={loading}
                  aria-label="邮箱地址"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="至少 6 位字符"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                  disabled={loading}
                  aria-label="密码"
                />
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                确认密码
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="再次输入密码"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                  disabled={loading}
                  aria-label="确认密码"
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg p-4"
                role="alert"
              >
                <p className="text-sm">{error}</p>
              </motion.div>
            )}

            {/* Submit Button */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
              aria-label="注册"
            >
              {loading ? (
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white/30 border-t-transparent rounded-full"
                />
              ) : (
                "创建账户"
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
