import { motion } from "motion/react";
import { personalInfo } from "@/config/personalInfo";
import { useI18n } from "@/app/i18n/I18nContext";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router";

export default function Portfolio() {
  const { t } = useI18n();
  const projects = personalInfo.portfolio || [];

  if (projects.length === 0) {
    return (
      <div className="text-center py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-gray-500 dark:text-gray-400"
        >
          暂无作品展示
        </motion.div>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-4xl md:text-5xl font-serif text-gray-900 dark:text-gray-100 mb-4">
          {t('portfolio')}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          我的个人项目作品集
        </p>
      </motion.div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <article className="group bg-white dark:bg-[#242424] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 h-full flex flex-col">
              {/* Project Image */}
              {project.image && (
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              )}

              {/* Project Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-xl font-serif text-gray-900 dark:text-gray-100 mb-3 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4 flex-1">
                  {project.description}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-lg hover:shadow-lg transition-all text-sm"
                    >
                      <ExternalLink className="w-4 h-4" />
                      {t('viewProject')}
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm"
                    >
                      <Github className="w-4 h-4" />
                      {t('sourceCode')}
                    </a>
                  )}
                </div>
              </div>
            </article>
          </motion.div>
        ))}
      </div>

      {/* Back to Home */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center pt-8"
      >
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          返回首页
        </Link>
      </motion.div>
    </div>
  );
}
