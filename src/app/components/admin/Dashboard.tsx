import { motion } from "motion/react";
import { Link, useNavigate } from "react-router";
import { FileText, Users, MessageSquare, Eye, LogOut, Plus, BarChart3, PenTool } from "lucide-react";
import { useAuth } from "@/app/contexts/AuthContext";
import { getAllArticles } from "@/services/articleService";
import type { Article } from "@/types/database";
import { useState, useEffect } from "react";
import { useAdminPassword } from "@/hooks/useAdminPassword";
import AdminLogin from "./AdminLogin";

const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || "admin123";

export default function Dashboard() {
  const { user, signOut: authSignOut } = useAuth();
  const {
    isAuthenticated,
    loading: passwordLoading,
    password,
    setPassword,
    error,
    handleLogin,
    handleLogout,
  } = useAdminPassword(ADMIN_PASSWORD);
  const navigate = useNavigate();
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    totalComments: 0,
  });

  useEffect(() => {
    async function loadDashboard() {
      try {
        const data = await getAllArticles();
        setArticles(data);
        setStats({
          totalArticles: data.length,
          totalViews: data.reduce((sum, a) => sum + (a.views || 0), 0),
          totalComments: data.reduce((sum, a) => sum + (a.comment_count || 0), 0),
        });
      } catch (error) {
        console.error("Failed to load dashboard:", error);
      } finally {
        setLoading(false);
      }
    }
    loadDashboard();
  }, []);

  const handleSignOut = async () => {
    handleLogout();
    await authSignOut();
    navigate("/");
  };

  if (passwordLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin password={password} setPassword={setPassword} error={error} handleLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-[#1a1a1a]">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-[#faf9f7]/80 dark:bg-[#1a1a1a]/80 border-b border-gray-200/50 dark:border-gray-800/50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <FileText className="w-6 h-6 text-amber-600" />
            <h1 className="text-xl font-serif text-gray-900 dark:text-gray-100">
              博客后台
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {user && (
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {user.email}
              </span>
            )}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSignOut}
              className="flex items-center gap-2 px-3 py-2 rounded-full bg-white dark:bg-[#242424] shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700"
              aria-label="登出"
            >
              <LogOut className="w-4 h-4 text-gray-700 dark:text-gray-300" />
              <span className="text-sm">登出</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:block w-64 h-[calc(100vh-73px)] sticky top-[73px] bg-white dark:bg-[#242424] border-r border-gray-200 dark:border-gray-700">
          <div className="p-4">
            <nav className="space-y-2">
              <Link
                to="/admin"
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400"
                aria-label="概览"
              >
                <BarChart3 className="w-5 h-5" />
                <span className="font-medium">概览</span>
              </Link>
              <Link
                to="/admin/new"
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="新建文章"
              >
                <Plus className="w-5 h-5" />
                <span className="font-medium">新建文章</span>
              </Link>
              <Link
                to="/"
                className="flex items-center gap-3 px-4 py-3 rounded-lg transition-all text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                aria-label="返回首页"
              >
                <FileText className="w-5 h-5" />
                <span className="font-medium">返回首页</span>
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Area */}
        <main className="flex-1 p-6">
          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
                  <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
                  <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
                  <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
                </div>
              ))}
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mb-8"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white">
                        <FileText className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        文章总数
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {stats.totalArticles}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white">
                        <Eye className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        总阅读量
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {stats.totalViews}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        总评论数
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        {stats.totalComments}
                      </p>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    whileHover={{ y: -4, scale: 1.02 }}
                    className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <div className="p-3 rounded-full bg-gradient-to-r from-amber-500 to-rose-500 text-white">
                        <Users className="w-6 h-6" />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        今日访问
                      </p>
                      <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                        0
                      </p>
                    </div>
                  </motion.div>
                </div>
              </motion.section>

              {/* Quick Actions */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-serif text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <PenTool className="w-6 h-6 text-amber-600" />
                    文章管理
                  </h2>
                  <Link
                    to="/admin/new"
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
                    aria-label="创建新文章"
                  >
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">新文章</span>
                  </Link>
                </div>
              </motion.section>

              {/* Recent Articles */}
              <motion.section
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <MessageSquare className="w-6 h-6 text-amber-600" />
                  最近文章
                </h2>

                {articles.length === 0 ? (
                  <div className="bg-white dark:bg-[#242424] rounded-xl p-12 text-center border border-gray-100 dark:border-gray-800">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      还没有文章
                    </p>
                    <Link
                      to="/admin/new"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full hover:shadow-lg transition-all"
                    >
                      <Plus className="w-4 h-4" />
                      创建第一篇文章
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {articles.slice(0, 5).map((article, index) => (
                      <motion.div
                        key={article.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white dark:bg-[#242424] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border-gray-800 flex"
                      >
                        <div className="relative h-32 w-32 flex-shrink-0">
                          <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-4 flex-1 min-w-0 space-y-2">
                          <h3 className="font-medium text-gray-900 dark:text-gray-100 line-clamp-1">
                            {article.title}
                          </h3>
                          <div className="flex items-center gap-3 text-xs text-gray-600 dark:text-gray-400">
                            <span>{article.category}</span>
                            <span>·</span>
                            <span>{article.date}</span>
                          </div>
                          <div className="flex gap-2">
                            <Link
                              to={`/admin/edit/${article.id}`}
                              className="px-3 py-1.5 text-sm bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-md hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                              aria-label="编辑文章"
                            >
                              编辑
                            </Link>
                            <Link
                              to={`/article/${article.id}`}
                              className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                              aria-label="查看文章"
                            >
                              查看
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.section>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
