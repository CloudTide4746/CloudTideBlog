import { motion } from "motion/react";
import { Link, useParams, useNavigate } from "react-router";
import {
  Save,
  X,
  Upload,
  Image as ImageIcon,
  FileText,
  Calendar,
  Clock,
  Tag,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState, useEffect } from "react";
import { getArticleById, createArticle, updateArticle } from "@/services/articleService";
import type { Article, ArticleInsert } from "@/types/database";
import { useAuth } from "@/app/contexts/AuthContext";
import ReactMarkdown from "react-markdown";

export function ArticleEditor() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();

  const [article, setArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Partial<ArticleInsert>>({
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toLocaleDateString("zh-CN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    read_time: "5分钟",
    category: "生活",
    image: "https://images.unsplash.com/photo-15187062628-d40b2d2810?w=1080&fit=crop",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = [
    "生活",
    "旅行",
    "思考",
    "美学",
    "自然",
    "阅读",
  ];

  useEffect(() => {
    async function loadArticle() {
      if (!id) return;

      setLoading(true);
      try {
        const data = await getArticleById(id);
        if (data) {
          setArticle(data);
          setFormData(data);
        }
      } catch (err) {
        console.error("Failed to load article:", err);
        setError("加载文章失败");
      } finally {
        setLoading(false);
      }
    }
    loadArticle();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.title || !formData.content) {
      setError("请填写标题和内容");
      return;
    }

    setSaving(true);

    try {
      if (article) {
        await updateArticle(article.id, {
          title: formData.title!,
          excerpt: formData.excerpt!,
          content: formData.content!,
          date: formData.date!,
          read_time: formData.read_time!,
          category: formData.category!,
          image: formData.image!,
        });
      } else {
        await createArticle({
          title: formData.title!,
          excerpt: formData.excerpt!,
          content: formData.content!,
          date: formData.date!,
          read_time: formData.read_time!,
          category: formData.category!,
          image: formData.image!,
        });
      }

      alert(article ? "文章更新成功！" : "文章发布成功！");
      navigate("/admin");
    } catch (err) {
      console.error("Failed to save article:", err);
      setError(article ? "更新失败，请重试" : "发布失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse space-y-3">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] dark:bg-[#1a1a1a]">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-50 backdrop-blur-md bg-[#faf9f7]/80 dark:bg-[#1a1a1a]/80 border-b border-gray-200/50 dark:border-gray-800/50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              to="/admin"
              className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
              aria-label="返回后台"
            >
              <X className="w-5 h-5" />
              <span>返回</span>
            </Link>
            <h1 className="text-xl font-serif text-gray-900 dark:text-gray-100">
              {article ? "编辑文章" : "创建新文章"}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            {!previewMode && (
              <button
                onClick={() => setPreviewMode(true)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                aria-label="预览"
              >
                <Eye className="w-4 h-4" />
                <span className="text-sm">预览</span>
              </button>
            )}

            {previewMode && (
              <button
                onClick={() => setPreviewMode(false)}
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
                aria-label="编辑"
              >
                <FileText className="w-4 h-4" />
                <span className="text-sm">编辑</span>
              </button>
            )}

            <motion.button
              type="submit"
              form="article-form"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="保存文章"
            >
              {saving ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {saving ? "保存中..." : "保存"}
                  </span>
                </>
              )}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        <form id="article-form" onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div className="space-y-2">
            <label
              htmlFor="title"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              标题 <span className="text-red-500">*</span>
            </label>
            <input
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="输入文章标题"
              className="w-full px-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
              disabled={saving}
              required
              aria-label="文章标题"
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-2">
            <label
              htmlFor="excerpt"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              摘要（SEO 描述）
            </label>
            <textarea
              id="excerpt"
              value={formData.excerpt}
              onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
              placeholder="简短描述，将显示在文章列表中"
              rows={3}
              className="w-full px-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100 resize-none"
              disabled={saving}
              aria-label="文章摘要"
            />
          </div>

          {/* Content */}
          <div className="space-y-2">
            <label
              htmlFor="content"
              className="text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              内容 <span className="text-red-500">*</span>
              <span className="text-xs text-gray-500 dark:text-gray-500 ml-2">
                支持 Markdown 格式
              </span>
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              placeholder="开始写作..."
              rows={20}
              className="w-full px-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100 font-mono resize-y"
              disabled={saving}
              required
              aria-label="文章内容（支持 Markdown）"
            />
          </div>

          {/* Meta */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category */}
            <div className="space-y-2">
              <label
                htmlFor="category"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                分类
              </label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all appearance-none cursor-pointer text-gray-900 dark:text-gray-100"
                disabled={saving}
                aria-label="文章分类"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Date */}
            <div className="space-y-2">
              <label
                htmlFor="date"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                发布日期
              </label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-gray-400" />
                <input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                  disabled={saving}
                  aria-label="发布日期"
                />
              </div>
            </div>

            {/* Read Time */}
            <div className="space-y-2">
              <label
                htmlFor="read_time"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                预计阅读时间
              </label>
              <div className="relative">
                <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-gray-400" />
                <input
                  id="read_time"
                  type="text"
                  value={formData.read_time}
                  onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                  placeholder="例如：5分钟"
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                  disabled={saving}
                  aria-label="预计阅读时间"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="space-y-2">
              <label
                htmlFor="image"
                className="text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                封面图片 URL
              </label>
              <div className="relative">
                <ImageIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-gray-400" />
                <input
                  id="image"
                  type="url"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="https://..."
                  className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                  disabled={saving}
                  aria-label="封面图片 URL"
                />
              </div>
            </div>
          </div>

          {/* Error Message */}
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

          {/* Tags Input */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              标签（用逗号分隔）
            </label>
            <div className="relative">
              <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-5.5 h-5.5 text-gray-400" />
              <input
                type="text"
                placeholder="例如：技术, 生活, 思考"
                className="w-full pl-12 pr-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all text-gray-900 dark:text-gray-100"
                disabled={saving}
                aria-label="文章标签"
              />
            </div>
          </div>
        </form>

        {/* Preview */}
        {previewMode && formData.content && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white dark:bg-[#242424] rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-800 mt-8"
          >
            <div className="flex items-center justify-between mb-6 border-b border-gray-200 dark:border-gray-700 pb-4">
              <h2 className="text-xl font-serif text-gray-900 dark:text-gray-100">
                文章预览
              </h2>
              <button
                onClick={() => setPreviewMode(false)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                aria-label="关闭预览"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>

            <h1 className="text-3xl md:text-4xl font-serif mb-4 text-gray-900 dark:text-gray-100">
              {formData.title}
            </h1>

            <div className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-serif prose-headings:text-gray-900 dark:prose-headings:text-gray-100
              prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed
              prose-blockquote:border-l-4 prose-blockquote:border-amber-400 dark:prose-blockquote:border-amber-600
              prose-blockquote:bg-amber-50 dark:prose-blockquote:bg-amber-900/10
              prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
            ">
              <ReactMarkdown>{formData.content}</ReactMarkdown>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

export default ArticleEditor;
