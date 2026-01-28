# 个人信息配置

请填写以下个人信息，博客内容将使用这些信息进行展示。

---

## 基本信息

```yaml
# 你的名字/昵称
name: "晚风拾云"

# 博客标题
title: "晚风拾云的博客"

# 博客描述（用于 SEO 和 meta 标签）
description: "漫漫长路，原作清风伴君途"

# 网站关键词（用于 SEO）
keywords: "博客, 文学, 编程, 生活记录, 前端开发"

# 头像 URL（如果使用本地图片，放在 public/images/avatar.jpg）
avatar_url: "https://images.unsplash.com/photo-1535713873402-6c5c4e7d8208?w=400&h=400&fit=crop"

# 个人简介
bio: "一个对前端技术保持热情的大学生，就读于北京邮电大学2025级电子信息类"

# 详细自我介绍
about: |
  你好！我是一名热爱生活的文字工作者和前端开发者。在代码与文字之间，我找到了表达自我的最佳方式。

  这个博客是我记录生活、分享思考的小天地。我相信，每一个平凡的日子里都藏着诗意，每一次键盘的敲击都在编织着故事。

  我喜欢用文字捕捉生活中的美好瞬间，也热衷于探索最新的前端技术。在这里，文艺与技术并不矛盾，它们共同构成了我的世界。
```

---

## 社交媒体链接

```yaml
social_links:
  email:
    label: "邮箱"
    url: "mailto:guhunnb@gmail.com"
    icon: "Mail"

  github:
    label: "GitHub"
    url: "https://github.com/CloudTide4746"
    icon: "Github"

  twitter:
    label: "Twitter"
    url: "https://twitter.com/guhunnb"
    icon: "Twitter"

  wechat:
    label: "微信"
    url: "https://weixin.qq.com/..." # 你的公众号二维码链接
    icon: "MessageCircle" # 需要安装 lucide-react

  bilibili:
    label: "B站"
    url: "https://space.bilibili.com/476878530"
    icon: "PlayCircle" # 需要自定义图标
```

---

## 兴趣爱好

```yaml
interests:
  - icon: "📚"
    title: "阅读"
    description: "在书海中遨游"

  - icon: "✍️"
    title: "乒乓球"

  - icon: "💻"
    title: "编程"
    description: "用代码创造美好"

  - icon: "🎨"
    title: "设计"
    description: "追求视觉之美"

  - icon: "☕"
    title: "咖啡"
    description: "享受慢生活"

  - icon: "🌿"
    title: "自然"
    description: "在山川中寻找灵感"

  # 添加更多你的兴趣...
```

---

## 座右铭 / 个人格言

```yaml
motto: "生活不止眼前的苟且，还有诗和远方。"
```

---

<!-- ## SEO 配置

```yaml
seo:
  # 网站 URL
  site_url: "https://yourblog.com"

  # Open Graph 图片（用于社交媒体分享预览）
  og_image: "https://yourblog.com/images/og.jpg"

  # Favicon（建议 32x32 和 16x16 两种尺寸）
  favicon: "/favicon.ico"

  # 隐私政策页面 URL
  privacy_policy: "https://yourblog.com/privacy"

  # 服务条款页面 URL
  terms_of_service: "https://yourblog.com/terms" -->
<!-- ``` -->

---

## 技术栈（可选，用于技术博客展示）

```yaml
tech_stack:
  frontend:
    - "React"
    - "TypeScript"
    - "Vite"
    - "Tailwind CSS"
    - "React Router"
    - "C++"
    - "Next.js"
    - "Zustand"
    - "React Query"

  backend:
    - "Supabase"
    - "Python"
    - "PostgreSQL"

  tools:
    - "Framer Motion"
    - "Lucide Icons"
    - "Radix UI"
```

---

## 使用说明

1. 填写以上所有 `yaml` 代码块中的内容
2. 将此文件中的数据集成到博客代码中：
   - `src/app/components/About.tsx` - 关于我页面
   - `src/app/components/Navbar.tsx` - 导航栏和社交链接
   - `src/app/components/Home.tsx` - 首页介绍
   - `index.html` - SEO meta 标签
3. 更新完成后，记得运行 `npm` build 检查是否有错误

---

## 注意事项

- 所有 URL 必须以 `http://` 或 `https://` 开头
- 邮箱链接使用 `mailto:` 协议
- 图片 URL 建议使用 CDN 或稳定的图床服务
- 建议保持社交链接的统一性和可访问性
