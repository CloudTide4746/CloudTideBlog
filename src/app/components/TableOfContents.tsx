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
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (headings.length === 0) return null;

  return (
    <motion.aside
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="hidden lg:block sticky top-24 w-64 pl-8"
    >
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
          目录
        </h3>
        <nav className="space-y-2">
          {headings.map((heading) => (
            <motion.a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: heading.index * 0.05 }}
              className={`block text-sm py-1.5 px-3 rounded-lg transition-all duration-200 ${
                activeId === heading.id
                  ? "bg-amber-50 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-medium"
                  : "text-gray-600 dark:text-gray-400 hover:text-amber-600 dark:hover:text-amber-400 hover:bg-gray-50 dark:hover:bg-gray-800"
              }`}
              style={{ paddingLeft: `${heading.level * 12}px` }}
            >
              {heading.text}
            </motion.a>
          ))}
        </nav>
      </div>
    </motion.aside>
  );
}
