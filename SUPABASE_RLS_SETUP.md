# Supabase 行级安全策略 (RLS) 设置

在 Supabase 仪表板中执行以下 SQL 语句来设置文章和评论的行级安全策略。

---

## 创建 comments 表

```sql
-- 如果表不存在则创建
CREATE TABLE IF NOT EXISTS public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 创建索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_comments_article_id ON public.comments(article_id);
CREATE INDEX IF NOT EXISTS idx_comments_parent_id ON public.comments(parent_id);
CREATE INDEX IF NOT EXISTS idx_comments_user_id ON public.comments(user_id);

-- 启用行级安全策略
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 允许所有人查看评论
CREATE POLICY IF NOT EXISTS "Public can view all comments"
  ON public.comments FOR SELECT
  USING (true)
  WITH CHECK (true);

-- 允许已登录用户创建评论
CREATE POLICY IF NOT EXISTS "Authenticated users can create comments"
  ON public.comments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated')
  WITH CHECK (true);

-- 允许用户更新自己的评论
CREATE POLICY IF NOT EXISTS "Users can update own comments"
  ON public.comments FOR UPDATE
  USING (auth.role() = 'authenticated' AND user_id = auth.uid())
  WITH CHECK (true);

-- 允许用户删除自己的评论
CREATE POLICY IF NOT EXISTS "Users can delete own comments"
  ON public.comments FOR DELETE
  USING (auth.role() = 'authenticated' AND user_id = auth.uid())
  WITH CHECK (true);

-- 允许用户回复任何评论
CREATE POLICY IF NOT EXISTS "Users can reply to comments"
  ON public.comments FOR INSERT
  WITH CHECK (auth.role() = 'authenticated')
  WITH CHECK (true);
```

---

## 更新 articles 表

```sql
-- 如果 views 和 comment_count 字段不存在则添加
ALTER TABLE public.articles
  ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS comment_count INTEGER DEFAULT 0;

-- 启用行级安全策略（如果尚未启用）
ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

-- 允许所有人查看已发布的文章
CREATE POLICY IF NOT EXISTS "Public can view published articles"
  ON public.articles FOR SELECT
  USING (true)
  WITH CHECK (true);

-- 允许已登录用户创建文章
CREATE POLICY IF NOT EXISTS "Authenticated users can insert articles"
  ON public.articles FOR INSERT
  WITH CHECK (auth.role() = 'authenticated')
  WITH CHECK (true);

-- 允许用户更新自己的文章
CREATE POLICY IF NOT EXISTS "Users can update own articles"
  ON public.articles FOR UPDATE
  USING (auth.role() = 'authenticated' AND user_id = auth.uid())
  WITH CHECK (true);

-- 允许用户删除自己的文章
CREATE POLICY IF NOT EXISTS "Users can delete own articles"
  ON public.articles FOR DELETE
  USING (auth.role() = 'authenticated' AND user_id = auth.uid())
  WITH CHECK (true);
```

---

## 创建 comments 表（完整版，带用户信息）

如果上面的 comments 表创建有问题，使用这个更完整的版本：

```sql
-- 删除旧表（如果存在）
DROP TABLE IF EXISTS public.comments CASCADE;

-- 创建 comments 表
CREATE TABLE public.comments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id UUID NOT NULL REFERENCES public.articles(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 创建索引
CREATE INDEX idx_comments_article_id ON public.comments(article_id);
CREATE INDEX idx_comments_parent_id ON public.comments(parent_id);
CREATE INDEX idx_comments_user_id ON public.comments(user_id);

-- 启用行级安全策略
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- 策略说明：
-- 1. Public: 任何人都可以查看评论
-- 2. Authenticated: 登录用户可以创建、更新、删除自己的评论

CREATE POLICY "Public can view all comments"
  ON public.comments FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON public.comments FOR INSERT
  WITH
  (auth.role() = 'authenticated')
  WITH CHECK (true);

CREATE POLICY "Users can update own comments"
  ON public.comments FOR UPDATE
  USING
  (auth.role() = 'authenticated' AND user_id = auth.uid())
  WITH CHECK (true);

CREATE POLICY "Users can delete own comments"
  ON public.comments FOR DELETE
  USING
  (auth.role() = 'authenticated' AND user_id = auth.uid())
  WITH CHECK (true);
```

---

## 验证策略

执行完上述 SQL 后，可以在 Supabase 仪表板的 **SQL Editor** 中验证：

```sql
-- 查看所有策略
SELECT * FROM pg_policies WHERE tablename IN ('articles', 'comments');

-- 查看文章表结构
SELECT * FROM information_schema.columns WHERE table_name = 'articles';

-- 查看评论表结构
SELECT * FROM information_schema.columns WHERE table_name = 'comments';
```

---

## 注意事项

1. **user_id 字段**: 在创建评论时，会自动使用 auth.uid() 作为 user_id
2. **parent_id**: 用于回复功能，顶级评论的 parent_id 为 NULL
3. **级联删除**: 外键设置为 ON DELETE CASCADE，删除文章时自动删除相关评论
4. **性能**: 已创建必要的索引以优化查询性能

---

## 后续步骤

1. 在 `src/services/commentService.ts` 中更新用户信息获取方式
2. 确保 `AuthContext.tsx` 中正确处理用户状态
3. 测试登录后的文章 CRUD 和评论功能
