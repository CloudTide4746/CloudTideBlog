import { motion } from "motion/react";
import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
  index: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-20% 0px -60% 0px" }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [headings]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ behavior: "smooth", top: 0 });
  };

  if (headings.length === 0) return null;

  return (
    <motion.aside
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="hidden lg:block fixed right-4 top-24 w-56 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-lg border border-gray-100 dark:border-gray-800 p-4"
    >
      <div className="space-y-3 max-h-[70vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
            目录
          </h3>
          <motion.button
            onClick={handleScrollToTop}
            whileHover={{ opacity: 0.7 }}
            className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300"
          >
            回到顶部
          </motion.button>
        </div>
        <nav className="space-y-0.5">
          {headings.map((heading) => (
            <motion.div
              key={heading.id}
              onClick={(e) => handleClick(e, heading.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: heading.index * 0.03, duration: 0.2 }}
              className={`block text-xs py-1 px-2 rounded-md cursor-pointer transition-all duration-200 truncate ${
                activeId === heading.id
                  ? "bg-amber-500 text-white font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20"
              }`}
              style={{ paddingLeft: `${heading.level * 10}px` }}
            >
              {heading.text}
            </motion.div>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}
