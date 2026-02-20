import { Link, useLocation } from "react-router";
import { Moon, Sun, User, Search, Home, Info, Globe } from "lucide-react";
import { useTheme } from "@/app/contexts/ThemeContext";
import { motion } from "motion/react";
import { personalInfo } from "@/config/personalInfo";
import { useState } from "react";
import { SearchOverlay } from "./SearchOverlay";
import { useI18n } from "@/app/i18n/I18nContext";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useI18n();
  const location = useLocation();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleLanguage = () => {
    setLanguage(language === 'zh' ? 'en' : 'zh');
  };

  const navLinks = [
    { path: "/", label: t('home') },
    { path: "/about", label: t('about') },
    { path: "/portfolio", label: t('portfolio') },
  ];

  return (
    <>
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="sticky top-0 z-50 backdrop-blur-md bg-[#faf9f7]/80 dark:bg-[#1a1a1a]/80 border-b border-gray-200/50 dark:border-gray-800/50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="flex items-center gap-3 text-xl font-serif tracking-wide text-gray-900 dark:text-gray-100 hover:text-amber-600 dark:hover:text-amber-400 transition-colors group"
            >
              <motion.div
                whileHover={{ rotate: 5, scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="relative"
              >
                <img
                  src={personalInfo.avatar_url}
                  alt={personalInfo.name}
                  className="w-9 h-9 rounded-full object-cover border-2 border-amber-500/50 dark:border-amber-400/50 group-hover:border-amber-500 dark:group-hover:border-amber-400 transition-colors"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    e.currentTarget.nextElementSibling?.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-9 h-9 rounded-full bg-gradient-to-br from-amber-400 to-rose-400 flex items-center justify-center text-white">
                  <User className="w-5 h-5" />
                </div>
              </motion.div>
              <span className="hidden md:inline">{personalInfo.title}</span>
            </Link>
            <div className="hidden md:flex gap-6 ml-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative text-sm transition-colors ${
                    location.pathname === link.path
                      ? "text-gray-900 dark:text-gray-100"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Search Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
              aria-label="搜索"
            >
              <Search className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
              aria-label={t('toggleTheme')}
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {theme === "light" ? (
                  <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                ) : (
                  <Sun className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                )}
              </motion.div>
            </motion.button>

            {/* Language Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleLanguage}
              className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
              aria-label="切换语言"
            >
              <Globe className="w-5 h-5 text-gray-700 dark:text-gray-300" />
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden backdrop-blur-md bg-[#faf9f7]/95 dark:bg-[#1a1a1a]/95 border-t border-gray-200/50 dark:border-gray-800/50"
      >
        <div className="flex items-center justify-around px-4 py-3">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`flex flex-col items-center gap-1 transition-colors ${
                location.pathname === link.path
                  ? "text-amber-600 dark:text-amber-400"
                  : "text-gray-500 dark:text-gray-400"
              }`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {link.path === "/" ? (
                  <Home className={`w-6 h-6 ${location.pathname === link.path ? "fill-amber-600 dark:fill-amber-400" : ""}`} />
                ) : (
                  <Info className={`w-6 h-6 ${location.pathname === link.path ? "fill-amber-600 dark:fill-amber-400" : ""}`} />
                )}
              </motion.div>
              <span className="text-xs font-medium">{link.label}</span>
            </Link>
          ))}
        </div>
      </motion.nav>
    </>
  );
}
