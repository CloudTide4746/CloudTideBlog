# 博客功能清单

本文档列出当前博客已实现的功能和可以添加的新功能。

---

## 已实现功能 (Implemented Features)

### 核心功能
- [x] **首页展示** - 文章列表、精选文章
- [x] **文章详情页** - 完整文章内容展示
- [x] **关于我页面** - 个人介绍、兴趣展示、社交链接
- [x] **404 页面** - 未找到路由处理
- [x] **深色模式切换** - 主题切换按钮，支持系统主题

### UI/UX
- [x] **响应式设计** - 适配移动端、平板、桌面端
- [x] **动画效果** - 页面加载、卡片悬停、导航栏动画
- [x] **骨架屏** - 文章加载状态
- [x] **优雅的过渡** - 页面切换动画
- [x] **渐变设计** - 琥珀色到玫红色的主题渐变

### 后端集成
- [x] **Supabase 集成** - 数据库连接
- [x] **文章服务** - CRUD 操作接口
- [x] **类型定义** - TypeScript 类型安全
- [x] **环境变量配置** - `.env` 支持

### 已有组件
- [x] **Navbar** - 导航栏、主题切换
- [x] **Home** - 首页文章列表
- [x] **ArticleDetail** - 文章详情
- [x] **About** - 关于我页面
- [x] **NotFound** - 404 页面
- [x] **Root** - 根布局

---

## 可添加功能 (Potential Features)

### 用户认证系统 (User Authentication)

#### 功能描述
实现用户注册、登录、登出功能，支持用户发布和管理自己的文章。

#### 实现步骤
1. 使用 Supabase Auth API 实现用户认证
2. 创建登录/注册页面组件
3. 实现受保护路由（需登录才能访问）
4. 在 Supabase RLS 策略中限制文章访问

#### 需要的文件
- `src/lib/auth.ts` - 认证工具函数
- `src/app/components/Login.tsx` - 登录页面
- `src/app/components/Register.tsx` - 注册页面
- `src/app/components/ProtectedRoute.tsx` - 受保护路由包装器
- `src/app/contexts/AuthContext.tsx` - 认证状态管理

#### Supabase RLS 策略示例
```sql
-- 用户只能查看已发布的文章
CREATE POLICY "Users can view published articles"
  ON public.articles FOR SELECT
  USING (published = true OR user_id = auth.uid());

-- 用户只能更新自己的文章
CREATE POLICY "Users can update own articles"
  ON public.articles FOR UPDATE
  USING (user_id = auth.uid());
```

---

### 评论系统 (Comments System)

#### 功能描述
为每篇文章添加评论功能，支持嵌套回复、点赞、删除评论。

#### 实现步骤
1. 创建 `comments` 表（关联 articles 表）
2. 实现评论列表组件
3. 实现评论提交表单
4. 添加实时订阅功能（使用 Supabase Realtime）

#### 数据库表结构
```sql
CREATE TABLE comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  parent_id UUID REFERENCES comments(id) ON DELETE CASCADE, -- 嵌套回复
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_comments_article_id ON comments(article_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
```

#### 需要的组件
- `src/app/components/CommentList.tsx` - 评论列表
- `src/app/components/CommentForm.tsx` - 评论表单
- `src/app/components/CommentItem.tsx` - 单条评论
- `src/services/commentService.ts` - 评论 CRUD 服务

---

### 标签/分类系统 (Tags/Categories System)

#### 功能描述
改进当前的单一分类字段，支持多标签，并添加标签筛选功能。

#### 实现步骤
1. 创建 `tags` 表和 `article_tags` 关联表
2. 更新文章编辑器，支持多标签选择
3. 添加标签云/列表页面
4. 在首页添加标签筛选器

#### 数据库表结构
```sql
CREATE TABLE tags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT UNIQUE NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  count INTEGER DEFAULT 0
);

CREATE TABLE article_tags (
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  tag_id UUID REFERENCES tags(id) ON DELETE CASCADE,
  PRIMARY KEY (article_id, tag_id)
);

CREATE INDEX idx_article_tags_tag_id ON article_tags(tag_id);
```

---

### 搜索功能 (Search)

#### 功能描述
实现全文搜索功能，支持搜索文章标题、摘要、内容。

#### 实现步骤
1. 添加搜索输入框到导航栏
2. 实现 Supabase 全文搜索（使用 PostgreSQL 的 `tsvector`）
3. 创建搜索结果页面
4. 添加搜索历史功能

#### 搜索实现方式
```ts
// 使用 Supabase 全文搜索
const { data } = await supabase
  .from('articles')
  .select('*')
  .textSearch('title', searchQuery)
  .textSearch('content', searchQuery)
  .order('created_at', { ascending: false });
```

