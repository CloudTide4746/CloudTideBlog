import { motion } from "motion/react";
import { MessageSquare, Trash2, Reply, User } from "lucide-react";
import type { Comment } from "@/services/commentService";

interface CommentItemProps {
  comment: Comment;
  depth?: number;
  onDelete?: (id: string) => void;
  onReply?: (id: string) => void;
  isOwner: boolean;
}

export function CommentItem({ comment, depth = 0, onDelete, onReply, isOwner }: CommentItemProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: depth * -20 }}
      animate={{ opacity: 1, x: 0 }}
      className={depth > 0 ? "ml-4 space-y-3" : "space-y-3"}
    >
      <div className="bg-white dark:bg-[#242424] rounded-xl p-4 shadow-md border border-gray-100 dark:border-gray-800">
        {/* Comment Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-400 to-rose-400 flex items-center justify-center text-white text-sm font-medium">
              {comment.user_id?.[0]?.toUpperCase()}
            </div>
            <span className="font-medium text-gray-900 dark:text-gray-100">
              {comment.user_id?.substring(0, 8)}...
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-500">
            <span>
              {new Date(comment.created_at).toLocaleDateString("zh-CN", {
                month: "long",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            {isOwner && onDelete && (
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(comment.id)}
                className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-gray-500 dark:text-gray-500 hover:text-red-600 dark:hover:text-red-400"
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
        {onReply && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onReply(comment.id)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors text-sm"
            aria-label="回复评论"
          >
            <Reply className="w-3.5 h-3.5" />
            <span>回复</span>
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

export default CommentItem;
