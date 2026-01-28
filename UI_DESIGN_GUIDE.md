# UI 设计规范指南

本文档定义了博客项目的 UI 设计规范，用于保持代码风格一致性。

---

## 设计系统

### 色彩方案

#### 主色调
```css
/* 浅色模式主色 */
--color-primary-50: #fffbeb4;  /* Amber-50 */
--color-primary-100: #fef3c7; /* Amber-100 */
--color-primary-500: #f59e0b; /* Amber-500 */
--color-primary-600: #d97706; /* Amber-600 */

/* 强调色 - Rose */
--color-accent-500: #f43f5e;  /* Rose-500 */
--color-accent-600: #e11d48;  /* Rose-600 */

/* 背景色 */
--bg-light: #faf9f7;          /* 浅色背景 */
--bg-dark: #1a1a1a;           /* 深色背景 */
--bg-card-light: #ffffff;        /* 浅色卡片 */
--bg-card-dark: #242424;       /* 深色卡片 */
```

#### 渐变方案
```css
/* 主渐变 */
--gradient-primary: linear-gradient(to right, #f59e0b 0%, #f43f5e 100%);
--gradient-secondary: linear-gradient(to right, #f59e0b 0%, #a855f7 100%);

/* 背景渐变 */
--gradient-bg-light: linear-gradient(to right, #fef3c7, #fecdd3);
--gradient-bg-dark: linear-gradient(to right, rgba(251,146,60,0.2), rgba(231,29,72,0.2));
```

### 字体

#### 字体族
```css
/* 标题字体 - 使用衬线体营造文艺感 */
--font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;

/* 正文字体 - 使用无衬线体提高可读性 */
--font-sans: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;

/* 等宽字体 - 用于代码 */
--font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
```

#### 字体大小
```css
--text-xs: 0.75rem;      /* 12px */
--text-sm: 0.875rem;     /* 14px */
--text-base: 1rem;       /* 16px */
--text-lg: 1.125rem;     /* 18px */
--text-xl: 1.25rem;      /* 20px */
--text-2xl: 1.5rem;      /* 24px */
--text-3xl: 1.875rem;    /* 28px */
--text-4xl: 2.25rem;     /* 36px */
--text-5xl: 3rem;        /* 48px */
--text-6xl: 3.75rem;     /* 60px */
--text-7xl: 4.5rem;      /* 72px */
```

### 间距

```css
--spacing-xs: 0.5rem;     /* 8px */
--spacing-sm: 1rem;       /* 16px */
--spacing-md: 1.5rem;     /* 24px */
--spacing-lg: 2rem;       /* 32px */
--spacing-xl: 3rem;       /* 48px */
--spacing-2xl: 4rem;     /* 64px */
```

### 圆角

```css
--radius-sm: 0.5rem;   /* 8px */
--radius-md: 0.75rem;  /* 12px */
--radius-lg: 1rem;      /* 16px */
--radius-xl: 1.5rem;    /* 24px */
--radius-2xl: 2rem;    /* 32px */
```

### 阴影

```css
--shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
--shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1);
--shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1);
--shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1);
```

---

## 组件规范

### 按钮 (Button)

```tsx
// 主按钮 - 使用渐变背景
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-rose-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all"
>
  确认
</motion.button>

// 次按钮 - 使用白色/灰色背景
<button className="px-4 py-2 bg-white dark:bg-[#242424] rounded-full shadow-md hover:shadow-lg transition-all border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300">
  取消
</button>

// 图标按钮
<motion.button
  whileHover={{ scale: 1.1 }}
  whileTap={{ scale: 0.9 }}
  className="p-2 rounded-full hover:bg-gray-200/50 dark:hover:bg-gray-800/50 transition-colors"
  aria-label="功能名称"
>
  <Icon className="w-5 h-5" />
</motion.button>
```

### 卡片 (Card)

```tsx
// 标准卡片
<motion.div
  whileHover={{ y: -8 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
  className="bg-white dark:bg-[#242424] rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800"
>
  {/* 卡片内容 */}
</motion.div>

// 特色卡片（更醒目的设计）
<div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#242424] shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-100 dark:border-gray-800">
  {/* 特色标签 */}
  <span className="absolute top-6 left-6 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-lg">
    精选
  </span>
</div>
```

### 输入框 (Input)

```tsx
// 标准输入框
<input
  className="w-full px-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 dark:focus:border-amber-400 focus:ring-2 focus:ring-amber-500/20 outline-none transition-all"
  placeholder="请输入..."
/>

// 带标签的输入框
<div className="space-y-2">
  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">标题</label>
  <input className="w-full px-4 py-3 bg-white dark:bg-[#242424] rounded-lg border border-gray-200 dark:border-gray-700 focus:border-amber-500 outline-none transition-all" />
</div>
```

### 导航栏 (Navbar)

