import { motion } from "motion/react";
import {
  TrendingUp,
  Users,
  MessageSquare,
  Clock,
  FileText,
  Eye,
  Calendar,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getAllArticles } from "@/services/articleService";

export function StatsPanel() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalArticles: 0,
    totalViews: 0,
    totalComments: 0,
    thisMonthArticles: 0,
    topCategory: "",
    avgReadTime: 0,
  });

  useEffect(() => {
    async function loadStats() {
      try {
        const articles = await getAllArticles();

        const totalViews = articles.reduce((sum, a) => sum + (a.views || 0), 0);
        const totalComments = articles.reduce((sum, a) => sum + (a.comment_count || 0), 0);
        const categoryCounts = articles.reduce((acc, a) => {
          acc[a.category] = (acc[a.category] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

        const topCategory = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "";
        const avgReadTime =
          articles.reduce((sum, a) => {
            const minutes = parseInt(a.read_time) || 0;
            return sum + minutes;
          }, 0) / articles.length;

        const thisMonth = new Date().getMonth();
        const thisMonthArticles = articles.filter((a) => {
          const articleDate = new Date(a.created_at);
          return articleDate.getMonth() === thisMonth;
        }).length;

        setStats({
          totalArticles: articles.length,
          totalViews,
          totalComments,
          thisMonthArticles,
          topCategory,
          avgReadTime: Math.round(avgReadTime),
        });
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="animate-pulse bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-amber-600" />
          快速统计
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              label: "文章总数",
              value: stats.totalArticles,
              icon: FileText,
              color: "amber",
            },
            {
              label: "总阅读量",
              value: stats.totalViews.toLocaleString(),
              icon: Eye,
              color: "blue",
            },
            {
              label: "总评论数",
              value: stats.totalComments,
              icon: MessageSquare,
              color: "purple",
            },
            {
              label: "本月文章",
              value: stats.thisMonthArticles,
              icon: Calendar,
              color: "green",
            },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className={`bg-${stat.color}-50 dark:bg-${stat.color}-900/20 border-${stat.color}-200 dark:border-${stat.color}-800 rounded-xl p-6`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <stat.icon className="w-5 h-5 text-${stat.color}-600 dark:text-${stat.color}-400" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</p>
                </div>
              </div>
              <p className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                {typeof stat.value === "number" ? stat.value.toLocaleString() : stat.value}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Detailed Stats */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Clock className="w-6 h-6 text-amber-600" />
          详细统计
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Avg Read Time */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              平均阅读时间
            </h3>
            <div className="flex items-center gap-4">
              <div className="text-5xl font-bold text-amber-600 dark:text-amber-400">
                {stats.avgReadTime}
              </div>
              <span className="text-gray-600 dark:text-gray-400">分钟</span>
            </div>
          </motion.div>

          {/* Top Category */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              最受欢迎分类
            </h3>
            <div className="space-y-3">
              <p className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                {stats.topCategory}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                根据文章数量统计
              </p>
            </div>
          </motion.div>

          {/* Activity Graph Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">
              用户活跃度
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              近 7 天访问趋势
            </p>
            <div className="h-32 flex items-end gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: Math.random() * 80 + 20 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="w-full bg-gradient-to-t from-amber-500 to-rose-500 rounded-t-lg"
                />
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Users Stats (Placeholder) */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Users className="w-6 h-6 text-amber-600" />
          用户统计
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              label: "注册用户数",
              value: "0",
              description: "暂未实现用户统计",
            },
            {
              label: "活跃用户",
              value: "0",
              description: "过去 7 天内有交互的用户",
            },
            {
              label: "新用户",
              value: "0",
              description: "过去 7 天注册的新用户",
            },
          ].map((userStat, index) => (
            <motion.div
              key={userStat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
              className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {userStat.label}
                </p>
                <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">
                  {userStat.value}
                </span>
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-500">
                {userStat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

export default StatsPanel;
