import { useState } from "react";
import { MessageSquare } from "lucide-react";
import { createComment } from "@/services/commentService";
import { useAuth } from "@/app/contexts/AuthContext";
import { motion } from "motion/react";

interface CommentFormProps {
  articleId: string;
  onCommentPosted?: () => void;
}

export function CommentForm({ articleId, onCommentPosted }: CommentFormProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!content.trim()) {
      setError("请输入评论内容");
      return;
    }

    if (!user) {
      setError("请先登录才能发表评论");
      return;
    }

    setSubmitting(true);

    try {
      await createComment(articleId, content);
      setContent("");
      setError(null);
      onCommentPosted?.();
    } catch (err) {
      console.error("Failed to create comment:", err);
      setError("发布失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
        <MessageSquare className="w-5 h-5 text-amber-600" />
        发表评论
      </h3>

      {!user && (
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          请先{" "}
          <a
            href="/login"
            className="text-amber-600 dark:text-amber-400 hover:underline font-medium"
          >
            登录
          </a>
          {" "}后再发表评论
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="分享你的想法..."
          rows={4}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none text-gray-900 dark:text-gray-100"
          disabled={!user || submitting}
          aria-label="评论内容"
        />

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

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={submitting || !user || !content.trim()}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="发表评论"
        >
          {submitting ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <MessageSquare className="w-4 h-4" />
              <span className="text-sm font-medium">
                {submitting ? "发布中..." : "发表评论"}
              </span>
            </>
          )}
        </motion.button>
      </form>
    </div>
  );
}

export default CommentForm;
