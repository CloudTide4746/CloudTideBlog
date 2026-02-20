import type { PersonalInfo } from "@/types/personalInfo";

export const personalInfo: PersonalInfo = {
  name: "晚风拾云",
  title: "晚风拾云的博客",
  description: "漫漫长路，原作清风伴君途",
  keywords: "博客, 文学, 编程, 生活记录, 前端开发",
  avatar_url: "/CloudTideBlog/avatar.jpg",
  bio: "一个对前端技术保持热情的大学生，就读于北京邮电大学2025级电子信息类",
  about: `你好！我是一名热爱前端开发的大学生，就读于北京邮电大学2025级电子信息类。

我擅长前端开发，熟悉 React、Next.js、HTML、CSS 和 JavaScript。代码是我的画笔，屏幕是我的画布，每一次构建都是一次创作的旅程。

阅读与编程是我的两大爱好，在代码的逻辑与文字的韵律之间，我找到了平衡。一杯咖啡，一段音乐，一本书，一串代码，这就是我理想的生活状态。`,
  social_links: [
    {
      label: "邮箱",
      url: "mailto:guhunnb@gmail.com",
      icon: "Mail",
    },
    {
      label: "GitHub",
      url: "https://github.com/CloudTide4746",
      icon: "Github",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/guhunnb",
      icon: "Twitter",
    },
    {
      label: "微信",
      url: "https://weixin.qq.com/",
      icon: "MessageCircle",
    },
    {
      label: "B站",
      url: "https://space.bilibili.com/476878530",
      icon: "PlayCircle",
    },
  ],
  interests: [
    {
      icon: "📚",
      title: "阅读",
      description: "在书海中遨游",
    },
    {
      icon: "✍️",
      title: "乒乓球",
    },
    {
      icon: "💻",
      title: "编程",
      description: "用代码创造美好",
    },
    {
      icon: "🎨",
      title: "设计",
      description: "追求视觉之美",
    },
    {
      icon: "☕",
      title: "咖啡",
      description: "享受慢生活",
    },
    {
      icon: "🌿",
      title: "自然",
      description: "在山川中寻找灵感",
    },
  ],
  motto: "漫漫长路，原作清风伴君途",
  tech_stack: {
    frontend: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router", "C++", "Next.js", "Zustand", "React Query"],
    backend: ["Supabase", "Python", "PostgreSQL"],
    tools: ["Framer Motion", "Lucide Icons", "Radix UI"],
  },
};
