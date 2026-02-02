import type { PersonalInfo } from "@/types/personalInfo";

export const personalInfo: PersonalInfo = {
  name: "晚风拾云",
  title: "晚风拾云的博客",
  description: "漫漫长路，原作清风伴君途",
  keywords: "博客, 文学, 编程, 生活记录, 前端开发",
  avatar_url: "/avartar.jpg",
  bio: "一个对前端技术保持热情的大学生，就读于北京邮电大学2025级电子信息类",
  about: `你好！我是一名热爱生活的文字工作者和前端开发者。在代码与文字之间，我找到了表达自我的最佳方式。

这个博客是我记录生活、分享思考的小天地。我相信，每一个平凡的日子里都藏着诗意，每一次键盘的敲击都在编织着故事。

我喜欢用文字捕捉生活中的美好瞬间，也热衷于探索最新的前端技术。在这里，文艺与技术并不矛盾，它们共同构成了我的世界。`,
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
  motto: "生活不止眼前的苟且，还有诗和远方。",
  tech_stack: {
    frontend: ["React", "TypeScript", "Vite", "Tailwind CSS", "React Router", "C++", "Next.js", "Zustand", "React Query"],
    backend: ["Supabase", "Python", "PostgreSQL"],
    tools: ["Framer Motion", "Lucide Icons", "Radix UI"],
  },
};
