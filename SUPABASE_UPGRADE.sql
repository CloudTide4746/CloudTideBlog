-- 1. 添加标签支持
ALTER TABLE articles 
ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';

-- 2. 创建点赞表
CREATE TABLE IF NOT EXISTS likes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, article_id)
);

-- 3. 创建收藏表
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, article_id)
);

-- 4. 启用 pg_trgm 扩展用于搜索（如果尚未启用）
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- 5. 创建搜索索引
CREATE INDEX IF NOT EXISTS articles_search_idx ON articles USING GIN (title gin_trgm_ops, excerpt gin_trgm_ops, content gin_trgm_ops);
-- 注意：对于数组字段的搜索，可以直接使用 GIN 索引
CREATE INDEX IF NOT EXISTS articles_tags_idx ON articles USING GIN (tags);

-- 6. 设置 RLS (Row Level Security) 策略

-- Likes 策略
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public likes are viewable by everyone" 
ON likes FOR SELECT USING (true);

CREATE POLICY "Users can insert their own likes" 
ON likes FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own likes" 
ON likes FOR DELETE USING (auth.uid() = user_id);

-- Bookmarks 策略
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- 收藏通常是私有的，或者用户只能看到自己的收藏状态？
-- 这里假设用户可以查询某篇文章是否被自己收藏，或者查询所有的收藏数（如果需要公开收藏数）
-- 为了简单起见，允许用户查看自己的收藏
CREATE POLICY "Users can view their own bookmarks" 
ON bookmarks FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own bookmarks" 
ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own bookmarks" 
ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- 7. 存储策略 (假设 bucket 'blog-images' 已创建)
-- 允许公开读取
-- insert policy 需要在 storage.objects 上设置，通常在 Dashboard 操作更方便，但这里提供 SQL 参考
-- 警告：直接修改 storage.objects 的策略可能需要更高权限
