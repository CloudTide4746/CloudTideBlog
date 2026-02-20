import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, X, Loader2 } from "lucide-react";
import { searchArticles } from "@/services/articleService";
import type { Article } from "@/types/database";
import { Link } from "react-router";

// Highlight search query in text
function HighlightText({ text, query }: { text: string; query: string }) {
  if (!query.trim()) return <>{text}</>;

  const parts = text.split(new RegExp(`(${query})`, 'gi'));

  return (
    <>
      {parts.map((part, i) =>
        part.toLowerCase() === query.toLowerCase() ? (
          <mark key={i} className="bg-amber-200 dark:bg-amber-600/50 text-amber-900 dark:text-amber-100 rounded px-0.5">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function SearchOverlay({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true);
        try {
          const data = await searchArticles(query);
          setResults(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  // Clear query when closed
  useEffect(() => {
    if (!isOpen) {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-white/95 dark:bg-[#1a1a1a]/95 backdrop-blur-xl"
        >
          <div className="max-w-3xl mx-auto px-6 pt-24">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" />
              <input
                type="text"
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="搜索文章..."
                className="w-full pl-14 pr-12 py-4 text-2xl bg-transparent border-b-2 border-gray-200 dark:border-gray-800 focus:border-amber-500 dark:focus:border-amber-400 outline-none text-gray-900 dark:text-gray-100 placeholder-gray-300 dark:placeholder-gray-700 transition-colors"
              />
              <button
                onClick={onClose}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            <div className="mt-8 space-y-4 max-h-[70vh] overflow-y-auto scrollbar-hide">
              {loading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                </div>
              ) : results.length > 0 ? (
                results.map((article) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <Link
                      to={`/article/${article.id}`}
                      onClick={onClose}
                      className="group block p-6 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700"
                    >
                      <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                        <HighlightText text={article.title} query={query} />
                      </h3>
                      <p className="mt-2 text-gray-500 dark:text-gray-400 line-clamp-2">
                        <HighlightText text={article.excerpt} query={query} />
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-sm text-gray-400">
                        <span>{article.date}</span>
                        <span>·</span>
                        <span>{article.category}</span>
                        {article.tags && article.tags.length > 0 && (
                           <>
                             <span>·</span>
                             <div className="flex gap-2">
                               {article.tags.map(tag => (
                                 <span key={tag} className="text-amber-500">#{tag}</span>
                               ))}
                             </div>
                           </>
                        )}
                      </div>
                    </Link>
                  </motion.div>
                ))
              ) : query ? (
                <div className="text-center py-12 text-gray-500">
                  未找到相关文章
                </div>
              ) : (
                 <div className="text-center py-12 text-gray-400">
                   输入关键词开始搜索
                 </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
