import { useState, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { Copy, Check } from "lucide-react";
import { useImageLightbox } from "./ImageLightbox";
import ImageLightbox from "./ImageLightbox";

export default function MarkdownContent({ content }: { content: string }) {
  const { lightboxData, openLightbox, closeLightbox } = useImageLightbox();
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Extract all images from content for lightbox
  const extractedImages = useCallback(() => {
    const imgRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;
    const result: { src: string; alt: string }[] = [];
    let match;
    while ((match = imgRegex.exec(content)) !== null) {
      result.push({ src: match[2], alt: match[1] });
    }
    return result;
  }, [content])();

  const handleCopyCode = async (code: string, id: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      <ReactMarkdown
        rehypePlugins={[rehypeSlug]}
        components={{
          h1: ({ id, children }) => (
            <h1
              id={id}
              className="scroll-mt-20 text-4xl md:text-5xl font-serif font-bold mt-12 mb-6 text-gray-900 dark:text-gray-100"
            >
              {children}
            </h1>
          ),
          h2: ({ id, children }) => (
            <h2
              id={id}
              className="scroll-mt-20 text-3xl md:text-4xl font-serif font-bold mt-12 mb-6 text-gray-900 dark:text-gray-100"
            >
              {children}
            </h2>
          ),
          h3: ({ id, children }) => (
            <h3
              id={id}
              className="scroll-mt-20 text-2xl md:text-3xl font-serif font-bold mt-10 mb-4 text-gray-900 dark:text-gray-100"
            >
              {children}
            </h3>
          ),
          h4: ({ id, children }) => (
            <h4
              id={id}
              className="scroll-mt-20 text-xl md:text-2xl font-serif font-bold mt-8 mb-3 text-gray-900 dark:text-gray-100"
            >
              {children}
            </h4>
          ),
          h5: ({ id, children }) => (
            <h5
              id={id}
              className="scroll-mt-20 text-lg md:text-xl font-serif font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100"
            >
              {children}
            </h5>
          ),
          h6: ({ id, children }) => (
            <h6
              id={id}
              className="scroll-mt-20 text-base md:text-lg font-serif font-bold mt-6 mb-3 text-gray-900 dark:text-gray-100"
            >
              {children}
            </h6>
          ),
          p: ({ children }) => (
            <p className="mb-6 leading-relaxed text-gray-700 dark:text-gray-300">
              {children}
            </p>
          ),
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 underline decoration-amber-400/50 hover:decoration-amber-400 underline-offset-4 transition-colors"
              target={href?.startsWith("http") ? "_blank" : undefined}
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
            >
              {children}
            </a>
          ),
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-amber-400 dark:border-amber-600 bg-amber-50 dark:bg-amber-900/10 py-4 px-6 rounded-r-lg my-6 text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          ul: ({ children }) => (
            <ul className="my-6 space-y-2.5 list-disc list-inside text-gray-700 dark:text-gray-300">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="my-6 space-y-2.5 list-decimal list-inside text-gray-700 dark:text-gray-300">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          code: ({ node, inline, className, children, ...props }: any) => {
            if (inline) {
              return (
                <code
                  className="bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-200 px-2 py-1 rounded text-sm font-mono"
                  {...props}
                >
                  {children}
                </code>
              );
            }
            return (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => {
            const codeElement = children as React.ReactElement;
            const codeText = codeElement?.props?.children || '';
            const codeId = `code-${Math.random().toString(36).substr(2, 9)}`;

            return (
              <div className="relative group my-6">
                <button
                  onClick={() => handleCopyCode(codeText, codeId)}
                  className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 dark:bg-gray-800/50 dark:hover:bg-gray-700/50 text-gray-400 hover:text-white rounded-lg opacity-0 group-hover:opacity-100 transition-all text-sm"
                  title="复制代码"
                >
                  {copiedId === codeId ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>已复制</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>复制</span>
                    </>
                  )}
                </button>
                <pre className="bg-gray-900 dark:bg-gray-950 rounded-xl overflow-x-auto p-4 border border-gray-700 dark:border-gray-800 text-gray-100">
                  {children}
                </pre>
              </div>
            );
          },
          hr: () => (
            <hr className="my-8 border-t-2 border-gray-200 dark:border-gray-700" />
          ),
          img: ({ src, alt }) => {
            const imageIndex = extractedImages.findIndex(img => img.src === src);
            return (
              <img
                src={src}
                alt={alt}
                className="rounded-xl shadow-lg my-8 max-w-full h-auto cursor-zoom-in hover:opacity-90 transition-opacity"
                onClick={() => openLightbox(extractedImages, imageIndex)}
              />
            );
          },
          table: ({ children }) => (
            <div className="overflow-x-auto my-6">
              <table className="min-w-full border-collapse border border-gray-200 dark:border-gray-700 rounded-lg">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-100 dark:bg-gray-800">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-3.5 text-left font-semibold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-3.5 text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-700">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>

      {/* Image Lightbox */}
      {lightboxData && (
        <ImageLightbox
          images={lightboxData.images}
          initialIndex={lightboxData.initialIndex}
          isOpen={!!lightboxData}
          onClose={closeLightbox}
        />
      )}
    </>
  );
}
