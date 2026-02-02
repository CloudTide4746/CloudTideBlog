import { motion } from "motion/react";
import { Link } from "react-router";
import { Clock, Tag, ArrowRight, BookOpen, Heart, LayoutGrid, List, Sparkles, Quote, Star, Calendar } from "lucide-react";
import { getAllArticles } from "@/services/articleService";
import type { Article } from "@/types/database";
import { personalInfo } from "@/config/personalInfo";
import { useRef, useState, useEffect } from "react";
import Countdown from "@/app/components/Countdown";

type ViewMode = "grid" | "list";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("list");

  useEffect(() => {
    async function loadArticles() {
      try {
        const data = await getAllArticles();
        setArticles(data);
      } catch (error) {
        console.error('Failed to load articles:', error);
      } finally {
        setLoading(false);
      }
    }
    loadArticles();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full mx-auto mb-4"
          />
          <p className="text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 mb-4">暂无文章</p>
          <p className="text-sm text-gray-500 dark:text-gray-500">
            请先在 Supabase 中创建文章数据
          </p>
        </div>
      </div>
    );
  }

  return (
    <div ref={containerRef} className="space-y-16">
      {/* Hero Section with enhanced design */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center py-16 relative overflow-hidden"
      >
        {/* Animated background orbs */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* Large pulsing orb */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.05, 0.03],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-amber-200 to-rose-200 dark:from-amber-900/20 dark:to-rose-900/20 rounded-full blur-3xl"
          />
          {/* Floating small orbs */}
          <motion.div
            animate={{
              x: [0, 20, 0],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-20 left-20 w-24 h-24 bg-purple-300/10 dark:bg-purple-700/10 rounded-full blur-2xl"
          />
          <motion.div
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-20 right-20 w-32 h-32 bg-amber-300/10 dark:bg-amber-700/10 rounded-full blur-2xl"
          />
        </div>

        {/* Decorative quote icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="absolute top-10 left-1/2 -translate-x-1/2"
        >
          <Quote className="w-12 h-12 text-amber-400 dark:text-amber-600" />
        </motion.div>

        {/* Animated dots */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 flex items-center justify-center gap-4"
        >
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-amber-500"
          />
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            className="w-2 h-2 rounded-full bg-rose-500"
          />
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            className="w-2 h-2 rounded-full bg-purple-500"
          />
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 text-gray-900 dark:text-gray-100 leading-tight relative"
        >
          {personalInfo.title}
          <br />
          <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
            {personalInfo.motto}
          </span>
          {/* Decorative sparkles */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-4 -right-8 hidden md:block"
          >
            <Sparkles className="w-8 h-8 text-amber-400 dark:text-amber-600" />
          </motion.div>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          {personalInfo.description}
        </motion.p>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500"
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
          >
            <BookOpen className="w-4 h-4 text-amber-500" />
            {articles.length} 篇文章
          </motion.span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
          >
            <Heart className="w-4 h-4 text-rose-500" />
            用心创作
          </motion.span>
          <span className="w-1 h-1 rounded-full bg-gray-400" />
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 transition-colors"
          >
            <Star className="w-4 h-4 text-amber-500" />
            持续更新
          </motion.span>
        </motion.div>

        {/* New Year Countdown */}
        <div className="mt-10 max-w-2xl mx-auto">
          <Countdown
            targetDate={new Date(new Date().getFullYear() + 1, 0, 1)}
            title="距离新年"
          />
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 mx-auto rounded-full border-2 border-gray-400/50 dark:border-gray-600/50 flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-gray-400/50 dark:bg-gray-600/50 rounded-full" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Featured Article - First one gets special treatment */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="relative"
      >
        {/* Decorative elements */}
        <div className="absolute -top-8 -left-8 w-16 h-16 rounded-full bg-gradient-to-br from-amber-400/20 to-rose-400/20 blur-xl" />
        <div className="absolute -bottom-8 -right-8 w-20 h-20 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-400/20 blur-xl" />

        <Link to={`/article/${articles[0].id}`} className="group block">
          <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#242424] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800">
            {/* Featured badge with pulse effect */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 left-6 z-10 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg"
            >
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 fill-white" />
                精选文章
              </div>
            </motion.div>

            <div className="relative h-[400px] md:h-[500px] overflow-hidden">
              <motion.img
                src={articles[0].image}
                alt={articles[0].title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Content overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 text-white">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs bg-white/20 backdrop-blur-sm mb-4">
                    <Tag className="w-3 h-3" />
                    {articles[0].category}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 leading-tight">
                    {articles[0].title}
                  </h2>
                  <p className="text-lg text-white/90 mb-6 max-w-2xl line-clamp-2">
                    {articles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" />
                      {articles[0].read_time}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-white/50" />
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4" />
                      {articles[0].date}
                    </span>
                    <motion.span
                      className="ml-auto flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm group-hover:bg-white/30 transition-colors"
                      whileHover={{ x: 5 }}
                    >
                      阅读全文 <ArrowRight className="w-4 h-4" />
                    </motion.span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </Link>
      </motion.section>

      {/* Articles Grid/List - Rest of the articles */}
      {articles.length > 1 && (
        <section className="relative">
          {/* Section header with decorative elements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12 flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-amber-500" />
                <h2 className="text-2xl font-serif text-gray-800 dark:text-gray-200">更多文章</h2>
                <Sparkles className="w-5 h-5 text-rose-500" />
              </div>
              <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1 shadow-sm">
              <motion.button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "grid"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
                whileTap={{ scale: 0.95 }}
                title="网格模式"
              >
                <LayoutGrid className="w-5 h-5" />
              </motion.button>
              <motion.button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-md transition-all duration-200 ${
                  viewMode === "list"
                    ? "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 shadow-sm"
                    : "text-gray-500 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50"
                }`}
                whileTap={{ scale: 0.95 }}
                title="列表模式"
              >
                <List className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>

          {viewMode === "grid" ? (
            <div className="grid md:grid-cols-2 gap-8">
              {articles.slice(1).map((article, index) => (
                <ArticleCard key={article.id} article={article} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {articles.slice(1).map((article, index) => (
                <ArticleListItem key={article.id} article={article} index={index} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
    >
      <Link to={`/article/${article.id}`} className="group block h-full">
        <motion.div
          whileHover={{ y: -8 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="h-full bg-white dark:bg-[#242424] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 flex flex-col"
        >
          {/* Image */}
          <div className="relative h-56 overflow-hidden">
            <motion.img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute top-4 right-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50">
                <Tag className="w-3 h-3" />
                {article.category}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="text-xl md:text-2xl font-serif mb-3 text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 flex-1">
              {article.excerpt}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {article.read_time}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>{article.date}</span>
              </div>

              <motion.div
                className="flex items-center gap-1 text-sm text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-opacity"
                whileHover={{ x: 5 }}
              >
                阅读 <ArrowRight className="w-4 h-4" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}

function ArticleListItem({ article, index }: { article: Article; index: number }) {
  // Color schemes for variety - each has its own complete style
  const colorSchemes = [
    {
      gradient: "bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/10 dark:to-orange-900/10",
      accent: "amber",
      bar: "from-amber-500 via-orange-500 to-rose-500",
    },
    {
      gradient: "bg-gradient-to-br from-rose-50 to-pink-50 dark:from-rose-900/10 dark:to-pink-900/10",
      accent: "rose",
      bar: "from-rose-500 via-pink-500 to-purple-500",
    },
    {
      gradient: "bg-gradient-to-br from-purple-50 to-violet-50 dark:from-purple-900/10 dark:to-violet-900/10",
      accent: "purple",
      bar: "from-purple-500 via-violet-500 to-fuchsia-500",
    },
    {
      gradient: "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-900/10 dark:to-teal-900/10",
      accent: "emerald",
      bar: "from-emerald-500 via-teal-500 to-cyan-500",
    },
    {
      gradient: "bg-gradient-to-br from-sky-50 to-blue-50 dark:from-sky-900/10 dark:to-blue-900/10",
      accent: "sky",
      bar: "from-sky-500 via-blue-500 to-indigo-500",
    },
  ];
  const colorScheme = colorSchemes[index % colorSchemes.length];

  // Badge classes
  const badgeClasses = {
    amber: "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200/50 dark:border-amber-800/50",
    rose: "bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-200/50 dark:border-rose-800/50",
    purple: "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 border-purple-200/50 dark:border-purple-800/50",
    emerald: "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200/50 dark:border-emerald-800/50",
    sky: "bg-sky-100 dark:bg-sky-900/40 text-sky-700 dark:text-sky-300 border-sky-200/50 dark:border-sky-800/50",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.5 + index * 0.05 }}
    >
      <Link to={`/article/${article.id}`} className="group block">
        <motion.div
          whileHover={{ x: 6, scale: 1.01 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className={`${colorScheme.gradient} rounded-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 overflow-hidden relative`}
        >
          {/* Decorative corner elements */}
          <div className="absolute top-0 right-0 w-24 h-24 opacity-5 dark:opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M0,100 L100,100 L100,0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-500"
              />
            </svg>
          </div>
          <div className="absolute bottom-0 left-0 w-16 h-16 opacity-5 dark:opacity-10">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                className="text-gray-500"
              />
            </svg>
          </div>

          {/* Main Content */}
          <div className="flex items-start gap-5 relative">
            {/* Decorative Left Bar with gradient */}
            <motion.div
              className="flex-shrink-0 w-1.5 h-20 rounded-full bg-gradient-to-b opacity-70 group-hover:opacity-100 transition-opacity"
              style={{ backgroundImage: `linear-gradient(to bottom, var(--tw-gradient-from), var(--tw-gradient-to))` }}
              whileHover={{ scaleY: 1.3, scaleYOrigin: "center" }}
              transition={{ duration: 0.3 }}
            >
              <div className={`w-full h-full bg-gradient-to-b ${colorScheme.bar} rounded-full`} />
            </motion.div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              {/* Category Badge with icon */}
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.05 }}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${badgeClasses[colorScheme.accent as keyof typeof badgeClasses]} mb-3`}
              >
                <Tag className="w-3 h-3" />
                {article.category}
              </motion.span>

              {/* Title with hover effect */}
              <h3 className="text-lg md:text-xl font-serif mb-2 text-gray-900 dark:text-gray-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors leading-tight">
                {article.title}
              </h3>

              {/* Excerpt */}
              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                {article.excerpt}
              </p>

              {/* Meta Info Bar */}
              <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-500 pt-3 border-t border-gray-200/50 dark:border-gray-700/50">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-500" />
                  {article.read_time}
                </span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <span>{article.date}</span>
                <span className="w-1 h-1 rounded-full bg-gray-400" />
                <motion.span
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-1.5 text-gray-400 group-hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Heart className="w-3 h-3" />
                  喜欢
                </motion.span>
              </div>
            </div>

            {/* Read More Arrow - shows on hover */}
            <motion.div
              className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white dark:bg-[#242424] shadow-lg text-amber-600 dark:text-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300"
              whileHover={{ scale: 1.15, rotate: 10 }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight className="w-5 h-5" />
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.article>
  );
}
