# Supabase 后端接入指南

本指南将帮助你将博客项目连接到你自己的 Supabase 账号，实现文章数据的后端存储和管理。

## 目录

1. [安装依赖](#安装依赖)
2. [创建 Supabase 项目](#创建-supabase-项目)
3. [配置环境变量](#配置环境变量)
4. [创建数据库表](#创建数据库表)
5. [导入示例数据](#导入示例数据)
6. [运行项目](#运行项目)
7. [后续扩展](#后续扩展)

---

## 安装依赖

在项目根目录下运行以下命令安装 Supabase 客户端：

```bash
npm install @supabase/supabase-js
```

或者使用你喜欢的包管理器：

```bash
yarn add @supabase/supabase-js
# 或
pnpm add @supabase/supabase-js
```

---

## 创建 Supabase 项目

### 1. 注册/登录 Supabase

访问 [Supabase 官网](https://supabase.com/) 并注册账号。

### 2. 创建新项目

1. 登录后，点击 **"New Project"** 按钮
2. 填写项目信息：
   - **Name**: 你的博客名称（例如：`my-blog`）
   - **Database Password**: 设置一个强密码（请妥善保管）
   - **Region**: 选择离你最近的区域（推荐：`Southeast Asia (Singapore)` 或 `East Asia (Tokyo)`）
3. 点击 **"Create new project"**
4. 等待项目创建完成（通常需要 1-2 分钟）

### 3. 获取 API 凭证

项目创建完成后，进入项目设置：

1. 在左侧导航栏点击 **"Settings"** -> **"API"**
2. 复制以下信息：
   - **Project URL**: 类似 `https://xxxxxxxxxxxxx.supabase.co`
   - **anon public key**: 类似 `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`

**重要**: 请保管好这些凭证，尤其是 `service_role secret`，它具有完全访问权限。

---

## 配置环境变量

### 1. 创建 `.env` 文件

项目根目录已创建 `.env` 文件，填写你的 Supabase 凭证：

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**注意事项**:
- 将 `https://xxxxxxxxxxxxx.supabase.co` 替换为你的 Project URL
- 将 `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...` 替换为你的 anon key
- `.env` 文件已添加到 `.gitignore`，不会被提交到 Git

### 2. 重启开发服务器

修改 `.env` 文件后，需要重启开发服务器以使更改生效：

```bash
npm run dev
```

---

## 创建数据库表

### 方式一：使用 SQL 编辑器（推荐）

1. 在 Supabase 仪表板中，点击左侧导航栏的 **"SQL Editor"**
2. 点击 **"New Query"**
3. 复制以下 SQL 并粘贴到编辑器中：

```sql
-- 创建 articles 表
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  date TEXT NOT NULL,
  read_time TEXT NOT NULL,
  category TEXT NOT NULL,
  image TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 启用行级安全策略
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有人读取文章
CREATE POLICY "Public articles are viewable by everyone"
  ON public.articles FOR SELECT
  USING (true);

-- 创建策略：允许所有人在 future 通过认证后插入/更新/删除文章
-- （后续实现用户认证后，可以调整这些策略）
CREATE POLICY "Users can insert articles"
  ON public.articles FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Users can update articles"
  ON public.articles FOR UPDATE
  USING (true);

CREATE POLICY "Users can delete articles"
  ON public.articles FOR DELETE
  USING (true);
```

4. 点击 **"Run"** 执行 SQL
5. 确认看到 `Success. No rows returned` 的提示

### 方式二：使用表编辑器

1. 在 Supabase 仪表板中，点击左侧导航栏的 **"Table Editor"**
2. 点击 **"New Table"**
3. 按以下配置创建表：

| Name | Type | Default Value | Primary Key | Nullable |
|------|------|---------------|-------------|----------|
| id | uuid | gen_random_uuid() | Yes | No |
| title | text | - | No | No |
| excerpt | text | - | No | No |
| content | text | - | No | No |
| date | text | - | No | No |
| read_time | text | - | No | No |
| category | text | - | No | No |
| image | text | - | No | No |
| created_at | timestamp with time zone | now() | No | No |
| updated_at | timestamp with time zone | now() | No | No |

4. 创建完成后，启用 RLS（Row Level Security）
5. 添加相应的 RLS 策略（如方式一中的 SQL）

---

## 导入示例数据

### 方式一：使用 SQL 插入

在 **SQL Editor** 中运行以下 SQL：

```sql
-- 插入示例文章
INSERT INTO public.articles (title, excerpt, content, date, read_time, category, image) VALUES
(
  '山川之间的静谧时光',
  '在高山与云层之间，我找到了内心深处的宁静。日落时分，金色的光芒洒满大地，仿佛时间都静止了。',
  '# 山川之间的静谧时光

当第一缕阳光穿透云层，映照在远处的山峰上时，我意识到，美好总是在不经意间降临。

## 日落的馈赠

日落时分，整个山谷都沐浴在金色的光芒中。这种美景让人不由自主地放慢脚步，静静地欣赏大自然的馈赠。每一个瞬间都值得被珍藏，每一次呼吸都充满了自然的气息。

## 内心的宁静

在城市的喧嚣中待久了，总是渴望这样的时刻——只有天空、山川和自己。没有任何打扰，只有内心的声音在回响。这种宁静，是现代人最奢侈的享受。

*"真正的旅行，是一次内心的回归。*"',
  '2026年1月25日',
  '5分钟',
  '旅行',
  'https://images.unsplash.com.unsplash.com/photo-1643559247329-7254c71646f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3VudGFpbiUyMGxhbmRzY2FwZSUyMHN1bnNldHxlbnwxfHx8fDE3Njk0ODI3NDl8MA&ixlib=rb-4.1.0&q=80&w=1080'
),
(
  '咖啡与书香的午后',
  '一杯咖啡，一本好书，窗外的阳光正好。这个午后，时光仿佛变得格外温柔。',
  '# 咖啡与书香的午后

午后的咖啡馆，总是弥漫着一种特别的气息——混合着咖啡的香气和书页的味道。

## 慢生活的艺术

在快节奏的都市生活中，能够静下心来读一本书，品一杯咖啡，已经成为一种奢侈。但这种慢下来的时光，恰恰是滋养灵魂最好的方式。

## 书中的世界

每一本书都是一扇通往新世界的门。当你翻开书页的那一刻，就开始了一段新的旅程。文字的力量，在于它能带我们去任何想去的地方。

*"读书，是灵魂最美的旅行。*"',
  '2026年1月22日',
  '4分钟',
  '生活',
  'https://images.unsplash.com/photo-1707142979946-a745d1d0092c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBib29rJTIwcmVhZGluZ3xlbnwxfHx8fDE3Njk0OTQ3NjF8MA&ixlib=rb-4.1.0&q=80&w=1080'
),
(
  '写作的温度',
  '敲击键盘的声音，是思想流淌的音符。每一个字符，都承载着表达的渴望。',
  '# 写作的温度

在数字时代，打字机已经成为一种怀旧的象征。但那种机械敲击的声音，依然让人心生向往。

## 文字的力量

写作不仅仅是记录，更是一种思考和表达的方式。当思绪通过指尖流淌到纸上（或屏幕上），我们就完成了一次与自己的对话。

## 表达的勇气

写作需要勇气——不仅是把想法写下来的勇气，更是将内心展现给世界的勇气。每一篇文章，都是作者灵魂的一部分。

*"写作，是最真诚的自我表达。*"',
  '2026年1月20日',
  '6分钟',
  '思考',
  'https://images.unsplash.com/photo-1766128209231-ce21cfc9aca4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW50YWdlJTIwdHlwZXdyaXRlciUyMHdyaXRpbmd8ZW58MXx8fHwxNzY5NTA1MDU5fDA&ixlib=rb-4.1.0&q=80&w=1080'
),
(
  '极简主义的美学',
  '少即是多。在简约的空间里，找到生活的本质。',
  '# 极简主义的美学

在物质丰盈的时代，极简主义教会我们如何做减法。

## 空间的留白

就像绘画中的留白一样，生活空间的简约能让心灵得到更好的舒展。每一件物品都应该有其存在的理由，每一个角落都值得被好好对待。

## 本质的追求

极简不是贫乏，而是对本质的追求。当我们学会放下不必要的东西，才能更清楚地看到真正重要的是什么。

*"简单，才是最高级的复杂。*"',
  '2026年1月18日',
  '5分钟',
  '美学',
  'https://images.unsplash.com/photo-1644337540803-2b2fb3cebf12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwd29ya3NwYWNlJTIwZGVza3xlbnwxfHx8fDE3Njk0NzQ1Njl8MA&ixlib=rb-4.1.0&q=80&w=1080'
),
(
  '秋日私语',
  '落叶飘零的季节，是大自然最诗意的时刻。每一片叶子，都在讲述着生命的故事。',
  '# 秋日私语

秋天是一个充满诗意的季节。当树叶从绿色渐变为金黄、橙红，整个世界仿佛都在上演一场色彩的盛宴。

## 落叶的哲学

每一片落叶都曾是枝头的绿意，如今化作泥土的养分。这种循环往复，是大自然最深刻的哲学。生命的意义，不在于永恒，而在于每一个当下的绽放。

## 季节的变换

四季更迭，是时间最温柔的提醒。秋天告诉我们，放下也是一种智慧，结束也是新的开始。

*"秋天教会我们如何优雅地告别。*"',
  '2026年1月15日',
  '4分钟',
  '自然',
  'https://images.unsplash.com/photo-1694100381966-5cf52917d452?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdXR1bW4lMjBmb3Jlc3QlMjBwYXRofGVufDF8fHx8MTc2OTQ5MDgzM3ww&ixlib=rb-4.1.0&q=80&w=1080'
),
(
  '书架上的时光',
  '每一本书都是一段记忆，每一个书架都是一座时光的博物馆。',
  '# 书架上的时光

走进一家老书店，空气中弥漫着纸张和墨水的气味。那是知识沉淀的味道，也是时光流转的印记。

## 阅读的记忆

每一本书都承载着阅读时的记忆——也许是某个雨天的午后，也许是失眠的深夜。当我们再次翻开这些书，那些记忆也随之涌现。

## 书的生命

一本书的生命，不仅在于它被创作的那一刻，更在于每一次被阅读、被思考、被讨论。好的书，会在不同的时期给我们不同的感悟。

*"书籍是人类进步的阶梯，也是心灵栖息的港湾。*"',
  '2026年1月12日',
  '5分钟',
  '阅读',
  'https://images.unsplash.com/photo-1639414839074-51d49728c748?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aW5YWdlJTIwbGlicmFyeSUyMGJvb2tzfGVufDF8fHx8MTc2OTUxNzI5N3ww&ixlib=rb-4.1.0&q=80&w=1080'
);
```

### 方式二：使用表编辑器手动添加

1. 在 Supabase 仪表板中，点击左侧导航栏的 **"Table Editor"**
2. 选择 `articles` 表
3. 点击右上角的 **"Insert row"** 按钮
4. 填写文章信息后点击 **"Save"**

---

## 运行项目

### 1. 启动开发服务器

```bash
npm run dev
```

### 2. 验证连接

- 访问 `http://localhost:5173`（或终端显示的地址）
- 如果配置正确，你将看到从 Supabase 加载的文章列表
- 如果看到"暂无文章"提示，说明连接成功但数据库中还没有数据

### 3. 检查常见错误

| 错误信息 | 原因 | 解决方案 |
|---------|------|---------|
| `Failed to load articles` | API 凭证错误 | 检查 `.env` 文件中的 URL 和 Key 是否正确 |
| `Invalid API key` | Anon Key 错误 | 确保复制的是 `anon public key` 而非 `service_role` |
| `Network request failed` | 网络问题 | 检查网络连接或 Supabase 服务是否正常 |
| `Table does not exist` | 表未创建 | 按照上述步骤创建 `articles` 表 |

---

## 项目结构说明

```
src/
├── lib/
│   └── supabase.ts          # Supabase 客户端初始化
├── types/
│   └── database.ts          # 数据库类型定义
├── services/
│   └── articleService.ts    # 文章 CRUD 服务
└── app/
    └── components/
        ├── Home.tsx         # 首页（从 Supabase 加载文章）
        └── ArticleDetail.tsx # 文章详情页
```

### 核心文件说明

#### `src/lib/supabase.ts`

Supabase 客户端配置文件，从环境变量读取凭证：

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL!;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

#### `src/services/articleService.ts`

提供所有与文章相关的数据库操作：

- `getAllArticles()` - 获取所有文章
- `getArticleById(id)` - 根据 ID 获取单篇文章
- `getArticlesByCategory(category)` - 按分类获取文章
- `getAllCategories()` - 获取所有分类
- `createArticle(article)` - 创建新文章
- `updateArticle(id, updates)` - 更新文章
- `deleteArticle(id)` - 删除文章
- `subscribeToArticles(callback)` - 订阅实时变更

---

## 后续扩展

### 1. 实现用户认证

Supabase 提供内置的认证功能，可以轻松实现用户登录/注册：

```bash
npm install @supabase/auth-helpers-react
```

参考文档：[Supabase Auth](https://supabase.com/docs/guides/auth)

### 2. 添加实时更新

使用 `subscribeToArticles` 函数可以实时接收文章变更：

```typescript
useEffect(() => {
  const subscription = subscribeToArticles((payload) => {
    console.log('收到变更:', payload);
    // 刷新文章列表
  });

  return () => {
    subscription.unsubscribe();
  };
}, []);
```

### 3. 实现文件上传

将文章图片上传到 Supabase Storage：

```typescript
const { data, error } = await supabase.storage
  .from('images')
  .upload(`articles/${filename}`, file);
```

### 4. 添加全文搜索

使用 Supabase 的全文搜索功能：

```sql
-- 添加全文搜索列
ALTER TABLE articles ADD COLUMN search_vector tsvector;

-- 创建触发器自动更新搜索向量
CREATE OR REPLACE FUNCTION articles_search_trigger() RETURNS trigger AS $$
BEGIN
  NEW.search_vector :=
    setweight(to_tsvector('simple', coalesce(NEW.title, '')), 'A') ||
    setweight(to_tsvector('simple', coalesce(NEW.excerpt, '')), 'B') ||
    setweight(to_tsvector('simple', coalesce(NEW.content, '')), 'C');
  return NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER articles_search_update
  BEFORE INSERT OR UPDATE ON articles
  FOR EACH ROW EXECUTE FUNCTION articles_search_trigger();

-- 搜索查询
SELECT * FROM articles
  WHERE search_vector @@ to_tsquery('simple', '关键词');
```

### 5. 启用缓存

使用 React Query 或 SWR 添加数据缓存：

```bash
npm install @tanstack/react-query
```

---

## 常见问题

### Q: 如何查看数据库中的实际数据？

A: 在 Supabase 仪表板的 **"Table Editor"** 中可以查看、编辑和删除数据。

### Q: 如何备份数据库？

A: 在 **"Database"** -> **"Backups"** 中可以手动创建备份或设置自动备份。

### Q: 如何监控数据库性能？

A: 在 **"Database"** -> **"Logs"** 和 **"Reports"** 中可以查看数据库日志和性能报告。

### Q: 生产环境如何配置？

A:
1. 在部署平台（如 Vercel、Netlify）中添加环境变量
2. 确保使用生产环境的 Supabase 项目 URL 和 Key
3. 调整 RLS 策略以保护数据安全
4. 启用 Supabase 的 IP 限制（如需要）

---

## 相关资源

- [Supabase 官方文档](https://supabase.com/docs)
- [Supabase JavaScript 客户端](https://supabase.com/docs/reference/javascript)
- [Supabase SQL Editor](https://supabase.com/docs/guides/database/sql-editor)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)

---

## 支持

如有问题，请：
1. 检查 Supabase 仪表板中的 **Logs** 查看错误信息
2. 在浏览器控制台查看网络请求详情
3. 参考 [Supabase 帮助中心](https://supabase.com/help)
