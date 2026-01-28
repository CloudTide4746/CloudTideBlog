import { motion, AnimatePresence } from "motion/react";
import {
  Edit2,
  Trash2,
  Plus,
  ChevronDown,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router";
import { getAllArticles, deleteArticle } from "@/services/articleService";
import type { Article } from "@/types/database";
import { useState, useEffect } from "react";
import { useAuth } from "@/app/contexts/AuthContext";

export function ArticleList() {
  const { user } = useAuth();
  const [articles, setArticles] = useState<Article[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getAllArticles();
        setArticles(data);
        const uniqueCategories = Array.from(new Set(data.map((a) => a.category)));
        setCategories(uniqueCategories);
      } catch (error) {
        console.error("Failed to load articles:", error);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || article.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleDelete = async (id: string) => {
    if (!confirm("确定要删除这篇文章吗？此操作不可撤销。")) return;

    try {
      await deleteArticle(id);
      setArticles(articles.filter((a) => a.id !== id));
    } catch (error) {
      console.error("Failed to delete article:", error);
      alert("删除失败，请重试");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="animate-pulse bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800 space-y-4">
            <div className="h-48 w-full bg-gray-200 dark:bg-gray-800 rounded-lg" />
            <div className="h-4 w-full bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Search and Filter */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索文章..."
              className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
              aria-label="搜索文章"
            />
          </div>

          {/* Category Filter */}
          <div className="relative">
            <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <select
              value={selectedCategory || ""}
              onChange={(e) => setSelectedCategory(e.target.value || null)}
              className="pl-12 pr-10 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all appearance-none cursor-pointer"
              aria-label="筛选分类"
            >
              <option value="">所有分类</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>

        {/* New Article Button */}
        {user && (
          <Link
            to="/admin/new"
            className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
            aria-label="创建新文章"
          >
            <Plus className="w-4 h-4" />
            <span className="text-sm font-medium">新文章</span>
          </Link>
        )}
      </div>

      {/* Results Count */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-sm text-gray-600 dark:text-gray-400"
      >
        显示 {filteredArticles.length} 篇文章{searchQuery && ` · 搜索: "${searchQuery}"`}
        {selectedCategory && ` · 分类: ${selectedCategory}`}
      </motion.p>

      {/* Articles List */}
      <AnimatePresence mode="popLayout">
        {filteredArticles.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white dark:bg-[#242424] rounded-2xl p-12 text-center border border-gray-100 dark:border-gray-800"
          >
            <div className="space-y-4">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-xl font-serif text-gray-900 dark:text-gray-100 mb-2">
                没有找到文章
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {searchQuery || selectedCategory ? "尝试使用其他搜索条件" : "开始创建你的第一篇文章"}
              </p>
              {user && (
                <Link
                  to="/admin/new"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-md hover:shadow-lg transition-all"
                >
                  <Plus className="w-4 h-4" />
                  创建第一篇文章
                </Link>
              )}
            </div>
          </motion.div>
        ) : (
          <div className="grid gap-4">
            {filteredArticles.map((article) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.02 }}
                className="bg-white dark:bg-[#242424] rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all border border-gray-100 dark:border:border-gray-800 flex flex-col"
              >
                {/* Article Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50">
                      {article.category}
                    </span>
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 flex-1 space-y-3">
                  <h3 className="font-serif text-lg text-gray-900 dark:text-gray-100 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500">
                    <span>{article.date}</span>
                    <span>·</span>
                    <span>{article.read_time}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-xs text-gray-600 dark:text-gray-400">
                        已发布
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      {user && (
                        <>
                          <Link
                            to={`/admin/edit/${article.id}`}
                            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors text-gray-600 dark:text-gray-400"
                            aria-label="编辑文章"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDelete(article.id)}
                            className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-600 dark:text-gray-400"
                            aria-label="删除文章"
                          >
                            <Trash2 className="w-4 h-4" />
                          </motion.button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ArticleList;
