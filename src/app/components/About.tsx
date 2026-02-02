import { motion } from "motion/react";
import { Mail, Github, Twitter, Heart, Coffee, User, LucideIcon } from "lucide-react";
import { personalInfo } from "@/config/personalInfo";

// Dynamic icon map
const iconMap: Record<string, LucideIcon> = {
  Mail,
  Github,
  Twitter,
  MessageCircle: Coffee,
  PlayCircle: Twitter,
};

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
          className="w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
        >
          <img
            src={personalInfo.avatar_url}
            alt={personalInfo.name}
            className="w-full h-full object-cover"
          />
        </motion.div>

        <h1 className="text-4xl md:text-5xl font-serif mb-4 text-gray-900 dark:text-gray-100">
          {personalInfo.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-400 text-lg">
          {personalInfo.bio}
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
          {personalInfo.about.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
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
          {personalInfo.interests.map((interest, index) => (
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
              {interest.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {interest.description}
                </p>
              )}
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
        <div className="flex justify-center gap-4 flex-wrap">
          {personalInfo.social_links.map((social, index) => {
            const Icon = iconMap[social.icon] || User;
            return (
              <a
                key={social.label}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-full bg-white dark:bg-[#242424] shadow-md text-gray-700 dark:text-gray-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all border border-gray-200 dark:border-gray-700"
              >
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
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
          "{personalInfo.motto}"
        </blockquote>
      </motion.div>
    </div>
  );
}
