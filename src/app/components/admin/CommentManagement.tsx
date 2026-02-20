import { motion } from "motion/react";
import { useState, useEffect } from "react";
import {
  getAllComments,
  deleteComment,
  getCommentsByArticleId,
} from "@/services/adminCommentService";
import type { CommentWithArticle } from "@/services/adminCommentService";
import { MessageSquare, Trash2, Search, Filter, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Link } from "react-router";

export default function CommentManagement() {
  const [comments, setComments] = useState<CommentWithArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterArticle, setFilterArticle] = useState<string>("all");
  const [articles, setArticles] = useState<{ id: string; title: string }[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getAllComments();
        setComments(data);
        // Extract unique articles
        const uniqueArticles = Array.from(
          new Map(data.map(c => [c.article_id, { id: c.article_id, title: c.article_title }])).values()
        );
        setArticles(uniqueArticles);
      } catch (error) {
        console.error("Failed to load comments:", error);
      } finally {
        setLoading(false);
      }
    }
    loadComments();
  }, []);

  // Filter comments
  const filteredComments = comments.filter((comment) => {
    const matchesSearch =
      comment.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (comment.nickname || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesArticle = filterArticle === "all" || comment.article_id === filterArticle;
    return matchesSearch && matchesArticle;
  });

  // Pagination
  const totalPages = Math.ceil(filteredComments.length / itemsPerPage);
  const paginatedComments = filteredComments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDelete = async (commentId: string) => {
    if (!confirm("确定要删除这条评论吗？此操作不可撤销。")) return;

    try {
      await deleteComment(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("删除失败，请重试");
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="animate-pulse bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
          >
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 dark:text-gray-100">
            评论管理
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            共 {comments.length} 条评论
          </p>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white dark:bg-[#242424] rounded-xl p-4 border border-gray-100 dark:border-gray-800">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="搜索评论内容或昵称..."
              className="w-full pl-12 pr-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
            />
          </div>

          {/* Article Filter */}
          <select
            value={filterArticle}
            onChange={(e) => {
              setFilterArticle(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 outline-none transition-all"
          >
            <option value="all">所有文章</option>
            {articles.map((article) => (
              <option key={article.id} value={article.id}>
                {article.title.substring(0, 30)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {paginatedComments.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-[#242424] rounded-xl border border-gray-100 dark:border-gray-800">
            <MessageSquare className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 dark:text-gray-400">暂无评论</p>
          </div>
        ) : (
          paginatedComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* User Info */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 flex items-center justify-center text-white font-medium">
                      {comment.nickname?.[0]?.toUpperCase() ||
                        comment.user_id?.[0]?.toUpperCase() ||
                        "匿名"}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-gray-100">
                        {comment.nickname || `用户 ${comment.user_id?.substring(0, 6)}...`}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-500">
                        {new Date(comment.created_at).toLocaleString("zh-CN")}
                      </p>
                    </div>
                  </div>

                  {/* Comment Content */}
                  <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-3">
                    {comment.content}
                  </p>

                  {/* Article Link */}
                  <Link
                    to={`/article/${comment.article_id}`}
                    className="inline-flex items-center gap-2 text-sm text-amber-600 dark:text-amber-400 hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    {comment.article_title?.substring(0, 40) || "未知文章"}...
                  </Link>
                </div>

                {/* Actions */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(comment.id)}
                  className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  title="删除评论"
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg bg-white dark:bg-[#242424] border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center gap-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <motion.button
                key={page}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg text-sm font-medium transition-colors ${
                  currentPage === page
                    ? "bg-amber-500 text-white"
                    : "bg-white dark:bg-[#242424] border border-gray-200 dark:border-gray-700"
                }`}
              >
                {page}
              </motion.button>
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg bg-white dark:bg-[#242424] border border-gray-200 dark:border-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>
        </div>
      )}
    </div>
  );
}