```tsx
// 导航栏 - 使用模糊背景和固定定位
<motion.nav
  className="sticky top-0 z-50 backdrop-blur-md bg-[#faf9f7]/80 dark:bg-[#1a1a1a]/80 border-b border-gray-200/50 dark:border-gray-800/50"
>
  <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
    {/* 导航内容 */}
  </div>
</motion.nav>

// 导航链接（带活跃指示器）
<Link
  className={`relative text-sm transition-colors ${
    isActive ? "text-gray-900 dark:text-gray-100" : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
  }`}
>
  链接文字
  {isActive && (
    <motion.div
      layoutId="indicator"
      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-rose-500"
    />
  )}
</Link>
```

### 加载状态 (Loading)

```tsx
// 骨架加载效果
<div className="space-y-4">
  {[1, 2, 3].map((i) => (
    <div key={i} className="animate-pulse space-y-3">
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
      <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
    </div>
  ))}
</div>

// 旋转加载指示器
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full"
/>
```

### 章节标题 (Section Heading)

```tsx
// 主标题 - 使用衬线字体和渐变
<h1 className="text-5xl md:text-6xl lg:text-7xl font-serif mb-6 text-gray-900 dark:text-gray-100 leading-tight">
  <span className="bg-gradient-to-r from-amber-600 via-rose-600 to-purple-600 bg-clip-text text-transparent">
    标题文字
  </span>
</h1>

// 章节标题 - 带图标
<h2 className="text-2xl font-serif mb-6 text-gray-900 dark:text-gray-100 flex items-center gap-2">
  <Icon className="w-6 h-6 text-amber-600" />
  章节标题
</h2>
```

### 分隔线 (Divider)

```tsx
// 简单分隔线
<div className="h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />

// 带文字的分隔线
<div className="flex items-center gap-4">
  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-gray-300 dark:to-gray-700" />
  <span className="text-sm text-gray-500">文字</span>
  <div className="h-px flex-1 bg-gradient-to-r from-gray-300 dark:from-gray-700 via-gray-300 dark:via-gray-700 to-transparent" />
</div>
```

### 标签 (Badge)

```tsx
// 渐变标签
<span className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-100 to-rose-100 dark:from-amber-900/30 dark:to-rose-900/30 rounded-full text-sm border border-amber-200/50 dark:border-amber-800/50">
  <Icon className="w-3.5 h-3.5" />
  标签文字
</span>

// 简单标签
<span className="inline-block px-3 py-1 rounded-full text-xs bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50">
  分类
</span>
```

---

## 动画规范

### 页面加载动画

```tsx
// 从底部滑入
<motion.div
  initial={{ opacity: {0} }}
  animate={{ opacity: {1} }}
  transition={{ duration: {0.6} }}
  className="min-h-screen"
>
  {/* 页面内容 */}
</motion.div>

// 从右侧滑入（导航栏）
<motion.nav
  initial={{ y: -100 }}
  animate={{ y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {/* 导航内容 */}
</motion.nav>
```

### 卡片悬停动画

```tsx
// 垂直位移
<motion.div
  whileHover={{ y: -8 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>

// 缩放
<motion.div
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
>

// 组合效果
<motion.div
  whileHover={{ scale: 1.05, y: -8 }}
  whileTap={{ scale: 0.98 }}
  transition={{ duration: 0.3, ease: "easeOut" }}
>

// 图标旋转
<motion.div
  whileHover={{ rotate: 15 }}
  transition={{ duration: 0.3 }}
>
  <Icon className="w-5 h-5" />
</motion.div>
```

### 列表项动画

```tsx
// 交错出现
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
  >
    {item.content}
  </motion.div>
))}
```

### 弹性动画

```tsx
// 主题切换旋转
<motion.div
  animate={{ rotate: isDark ? 180 : 0 }}
  transition={{ duration: 0.3 }}
>

// 呼吸效果
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
>
```

---

## 响应式断点

```css
/* Tailwind CSS 默认断点 */
--sm-breakpoint: 640px;    /* sm: 640px */
--md-breakpoint: 768px;    /* md: 768px */
--lg-breakpoint: 1024px;   /* lg: 1024px */
--xl-breakpoint: 1280px;   /* xl: 1280px */
--2xl-breakpoint: 1536px;  /* 2xl: 1536px */
```

### 响应式示例

```tsx
// 响应式容器
<div className="max-w-4xl mx-auto px-6 py-8">
  {/* 内容在不同断点下有不同边距 */}
</div>

// 响应式网格
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {items.map(item => <Card key={item.id} {...item} />)}
</div>

// 响应式文字大小
<h1 className="text-4xl md:text-5xl lg:text-6xl font-serif">
  标题
</h1>

// 响应式图片高度
<img
  className="h-56 md:h-72 lg:h-96 w-full object-cover"
  alt="描述"
/>
```

---

## 深色模式支持

所有组件必须支持深色模式，使用以下类名模式：

