import { motion } from "motion/react";
import { Mail, Github, Twitter, Heart, Coffee, Pen } from "lucide-react";

export default function About() {
  return (
    <div className="max-w-3xl mx-auto space-y-12 py-12">
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-amber-200 to-rose-200 dark:from-amber-900/40 dark:to-rose-900/40 flex items-center justify-center border-4 border-white dark:border-gray-800 shadow-xl"
        >
          <Pen className="w-16 h-16 text-amber-600 dark:text-amber-400" />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900 dark:text-gray-100">
          关于我
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          一个热爱文字与代码的创作者
        </p>
      </motion.section>

      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="bg-white dark:bg-[#242424] rounded-2xl p-8 md:p-10 shadow-lg border border-gray-100 dark:border-gray-800"
      >
        <h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-500" />
          我的故事
        </h2>
        <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
          <p>
            你好！我是一名热爱生活的文字工作者和前端开发者。在代码与文字之间，我找到了表达自我的最佳方式。
          </p>
          <p>
            这个博客是我记录生活、分享思考的小天地。我相信，每一个平凡的日子里都藏着诗意，每一次键盘的敲击都在编织着故事。
          </p>
          <p>
            我喜欢用文字捕捉生活中的美好瞬间，也热衷于探索最新的前端技术。在这里，文艺与技术并不矛盾，它们共同构成了我的世界。
          </p>
        </div>
      </motion.section>

      {/* Interests */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <Coffee className="w-6 h-6 text-amber-600" />
          我的兴趣
        </h2>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: "📚", title: "阅读", desc: "在书海中遨游" },
            { icon: "✍️", title: "写作", desc: "用文字记录生活" },
            { icon: "💻", title: "编程", desc: "用代码创造美好" },
            { icon: "🎨", title: "设计", desc: "追求视觉之美" },
            { icon: "☕", title: "咖啡", desc: "享受慢生活" },
            { icon: "🌿", title: "自然", desc: "在山川中寻找灵感" },
          ].map((interest, index) => (
            <motion.div
              key={interest.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
              whileHover={{ y: -5 }}
              className="bg-white dark:bg-[#242424] rounded-xl p-6 text-center shadow-md border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all"
            >
              <div className="text-4xl mb-3">{interest.icon}</div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100 mb-1">
                {interest.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {interest.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Contact */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="bg-gradient-to-br from-amber-50 to-rose-50 dark:from-amber-900/10 dark:to-rose-900/10 rounded-2xl p-8 md:p-10 border border-amber-100 dark:border-amber-900/30"
      >
        <h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-gray-100 text-center">
          联系我
        </h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
          欢迎与我交流，分享你的想法和故事
        </p>
        <div className="flex justify-center gap-4">
          {[
            { icon: Mail, label: "邮箱", color: "hover:text-blue-600" },
            { icon: Github, label: "GitHub", color: "hover:text-gray-900 dark:hover:text-gray-100" },
            { icon: Twitter, label: "Twitter", color: "hover:text-sky-500" },
          ].map((social, index) => (
            <motion.button
              key={social.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              whileHover={{ scale: 1.1, y: -5 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-full bg-white dark:bg-[#242424] shadow-md ${social.color} transition-all border border-gray-200 dark:border-gray-700`}
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </motion.button>
          ))}
        </div>
      </motion.section>

      {/* Quote */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="text-center py-8"
      >
        <blockquote className="text-xl md:text-2xl font-serif text-gray-700 dark:text-gray-300 italic">
          "生活不止眼前的苟且，还有诗和远方。"
        </blockquote>
      </motion.div>
    </div>
  );
}