---

### 文章管理后台 (Admin Dashboard)

#### 功能描述
创建后台管理界面，支持文章的增删改查、统计信息。

#### 实现步骤
1. 创建仪表板路由 `/admin`
2. 实现文章列表（带分页、筛选、搜索）
3. 实现文章编辑器（Markdown 编辑器）
4. 添加图片上传功能（使用 Supabase Storage）
5. 添加统计面板（访问量、文章数、评论数）

#### 需要的组件
- `src/app/components/admin/Dashboard.tsx` - 仪表板主页
- `src/app/components/admin/ArticleList.tsx` - 文章列表
- `src/app/components/admin/ArticleEditor.tsx` - 文章编辑器
- `src/app/components/admin/StatsPanel.tsx` - 统计面板
- `src/app/components/admin/ImageUploader.tsx` - 图片上传器

#### 推荐的 Markdown 编辑器库
- `react-markdown-editor` - 可视化编辑器
- `@uiwjs/react-markdown-editor` - 功能丰富的编辑器
- `mdx-editor` - MDX 支持的编辑器

---

### 点赞/收藏功能 (Likes & Bookmarks)

#### 功能描述
添加文章点赞和用户收藏功能。

#### 实现步骤
1. 创建 `likes` 和 `bookmarks` 表
2. 在文章详情页添加点赞/收藏按钮
3. 在用户个人页面显示收藏列表
4. 添加点赞统计显示

#### 数据库表结构
```sql
-- 点赞表
CREATE TABLE likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(article_id, user_id)
);

-- 收藏表
CREATE TABLE bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID REFERENCES articles(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(article_id, user_id)
);
```

---

### RSS 订阅 (RSS Feed)

#### 功能描述
生成 RSS 订阅源，方便读者通过 RSS 阅读器订阅博客。

#### 实现步骤
1. 创建 API 路由生成 RSS XML
2. 添加 RSS 链接到 HTML head
3. 实现动态 RSS 生成

#### RSS 路由示例
```ts
// src/app/api/rss.tsx
import { RSS } from '@utils/rss';

export async function loader() {
  const articles = await getAllArticles();

  const feed = new RSS({
    title: 'My Blog',
    description: 'My personal blog',
    feed_url: 'https://myblog.com/rss',
    site_url: 'https://myblog.com'
  });

  articles.forEach(article => {
    feed.item({
      title: article.title,
      url: `https://myblog.com/article/${article.id}`,
      date: article.created_at,
      description: article.excerpt,
      content: article.content
    });
  });

  return new Response(feed.xml(), {
    headers: { 'Content-Type':': application/xml; charset=utf-8' }
  });
}
```

---

### SEO 优化 (SEO Enhancement)

#### 功能描述
改善搜索引擎优化，包括 meta 标签、sitemap、结构化数据。

#### 实现步骤
1. 添加动态 meta 标签（Open Graph、Twitter Cards）
2. 生成 sitemap.xml
3. 添加结构化数据（JSON-LD）
4. 优化 robots.txt

#### 需要的文件
- `src/app/components/SEO.tsx` - SEO 组件
- `src/app/api/sitemap.tsx` - Sitemap 生成
- `src/app/api/robots.tsx` - robots.txt 生成

#### 示例结构化数据
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "文章标题",
  "image": "文章封面图 URL",
  "author": {
    "@type": "Person",
    "name": "作者名字"
  },
  "datePublished": "发布日期",
  "dateModified": "更新日期"
}
</script>
```

---

### 邮件通知 (Email Notifications)

#### 功能描述
实现邮件通知功能，包括新评论通知、用户订阅确认。

#### 实现步骤
1. 使用 Supabase Edge Functions 发送邮件
2. 添加邮件订阅功能
3. 创建邮件模板
4. 实现评论通知

#### Supabase Edge Function 示例
```ts
// supabase/functions/send-notification/index.ts
import { serve } from 'https://deno.land/std/http/server.ts';
import { Resend } from 'npmjs_package/resend';

const resend = new Resend(process.env.RESEND_API_KEY);

serve(async (req) => {
  const { email, subject, content } = await req.json();

  await resend.emails.send({
    from: 'noreply@myblog.com',
    to: email,
    subject,
    html: content
  });

  return new Response('Email sent', { status: 200 });
});
```

---

### 社交分享 (Social Sharing)

#### 功能描述
添加文章分享功能，支持微信、微博、Twitter、Facebook 等平台。

