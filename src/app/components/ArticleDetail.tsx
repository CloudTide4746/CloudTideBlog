/** @format */

import { motion } from "motion/react";
import { useParams, Link, useNavigate } from "react-router";
import {
  Clock,
  Tag,
  ArrowLeft,
  Heart,
  Share2,
  BookOpen,
  Bookmark,
  List,
} from "lucide-react";
import {
  getArticleById,
  toggleLike,
  toggleBookmark,
  getArticleStats,
} from "@/services/articleService";
import type { Article } from "@/types/database";
import { useState, useEffect } from "react";
import CommentList from "./CommentList";
import { useAuth } from "@/app/contexts/AuthContext";
import MarkdownContent from "./MarkdownContent";
import TableOfContents from "./TableOfContents";

interface Heading {
  id: string;
  text: string;
  level: number;
  index: number;
}

function extractHeadings(markdown: string): Heading[] {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match;
  let index = 0;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].replace(/[#*_`()\[\]]/g, "").trim();
    const id = text
      .toLowerCase()
      .replace(/\s+/g, "-")
      .replace(/[^\w\u4e00-\u9fa5-]/g, "");

    headings.push({ id, text, level, index });
    index++;
  }

  return headings;
}

export default function ArticleDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    likesCount: 0,
    isLiked: false,
    isBookmarked: false,
  });
  const [showToc, setShowToc] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      if (!id) return;
      try {
        const data = await getArticleById(id);
        setArticle(data);

        // Load stats
        const statsData = await getArticleStats(id, user?.id);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load article:", error);
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id, user]);

  const handleLike = async () => {
    if (!article) return;

    const newLiked = !stats.isLiked;
    setStats((prev) => ({
      ...prev,
      isLiked: newLiked,
      likesCount: newLiked ? prev.likesCount + 1 : prev.likesCount - 1,
    }));

    try {
      await toggleLike(article.id);
    } catch (err) {
      setStats((prev) => ({
        ...prev,
        isLiked: !newLiked,
        likesCount: !newLiked ? prev.likesCount + 1 : prev.likesCount - 1,
      }));
    }
  };

  const handleBookmark = async () => {
    if (!user) {
      alert("请先登录");
      return;
    }
    if (!article) return;

    const newBookmarked = !stats.isBookmarked;
    setStats((prev) => ({ ...prev, isBookmarked: newBookmarked }));

    try {
      await toggleBookmark(article.id, user.id);
    } catch (err) {
      setStats((prev) => ({ ...prev, isBookmarked: !newBookmarked }));
    }
  };

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='text-center'>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className='w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4'
          />
          <p className='text-gray-600 dark:text-gray-400'>加载中...</p>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className='text-center py-20'>
        <h2 className='text-2xl font-serif mb-4 text-gray-900 dark:text-gray-100'>
          文章不存在
        </h2>
        <Link
          to='/'
          className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
        >
          返回首页
        </Link>
      </div>
    );
  }

  const headings = extractHeadings(article.content);

  return (
    <div className='max-w-6xl mx-auto px-4 md:px-6 lg:px-8'>
      {/* Main Content */}
      <div className='max-w-4xl lg:mr-64'>
        <motion.article
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            {/* Back Button */}
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: -5 }}
              onClick={() => navigate(-1)}
              className='flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 mb-8 transition-colors'
            >
              <ArrowLeft className='w-4 h-4' />
              <span>返回</span>
            </motion.button>

            {/* Mobile TOC Toggle */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className='lg:hidden flex items-center gap-2 mb-6 px-4 py-2 bg-amber-50 dark:bg-amber-900/30 rounded-lg text-amber-700 dark:text-amber-300'
              onClick={() => setShowToc(!showToc)}
            >
              <List className='w-4 h-4' />
              <span className='text-sm'>目录</span>
            </motion.button>

            {/* Mobile TOC */}
            {showToc && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className='lg:hidden bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-6'
              >
                <nav className='space-y-2'>
                  {headings.map((heading) => (
                    <a
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block text-sm py-1.5 px-3 rounded-lg ${
                        'text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400'
                      }`}
                      style={{ paddingLeft: `${heading.level * 12}px` }}
                      onClick={(e) => {
                        e.preventDefault();
                        const element = document.getElementById(heading.id);
                        if (element) {
                          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                          setShowToc(false);
                        }
                      }}
                    >
                      {heading.text}
                    </a>
                  ))}
                </nav>
              </motion.div>
            )}

            {/* Header */}
            <header className='mb-8 text-center'>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className='flex flex-wrap items-center justify-center gap-2 mb-6'
              >
                <span className='inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900/30 dark:to-rose-900/30 rounded-full text-sm border border-amber-200/50 dark:border-amber-800/50 text-gray-800 dark:text-gray-200'>
                  <Tag className='w-3.5 h-3.5' />
                  {article.category}
                </span>
                {article.tags &&
                  article.tags.map((tag) => (
                    <span
                      key={tag}
                      className='inline-flex items-center px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700'
                    >
                      #{tag}
                    </span>
                  ))}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className='text-4xl md:text-5xl lg:text-6xl font-serif mb-6 text-gray-900 dark:text-gray-100 leading-tight'
              >
                {article.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className='text-xl text-gray-600 dark:text-gray-400 italic mb-6 leading-relaxed'
              >
                {article.excerpt}
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className='flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500'
              >
                <span className='flex items-center gap-1'>
                  <Clock className='w-4 h-4' />
                  {article.read_time}
                </span>
                <span>·</span>
                <span>{article.date}</span>
              </motion.div>
            </header>

            {/* Featured Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6 }}
              className='mb-12 rounded-2xl overflow-hidden shadow-2xl relative group'
            >
              <img
                src={article.image}
                alt={article.title}
                className='w-full h-[500px] object-cover'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300' />
            </motion.div>

            {/* Interaction Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className='flex items-center justify-center gap-4 mb-12'
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleLike}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all border ${
                  stats.isLiked
                    ? "bg-rose-50 dark:bg-rose-900/30 border-rose-200 dark:border-rose-800 text-rose-600 dark:text-rose-400"
                    : "bg-white dark:bg-[#242424] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${stats.isLiked ? "fill-current" : ""}`}
                />
                <span className='text-sm font-medium'>
                  {stats.likesCount > 0 ? stats.likesCount : "喜欢"}
                </span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBookmark}
                className={`flex items-center gap-2 px-6 py-2.5 rounded-full shadow-md hover:shadow-lg transition-all border ${
                  stats.isBookmarked
                    ? "bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400"
                    : "bg-white dark:bg-[#242424] border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300"
                }`}
              >
                <Bookmark
                  className={`w-5 h-5 ${stats.isBookmarked ? "fill-current" : ""}`}
                />
                <span className='text-sm font-medium'>收藏</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  alert("链接已复制到剪贴板");
                }}
                className='flex items-center gap-2 px-6 py-2.5 bg-white dark:bg-[#242424] rounded-full shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300'
              >
                <Share2 className='w-5 h-5' />
                <span className='text-sm font-medium'>分享</span>
              </motion.button>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <MarkdownContent content={article.content} />
            </motion.div>

            {/* Divider */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className='my-16'
            >
              <div className='flex items-center justify-center gap-4'>
                <div className='h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-gray-300 dark:to-gray-700' />
                <BookOpen className='w-5 h-5 text-gray-400' />
                <div className='h-px flex-1 bg-gradient-to-r from-gray-300 dark:from-gray-700 via-gray-300 dark:via-gray-700 to-transparent' />
              </div>
            </motion.div>

            {/* Comments Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95 }}
            >
              {id && <CommentList articleId={id} />}
            </motion.div>

            {/* Footer */}
            <motion.footer
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className='text-center py-12'
            >
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                className='bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-900/10 dark:to-rose-900/10 rounded-2xl p-8 border border-amber-100 dark:border-amber-900/30'
              >
                <p className='text-gray-700 dark:text-gray-300 mb-6 text-lg'>
                  感谢阅读，希望这篇文章能给你带来启发
                </p>
                <Link to='/'>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className='inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all'
                  >
                    <BookOpen className='w-4 h-4' />
                    看更多文章
                  </motion.button>
                </Link>
              </motion.div>
            </motion.footer>
          </motion.article>
        </div>

        {/* Table of Contents - Desktop */}
        {headings.length > 0 && <div className="w-56"></div>}
      </div>
    </div>
  );
}
