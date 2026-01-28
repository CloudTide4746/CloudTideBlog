import { motion, AnimatePresence } from "motion/react";
import { MessageSquare, Reply, User, Trash2, AtSign } from "lucide-react";
import { useState, useEffect } from "react";
import {
  getNestedComments,
  createComment,
  deleteComment as deleteCommentService,
  subscribeToComments,
} from "@/services/commentService";
import type { Comment } from "@/services/commentService";
import { useAuth } from "@/app/contexts/AuthContext";

interface CommentListProps {
  articleId: string;
}

function CommentList({ articleId }: CommentListProps) {
  const { user } = useAuth();
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [submitting, setSubmitting] = useState(false);
  // 署名状态
  const [nickname, setNickname] = useState("");
  const [newCommentContent, setNewCommentContent] = useState("");

  useEffect(() => {
    async function loadComments() {
      setLoading(true);
      try {
        const data = await getNestedComments(articleId);
        setComments(data);
      } catch (error) {
        console.error("Failed to load comments:", error);
      } finally {
        setLoading(false);
      }
    }
    loadComments();

    const subscription = subscribeToComments(articleId, (payload) => {
      if (payload.eventType === "INSERT") {
        setComments((prev) => [...prev, payload.new as Comment]);
      } else if (payload.eventType === "UPDATE") {
        setComments((prev) =>
          prev.map((c) => (c.id === payload.new.id ? payload.new as Comment : c))
        );
      } else if (payload.eventType === "DELETE") {
        setComments((prev) => prev.filter((c) => c.id !== (payload.old as any)?.id));
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [articleId]);

  const handleSubmitReply = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!replyContent.trim()) return;

    setSubmitting(true);

    try {
      await createComment(articleId, replyContent, replyTo, user?.id, nickname);
      setReplyTo(null);
      setReplyContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
      alert("评论失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  const handleNewComment = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newCommentContent.trim()) return;

    setSubmitting(true);

    try {
      await createComment(articleId, newCommentContent, null, user?.id, nickname);
      setNewCommentContent("");
    } catch (error) {
      console.error("Failed to create comment:", error);
      alert("评论失败，请重试");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    if (!confirm("确定要删除这条评论吗？")) return;

    try {
      await deleteCommentService(commentId);
      setComments(comments.filter((c) => c.id !== commentId));
    } catch (error) {
      console.error("Failed to delete comment:", error);
      alert("删除失败，请重试");
    }
  };

  const renderComment = (comment: Comment, depth = 0): React.ReactNode => {
    const isOwner = user?.id === comment.user_id;
    const isReplying = replyTo === comment.id;

    return (
      <motion.div
        key={comment.id}
        initial={{ opacity: 0, x: depth * -20 }}
        animate={{ opacity: 1, x: 0 }}
        className={depth > 0 ? "ml-4 space-y-3" : "space-y-3"}
      >
        <div className={`bg-white dark:bg-[#242424] rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-800 ${isReplying ? "ring-2 ring-amber-500/20" : ""}`}>
          {/* Comment Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 flex items-center justify-center text-white text-sm font-medium">
                {comment.nickname?.[0]?.toUpperCase() || comment.user_id?.[0]?.toUpperCase()}
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {comment.nickname || `用户 ${comment.user_id?.substring(0, 6)}...`}
                </span>
                {user?.id === comment.user_id && (
                  <span className="ml-2 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded">
                    (我)
                  </span>
                )}
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
              <span>
                {new Date(comment.created_at).toLocaleDateString("zh-CN", {
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {isOwner && (
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleDelete(comment.id)}
                  className="p-1 rounded hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-500 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                  aria-label="删除评论"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>

          {/* Comment Content */}
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
            {comment.content}
          </p>

          {/* Reply Actions */}
          {!isReplying && (
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  if (replyTo === comment.id) {
                    setReplyTo(null);
                    setReplyContent("");
                  } else {
                    setReplyTo(comment.id);
                  }
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                  replyTo === comment.id
                    ? "bg-amber-500 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
                aria-label={replyTo === comment.id ? "取消回复" : "回复评论"}
              >
                <Reply className="w-3.5 h-3.5" />
                <span>{replyTo === comment.id ? "取消回复" : "回复"}</span>
              </motion.button>
            </div>
          )}

          {/* Reply Form */}
          {isReplying && (
            <form onSubmit={handleSubmitReply} className="mt-4 space-y-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
              <div className="flex gap-2">
                {!user && (
                  <div className="relative flex-1">
                    <div className="absolute left-3 top-3 z-10">
                      <AtSign className="w-4 h-4 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      value={replyTo === comment.id ? nickname : ""}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="您的署名"
                      className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                      aria-label="署名"
                    />
                  </div>
                )}
                <textarea
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="写下你的回复..."
                  rows={3}
                  className={`flex-1 px-4 py-3 bg-white dark:bg-[#1a1a1a] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none text-gray-900 dark:text-gray-100 ${user ? "w-full" : ""}`}
                  autoFocus
                  aria-label="回复内容"
                />
              </div>
              <div className="flex items-center justify-end gap-2">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setReplyTo(null);
                    setReplyContent("");
                  }}
                  className="px-3 py-1.5 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors text-sm"
                  aria-label="取消回复"
                >
                  取消
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={submitting || !replyContent.trim()}
                  className="flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                  aria-label="提交回复"
                >
                  {submitting ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      <Reply className="w-4 h-4" />
                      发布回复
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          )}
        </div>

        {/* Render nested comments */}
        {comment.children && comment.children.length > 0 && (
          <div className="ml-8 mt-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
            {comment.children.map((child, index) => (
              <div key={index}>{renderComment(child, depth + 1)}</div>
            ))}
          </div>
        )}
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="space-y-4 py-12">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800 space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
            <div className="h-4 w-2/3 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-serif text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-amber-600" />
          评论 ({comments.length})
        </h2>
        {user && (
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {user.email}
          </p>
        )}
      </div>

      {/* Comment Form for new comments */}
      <form onSubmit={handleNewComment} className="bg-white dark:bg-[#242424] rounded-xl p-6 shadow-md border border-gray-100 dark:border-gray-800">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5 text-amber-600" />
          发表评论
        </h3>
        <div className="space-y-3">
          {!user && (
            <div className="relative">
              <div className="absolute left-3 top-3 z-10">
                <AtSign className="w-4 h-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="您的署名（必填）"
                className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                aria-label="署名"
                required
              />
            </div>
          )}
          <textarea
            value={newCommentContent}
            onChange={(e) => setNewCommentContent(e.target.value)}
            placeholder="分享你的想法..."
            rows={4}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none text-gray-900 dark:text-gray-100"
            aria-label="评论内容"
          />
        </div>
        <div className="flex items-center justify-end">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={submitting || !newCommentContent.trim() || (!user && !nickname.trim())}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="发布评论"
          >
            {submitting ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <MessageSquare className="w-4 h-4" />
                发布评论
              </>
            )}
          </motion.button>
        </div>
      </form>

      {/* Comments List */}
      <AnimatePresence mode="popLayout">
        {comments.length === 0 && !loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-12"
          >
            <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-400 dark:text-gray-600" />
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              还没有评论
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-500">
              成为第一个评论者
            </p>
          </motion.div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment, index) => (
              <div key={index}>{renderComment(comment)}</div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CommentList;