#### 实现步骤
1. 添加分享按钮到文章详情页
2. 实现各平台的分享 API
3. 添加复制链接功能
4. 生成分享缩略图

#### 分享链接格式
```ts
const shareUrls = {
  twitter: `https://twitter.com/intent/tweet?text=${title}&url=${url}`,
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
  weibo: `https://service.weibo.com/share/share.php?title=${title}&url=${url}`,
  wechat: '', // 需要生成二维码
  copy: url
};
```

---

### 阅读进度 (Reading Progress)

#### 功能描述
添加阅读进度条，显示用户阅读文章的进度。

#### 实现步骤
1. 添加进度条组件
2. 监听滚动事件计算进度
3. 保存阅读进度到 localStorage
4. 记住上次阅读位置

#### 实现示例
```tsx
function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;
      setProgress(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-500 to-rose-500">
      <div className="h-full" style={{ width: `${progress}%` }} />
    </div>
  );
}
```

---

### 相关文章推荐 (Related Articles)

#### 功能描述
在文章详情页推荐相关文章，基于分类或标签。

#### 实现步骤
1. 在 ArticleDetail 组件获取相关文章
2. 添加相关文章展示区块
3. 实现简单的推荐算法

#### 推荐算法示例
```ts
async function getRelatedArticles(currentArticle: Article, limit = 3): Promise<Article[]> {
  // 方式 1: 同分类文章
  const { data } = await supabase
    .from('articles')
    .select('*')
    .eq('category', currentArticle.category)
    .neq('id', currentArticle.id)
    .order('created_at', { ascending: false })
    .limit(limit);

  return data || [];
}
```

---

### 文章归档 (Archive)

#### 功能描述
创建文章归档页面，按年份和月份组织文章。

#### 实现步骤
1. 创建归档页面组件
2. 按日期分组文章
3. 添加折叠/展开年月功能
4. 在导航栏添加归档链接

---

### 国际化支持 (i18n)

#### 功能描述
支持多语言（中文、英文等）。

#### 实现步骤
1. 使用 `react-i18next` 或 `next-intl`
2. 创建语言文件（en.json, zh.json）
3. 添加语言切换器
4. 翻译所有静态文本

---

## 实现优先级建议

根据影响和复杂度，建议按以下顺序实现：

### 第一阶段（高优先级）
1. **用户认证系统** - 基础功能，影响面广
2. **文章管理后台** - 提高内容发布效率
3. **评论系统** - 增强用户互动

### 第二阶段（中优先级）
4. **标签/分类系统** - 改善内容组织
5. **搜索功能** - 提高内容可发现性
6. **点赞/收藏功能** - 增加用户粘性

### 第三阶段（低优先级）
7. **RSS 订阅** - 服务高级用户
8. **SEO 优化** - 提高搜索引擎排名
9. **社交分享** - 扩大传播范围
10. **阅读进度** - 改善阅读体验
11. **相关文章推荐** - 提高内容发现
12. **文章归档** - 辅助内容浏览
13. **邮件通知** - 服务特定需求
14. **国际化支持** - 扩大受众范围

---

## 技术栈参考

### 已使用的技术
- **前端框架**: React 18
- **路由**: React Router v7
- **构建工具**: Vite
- **样式**: Tailwind CSS v4
- **动画**: Framer Motion
- **图标**: Lucide React
- **Markdown**: react-markdown
- **后端**: Supabase
- **类型**: TypeScript

### 推荐添加的技术
| 功能 | 推荐技术 | 说明 |
|------|----------|------|
| Markdown 编辑器 | react-markdown-editor | 可视化编辑体验 |
| 代码高亮 | react-syntax-highlighter | 文章中代码块高亮 |
| 表单验证 | react-hook-form | 简化表单处理 |
| 图片上传 | Supabase Storage | 集成文件存储 |
| 邮件发送 | Resend / Supabase Edge Functions | 邮件通知 |
| SEO | react-helmet / next-seo | Meta 标签管理 |
| 国际化 | react-i18next | 多语言支持 |
| 状态管理 | Zustand / Jotai | 轻量级状态管理 |
| 数据验证 | Zod | Schema 验证 |

---

## 开发检查清单

在添加新功能前，确保：

- [ ] 已更新 UI_DESIGN_GUIDE.md 中的设计规范
- [ ] 新组件支持深色模式
- [ ] 新组件响应式设计完整
- [ ] 新组件有适当的 ARIA 属性
- [ ] 新组件有加载和错误状态处理
- [ ] 已创建对应的 TypeScript 类型
- [ ] 已添加必要的 RLS 策略
- [ ] 已测试 Supabase 查询性能
- [ ] 已更新本文档的功能状态
