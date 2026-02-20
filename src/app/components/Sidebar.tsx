import { Link } from "react-router";
import { motion } from "motion/react";
import { Tag, Clock, TrendingUp, User } from "lucide-react";
import type { Article } from "@/types/database";
import { personalInfo } from "@/config/personalInfo";

interface SidebarProps {
  categories: string[];
  tags: string[];
  recentArticles?: Article[];
  hotArticles?: Article[];
}

export default function Sidebar({ categories, tags, recentArticles = [], hotArticles = [] }: SidebarProps) {
  return (
    <aside className="space-y-8">
      {/* Personal Profile */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
      >
        <div className="text-center">
          <div className="relative inline-block mb-4">
            <img
              src={personalInfo.avatar_url}
              alt={personalInfo.name}
              className="w-20 h-20 rounded-full object-cover border-3 border-amber-500 shadow-lg"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white text-2xl font-medium border-3 border-amber-500 shadow-lg">
              {personalInfo.name?.[0] || '?'}
            </div>
          </div>
          <h3 className="text-lg font-serif text-gray-900 dark:text-gray-100 mb-1">
            {personalInfo.name}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
            {personalInfo.title}
          </p>
          <div className="flex justify-center gap-3">
            {personalInfo.github && (
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            )}
            {personalInfo.bilibili && (
              <a
                href={personalInfo.bilibili}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 2.46c5.522 0 10 4.478 10 10s-4.478 10-10 10S2 19.522 2 14 6.478 4 12 4.46zM9.5 8h1v4.5h-1V8zm4.5 0h1v4.5h-1V8z" />
                </svg>
              </a>
            )}
          </div>
        </div>
      </motion.div>

      {/* Categories */}
      {categories.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-serif text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Tag className="w-5 h-5 text-amber-500" />
            分类
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Link
                key={category}
                to={`/?category=${encodeURIComponent(category)}`}
                className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-400 transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tags */}
      {tags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-serif text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-rose-500" />
            标签
          </h3>
          <div className="flex flex-wrap gap-2">
            {tags.slice(0, 15).map((tag) => (
              <Link
                key={tag}
                to={`/?tag=${encodeURIComponent(tag)}`}
                className="px-3 py-1.5 text-sm rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-rose-700 dark:hover:text-rose-400 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </motion.div>
      )}

      {/* Recent Articles */}
      {recentArticles.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-md border border-gray-100 dark:border-gray-800"
        >
          <h3 className="text-lg font-serif text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-emerald-500" />
            最新文章
          </h3>
          <div className="space-y-3">
            {recentArticles.slice(0, 5).map((article) => (
              <Link
                key={article.id}
                to={`/article/${article.id}`}
                className="group block"
              >
                <h4 className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
                  {article.title}
                </h4>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  {article.date}
                </span>
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </aside>
  );
}
