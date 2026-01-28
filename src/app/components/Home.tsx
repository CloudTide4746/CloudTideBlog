import { motion, useScroll, useTransform } from "motion/react";
import { Link } from "react-router";
import { Clock, Tag, ArrowRight, BookOpen, Heart } from "lucide-react";
import { getAllArticles } from "@/services/articleService";
import type { Article } from "@/types/database";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

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
    <div ref={containerRef} className="space-y-20">
      {/* Hero Section with enhanced design */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center py-16 relative"
      >
        {/* Decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
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
        </div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-1.5 rounded-full text-sm bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900/30 dark:to-rose-900/30 text-gray-700 dark:text-gray-300 border border-amber-200/50 dark:border-amber-800/50">
            欢迎来到文艺的世界
          </span>
        </motion.div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 text-gray-900 dark:text-gray-100 leading-tight">
          在文字中
          <br />
          <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
            寻找生活的诗意
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-gray-600 dark:text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
        >
          记录生活 · 分享思考 · 用文字温暖彼此的心灵
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-500 dark:text-gray-500"
        >
          <span className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            {articles.length} 篇文章
          </span>
          <span>·</span>
          <span className="flex items-center gap-2">
            <Heart className="w-4 h-4" />
            用心创作
          </span>
        </motion.div>
      </motion.section>

      {/* Featured Article - First one gets special treatment */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <Link to={`/article/${articles[0].id}`} className="group block">
          <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#242424] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800">
            {/* Featured badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="absolute top-6 left-6 z-10 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg"
            >
              精选文章
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
                  <span className="inline-block px-3 py-1 rounded-full text-xs bg-white/20 backdrop-blur-sm mb-4">
                    {articles[0].category}
                  </span>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif mb-4 leading-tight">
                    {articles[0].title}
                  </h2>
                  <p className="text-lg text-white/90 mb-6 max-w-2xl line-clamp-2">
                    {articles[0].excerpt}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-white/80">
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {articles[0].read_time}
                    </span>
                    <span>·</span>
                    <span>{articles[0].date}</span>
                    <motion.span
                      className="ml-2 flex items-center gap-1 group-hover:gap-2 transition-all"
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

      {/* Articles Grid - Rest of the articles */}
      {articles.length > 1 && (
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12 flex items-center gap-4"
          >
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
            <h2 className="text-2xl font-serif text-gray-800 dark:text-gray-200">更多文章</h2>
            <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {articles.slice(1).map((article, index) => (
              <ArticleCard key={article.id} article={article} index={index} />
            ))}
          </div>
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
              <span className="inline-block px-3 py-1 rounded-full text-xs bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm text-gray-700 dark:text-gray-300 border border-gray-200/50 dark:border-gray-700/50">
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
                <span>·</span>
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
