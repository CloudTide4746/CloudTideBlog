import { motion } from "motion/react";
import { useState, useEffect } from "react";
import { Settings, Save, Eye, Loader2, Check } from "lucide-react";
import { personalInfo as initialInfo } from "@/config/personalInfo";
import type { PersonalInfo } from "@/types/personalInfo";

export default function BlogSettings() {
  const [info, setInfo] = useState<PersonalInfo>(initialInfo);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Tab state
  const [activeTab, setActiveTab] = useState<"basic" | "social" | "donation">("basic");

  const handleSave = async () => {
    setSaving(true);
    try {
      // In a real app, this would save to a database or config file
      // For now, we'll simulate saving to localStorage
      localStorage.setItem("blog_settings", JSON.stringify(info));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } catch (error) {
      console.error("Failed to save settings:", error);
      alert("保存失败，请重试");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-serif text-gray-900 dark:text-gray-100">
            博客设置
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            管理您的博客基本信息和配置
          </p>
        </div>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setPreviewMode(!previewMode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              previewMode
                ? "bg-amber-500 text-white border-amber-500"
                : "bg-white dark:bg-[#242424] border-gray-200 dark:border-gray-700"
            }`}
          >
            <Eye className="w-4 h-4" />
            {previewMode ? "编辑模式" : "预览"}
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-50"
          >
            {saving ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : saved ? (
              <Check className="w-4 h-4" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            {saved ? "已保存" : "保存设置"}
          </motion.button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
        {[
          { key: "basic", label: "基本信息" },
          { key: "social", label: "社交链接" },
          { key: "donation", label: "打赏设置" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.key
                ? "bg-amber-500 text-white"
                : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {previewMode ? (
        <PreviewMode info={info} />
      ) : (
        <div className="space-y-6">
          {/* Basic Settings */}
          {activeTab === "basic" && (
            <div className="space-y-6">
              {/* Name */}
              <div className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  博客名称
                </label>
                <input
                  type="text"
                  value={info.name}
                  onChange={(e) => setInfo({ ...info, name: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
              </div>

              {/* Title */}
              <div className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  博客标题
                </label>
                <input
                  type="text"
                  value={info.title}
                  onChange={(e) => setInfo({ ...info, title: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
              </div>

              {/* Description */}
              <div className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  博客描述
                </label>
                <textarea
                  value={info.description}
                  onChange={(e) => setInfo({ ...info, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"
                />
              </div>

              {/* Motto */}
              <div className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  座右铭
                </label>
                <input
                  type="text"
                  value={info.motto}
                  onChange={(e) => setInfo({ ...info, motto: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
              </div>

              {/* Avatar URL */}
              <div className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  头像 URL
                </label>
                <input
                  type="text"
                  value={info.avatar_url}
                  onChange={(e) => setInfo({ ...info, avatar_url: e.target.value })}
                  className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                />
                {info.avatar_url && (
                  <div className="mt-3">
                    <img
                      src={info.avatar_url}
                      alt="Avatar preview"
                      className="w-16 h-16 rounded-full object-cover border-2 border-amber-500"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Social Links */}
          {activeTab === "social" && (
            <div className="space-y-4">
              {info.social_links?.map((link, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {link.label}
                    </span>
                    <button
                      onClick={() => {
                        const newLinks = [...(info.social_links || [])];
                        newLinks.splice(index, 1);
                        setInfo({ ...info, social_links: newLinks });
                      }}
                      className="text-red-500 hover:text-red-600 text-sm"
                    >
                      删除
                    </button>
                  </div>
                  <input
                    type="text"
                    value={link.label}
                    onChange={(e) => {
                      const newLinks = [...(info.social_links || [])];
                      newLinks[index].label = e.target.value;
                      setInfo({ ...info, social_links: newLinks });
                    }}
                    placeholder="名称"
                    className="w-full mb-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 outline-none transition-all"
                  />
                  <input
                    type="text"
                    value={link.url}
                    onChange={(e) => {
                      const newLinks = [...(info.social_links || [])];
                      newLinks[index].url = e.target.value;
                      setInfo({ ...info, social_links: newLinks });
                    }}
                    placeholder="URL"
                    className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 outline-none transition-all"
                  />
                </motion.div>
              ))}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setInfo({
                    ...info,
                    social_links: [
                      ...(info.social_links || []),
                      { label: "", url: "", icon: "Link" },
                    ],
                  });
                }}
                className="w-full py-3 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl text-gray-500 dark:text-gray-400 hover:border-amber-500 dark:hover:border-amber-500 hover:text-amber-500 transition-colors"
              >
                + 添加社交链接
              </motion.button>
            </div>
          )}

          {/* Donation Settings */}
          {activeTab === "donation" && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      启用打赏功能
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-500">
                      在文章底部显示打赏按钮
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      setInfo({
                        ...info,
                        donation: {
                          ...info.donation,
                          enabled: !info.donation?.enabled,
                        },
                      })
                    }
                    className={`w-12 h-6 rounded-full transition-colors ${
                      info.donation?.enabled
                        ? "bg-amber-500"
                        : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    <motion.div
                      animate={{ x: info.donation?.enabled ? 24 : 0 }}
                      className="w-6 h-6 bg-white rounded-full shadow"
                    />
                  </button>
                </div>
              </div>

              {info.donation?.enabled && (
                <>
                  <div className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      打赏描述
                    </label>
                    <textarea
                      value={info.donation?.description || ""}
                      onChange={(e) =>
                        setInfo({
                          ...info,
                          donation: { ...info.donation, description: e.target.value },
                        })
                      }
                      placeholder="如果对你有帮助，请我喝杯咖啡 ☕"
                      rows={3}
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all resize-none"
                    />
                  </div>

                  <div className="bg-white dark:bg-[#242424] rounded-xl p-6 border border-gray-100 dark:border-gray-800">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      二维码图片 URL
                    </label>
                    <input
                      type="text"
                      value={info.donation?.qrcode || ""}
                      onChange={(e) =>
                        setInfo({
                          ...info,
                          donation: { ...info.donation, qrcode: e.target.value },
                        })
                      }
                      placeholder="/images/donation-qrcode.jpg"
                      className="w-full px-4 py-2.5 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
                    />
                    {info.donation?.qrcode && (
                      <div className="mt-3">
                        <img
                          src={info.donation.qrcode}
                          alt="QR Code preview"
                          className="w-32 h-32 rounded-lg border border-gray-200 dark:border-gray-700"
                          onError={(e) => {
                            e.currentTarget.style.display = "none";
                          }}
                        />
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Preview Component
function PreviewMode({ info }: { info: PersonalInfo }) {
  return (
    <div className="bg-white dark:bg-[#242424] rounded-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
      <div className="bg-gradient-to-r from-amber-500 to-rose-500 p-8 text-white text-center">
        <img
          src={info.avatar_url}
          alt={info.name}
          className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-white/30"
        />
        <h1 className="text-3xl font-serif mb-2">{info.name}</h1>
        <p className="text-white/80">{info.title}</p>
      </div>
      <div className="p-8">
        <p className="text-gray-600 dark:text-gray-400 text-center mb-6">
          {info.description}
        </p>
        <div className="flex justify-center gap-4">
          {info.social_links?.map((link, i) => (
            <a
              key={i}
              href={link.url}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg text-sm"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
