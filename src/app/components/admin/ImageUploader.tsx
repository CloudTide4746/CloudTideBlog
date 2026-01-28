import { useState, useRef } from "react";
import { Upload, X, Image as ImageIcon, Check, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "motion/react";

export function ImageUploader({
  onImageSelect,
  maxSize = 5 * 1024 * 1024, // 5MB default
  allowedTypes = ["image/jpeg", "image/png", "image/webp"],
}: {
  onImageSelect: (url: string) => void;
  maxSize?: number;
  allowedTypes?: string[];
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): boolean => {
    if (file.size > maxSize) {
      setError(`文件大小超过限制（最大 ${Math.round(maxSize / 1024 / 1024)}MB）`);
      return false;
    }

    if (!allowedTypes.includes(file.type)) {
      setError(`不支持的文件类型：${file.type}`);
      return false;
    }

    return true;
  };

  const uploadToSupabase = async (file: File) => {
    setError(null);
    setUploading(true);

    try {
      // Generate unique filename
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`;

      // Upload to Supabase Storage
      const { data, error: uploadError } = await supabase.storage
        .from("blog-images")
        .upload(fileName, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (uploadError) {
        setError(uploadError.message);
        return;
      }

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("blog-images")
        .getPublicUrl(data.path);

      onImageSelect(publicUrl!);
    } catch (err) {
      setError("上传失败，请重试");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (validateFile(file)) {
      uploadToSupabase(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (validateFile(file)) {
      uploadToSupabase(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div
      className="relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        ref={fileInputRef}
        type="file"
        onChange={handleFileSelect}
        accept={allowedTypes.join(",")}
        className="hidden"
        aria-label="上传图片"
      />

      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={triggerFileInput}
        className={`
          relative overflow-hidden rounded-xl border-2 border-dashed
          ${dragOver ? "border-amber-500 bg-amber-50 dark:bg-amber-900/20" : "border-gray-300 dark:border-gray-700 bg-white dark:bg-[#242424]"}
          ${dragOver ? "scale-105" : ""}
          transition-all duration-300 cursor-pointer
        `}
      >
        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-[#242424]/90 backdrop-blur-sm">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
            />
          </div>
        ) : error ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/90 dark:bg-[#242424]/90 backdrop-blur-sm">
            <AlertCircle className="w-12 h-12 text-red-500" />
          </div>
        ) : (
          <div className="py-12 text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <Upload className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600" />
            </motion.div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              点击或拖拽图片到此处
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              最大 {Math.round(maxSize / 1024 / 1024)}MB · {allowedTypes.map((t) => t.split("/")[1]).join(", ")}
            </p>
          </div>
        )}
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 rounded-lg p-4"
          role="alert"
        >
          <p className="text-sm font-medium flex items-center gap-2">
            {error}
            <button
              onClick={() => setError(null)}
              className="p-1 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors"
              aria-label="关闭错误消息"
            >
              <X className="w-4 h-4" />
            </button>
          </p>
        </motion.div>
      )}

      {/* Success Preview */}
      {onImageSelect && !error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex items-center gap-2 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3"
          role="status"
        >
          <Check className="w-4 h-4 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-700 dark:text-green-300">
            图片已选择
          </p>
        </motion.div>
      )}
    </div>
  );
}

export default ImageUploader;
