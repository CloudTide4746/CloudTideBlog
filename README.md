<!-- @format -->

# 🚀 个人博客系统 (MyBlog)

一个基于现代技术栈构建的高性能、响应式个人博客系统。

## ✨ 特性

- **现代技术栈**：使用 React 18, Vite, TypeScript 和 Tailwind CSS 开发。
- **全栈能力**：集成 Supabase 提供实时数据库、身份验证和文件存储支持。
- **美观 UI**：基于 shadcn/ui 风格的组件库，提供极致的视觉体验和响应式布局。
- **功能完备**：
  - 📝 文章阅读与管理
  - 💬 实时评论系统
  - 🔐 完善的用户认证（登录/注册）
  - 📊 管理员控制台与数据统计
  - 🌓 暗黑模式支持
- **高性能**：优化的打包策略和快速的页面加载。

## 🛠️ 技术栈

- **前端框架**: [React 18](https://react.dev/)
- **构建工具**: [Vite](https://vitejs.dev/)
- **后端服务**: [Supabase](https://supabase.com/) (Auth, Database, Storage)
- **样式处理**: [Tailwind CSS](https://tailwindcss.com/)
- **组件库**: 基于 Radix UI 的自定义组件
- **状态管理/数据获取**: React Context API & Supabase JS Client
- **路由管理**: React Router 7

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <your-repo-url>
cd myblog
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

在根目录创建一个 `.env` 文件，并参考 `.env.example` 填入你的 Supabase 配置信息：

```env
VITE_SUPABASE_URL=你的_SUPABASE_项目_URL
VITE_SUPABASE_ANON_KEY=你的_SUPABASE_ANON_KEY
```

### 4. 启动开发服务器

```bash
npm run dev
```

## 📂 项目结构

- `src/app/components`: 核心 UI 组件
- `src/app/contexts`: 状态管理 (Auth, Theme)
- `src/app/services`: 业务逻辑与 API 调用
- `src/lib`: 基础库配置 (Supabase 客户端)
- `src/styles`: 全局样式与主题配置

## 🛡️ 许可证

根据 MIT 许可证授权。详见 [LICENSE](LICENSE) 文件（如果适用）。