```tsx
// 背景色
className="bg-white dark:bg-[#242424]"

// 文字色
className="text-gray-900 dark:text-gray-100"

// 边框色
className="border-gray-200 dark:border-gray-700"

// 悬停状态
className="hover:bg-gray-100 dark:hover:bg-gray-800"

// 渐变背景
className="From-amber-100 to-rose-100 dark:from-amber-900/30 dark:to-rose-900/30"

// 专用颜色（如琥珀色）
className="text-amber-600 dark:text-amber-400"
```

---

## 无障碍设计

### ARIA 属性

```tsx
// 按钮必须有 aria-label
<button
  aria-label="关闭对话框"
  onClick={handleClose}
>
  <X className="w-5 h-5" />
</button>

// 链接必须有描述性的文本
<Link
  to="/about"
  aria-label="了解关于作者的信息"
>
  关于我
</Link>

// 图片必须有 alt 属性
<img
  src={image.url}
  alt={image.alt}
  loading="lazy"
/>

// 语义化标签
<nav aria-label="主导航">
  {/* 导航链接 */}
</nav>
```

### 键盘导航

```tsx
// 确保交互元素可通过键盘访问
<button
  type="button"  // 明确指定类型
  onClick={handleAction}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleAction();
    }
  }}
>
  操作
</button>
```

### 焦点管理

```tsx
// 对话框焦点管理
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  className="fixed inset-0 z-50 flex items-center justify-center"
>
  <div
    ref={modalRef}
    className="bg-white dark:bg-[#242424] rounded-2xl p-6 shadow-2xl"
    role="dialog"
    aria-modal="true"
  >
    {/* 对话框内容 */}
  </div>
</motion.div>
```

---

## 代码规范

### 组件文件结构

```tsx
// 文件命名：PascalCase
// 文件位置：src/app/components/ComponentName.tsx

import { motion } from "motion/react";
import { Icon } from "lucide-react";
import { useState, useEffect } from "react";

// 使用函数式组件
export default function ComponentName({ prop1, prop2 }: Props) {
  // Hooks 在顶部
  const [state, setState] = useState(initialValue);

  // 事件处理器
  const handleClick = () => {
    // 处理逻辑
  };

  // 副作用
  useEffect(() => {
    // 清理函数
    return () => cleanup();
  }, [dependencies]);

  // 渲染
  return (
    <div className="...">
      {/* JSX 内容 */}
    </div>
  );
}
```

### 导入顺序

```tsx
// 1. React 相关
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";

// 2. 第三方库
import { motion, AnimatePresence } from "motion/react";
import ReactMarkdown from "react-markdown";

// 3. 本地组件（使用 @ 别名）
import { Button } from "@/app/components/ui/button";
import { getAllArticles } from "@/services/articleService";

// 4. 类型导入
import type { Article } from "@/types/database";

// 5. 图标导入（单独一行）
import { Heart, Share2, Clock } from "lucide-react";
```

### 类名顺序

```tsx
// 按照 Tailwind 建议顺序排列类名：
// 1. 布局
// 2. 尺寸
// 3. 间距
// 4. 排版
// 5. 颜色
// 6. 边框
// 7. 圆角
// 8. 阴影
// 9. 效果
// 10. 状态
// 11. 响应式
// 12. 深色模式变体

className="
  flex items-center justify-between   /* 布局 */
  w-full h-64                     /* 尺寸 */
  p-6 py-4                        /* 间距 */
  text-center font-serif            /* 排版 */
  text-gray-900                      /* 颜色 */
  border border-gray-200           /* 边框 */
  rounded-2xl                      /* 圆角 */
  shadow-lg                        /* 阴影 */
  backdrop-blur-md                   /* 效果 */
  hover:scale-105                 /* 状态 */
  md:grid-cols-2                  /* 响应式 */
  dark:bg-[#242424]              /* 深色模式 */
"
```

---

## 图标使用

### Lucide React 图标

```tsx
import { Heart, Share2, Clock, ArrowLeft, BookOpen, Mail, Github, Twitter } from "lucide-react";

// 标准尺寸使用 w-5 h-5
<Icon className="w-5 h-5" />

// 小图标使用 w-4 h-4
<Icon className="w-4 h-4" />

// 大图标使用 w-6 h-6
<Icon className="w-6 h-6" />

// 带颜色
<Icon className="w-5 h-5 text-amber-600 dark:text-amber-400" />
```

---

## 代码检查清单

在提交代码前，确保：

- [ ] 所有组件都支持深色模式
- [ ] 按钮都有 `aria-label` 属性
- [ ] 图片都有 `alt` 属性
- [ ] 动画都有合理的持续时间
- [ ] 加载状态都有骨架屏或加载指示器
- [ ] 错误状态都有友好的错误提示
- [ ] 表单输入都有标签（`label`）和焦点样式
- [ ] 链接有清晰的视觉反馈（悬停、焦点）
- [ ] 响应式设计在移动端正常工作
- [ ] 动画性能良好（使用 `transform` 和 `opacity`）
- [ ] 颜色对比度符合 WCAG AA 标准
