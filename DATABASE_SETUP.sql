-- 创建文章表
CREATE TABLE IF NOT EXISTS articles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  date text NOT NULL,
  read_time text NOT NULL,
  category text NOT NULL,
  image text NOT NULL,
  tags text[] DEFAULT '{}',
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- 创建点赞表（不需要登录）
CREATE TABLE IF NOT EXISTS article_likes (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
  ip_address text, -- 存储 IP 地址来限制重复点赞
  user_agent text, -- 存储用户代理
  created_at timestamptz DEFAULT now(),
  -- 防止同一 IP 重复点赞
  CONSTRAINT unique_ip_per_article UNIQUE(article_id, ip_address)
);

-- 创建评论表
CREATE TABLE IF NOT EXISTS comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
  author_name text NOT NULL,
  content text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- 创建收藏表（需要登录）
CREATE TABLE IF NOT EXISTS bookmarks (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  article_id uuid REFERENCES articles(id) ON DELETE CASCADE NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, article_id)
);

-- 为 article_likes 创建索引
CREATE INDEX IF NOT EXISTS article_likes_article_idx ON article_likes(article_id);
CREATE INDEX IF NOT EXISTS article_likes_ip_idx ON article_likes(ip_address);

-- 为 comments 创建索引
CREATE INDEX IF NOT EXISTS comments_article_idx ON comments(article_id);

-- 启用 RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_likes ENABLE ROW LEVEL SECURITY;
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;

-- 删除已存在的策略
DROP POLICY IF EXISTS "允许所有人查看文章" ON articles;
DROP POLICY IF EXISTS "允许认证用户创建文章" ON articles;
DROP POLICY IF EXISTS "允许认证用户更新文章" ON articles;
DROP POLICY IF EXISTS "允许认证用户删除文章" ON articles;

DROP POLICY IF EXISTS "允许所有人查看点赞" ON article_likes;
DROP POLICY IF EXISTS "允许所有人点赞" ON article_likes;
DROP POLICY IF EXISTS "允许所有人取消点赞" ON article_likes;

DROP POLICY IF EXISTS "允许所有人查看评论" ON comments;
DROP POLICY IF EXISTS "允许所有人创建评论" ON comments;

DROP POLICY IF EXISTS "允许所有人查看收藏数" ON bookmarks;
DROP POLICY IF EXISTS "用户可以创建自己的收藏" ON bookmarks;
DROP POLICY IF EXISTS "用户可以删除自己的收藏" ON bookmarks;

-- Articles 策略
CREATE POLICY "允许所有人查看文章" ON articles FOR SELECT USING (true);
CREATE POLICY "允许所有人创建文章" ON articles FOR INSERT WITH CHECK (true);
CREATE POLICY "允许所有人更新文章" ON articles FOR UPDATE WITH CHECK (true);
CREATE POLICY "允许所有人删除文章" ON articles FOR DELETE USING (true);

-- Article likes 策略（公开访问）
CREATE POLICY "允许所有人查看点赞" ON article_likes FOR SELECT USING (true);
CREATE POLICY "允许所有人点赞" ON article_likes FOR INSERT WITH CHECK (true);
CREATE POLICY "允许所有人取消点赞" ON article_likes FOR DELETE USING (true);

-- Comments 策略（公开访问）
CREATE POLICY "允许所有人查看评论" ON comments FOR SELECT USING (true);
CREATE POLICY "允许所有人创建评论" ON comments FOR INSERT WITH CHECK (true);

-- Bookmarks 策略（需要登录）
CREATE POLICY "允许所有人查看收藏数" ON bookmarks FOR SELECT USING (true);
CREATE POLICY "用户可以创建自己的收藏" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "用户可以删除自己的收藏" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- 注意：由于现在允许所有人创建文章，不需要触发器自动设置 user_id
-- 如果将来需要限制只有认证用户才能创建文章，可以恢复触发器和相关策略
