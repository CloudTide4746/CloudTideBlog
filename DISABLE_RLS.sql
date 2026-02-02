-- 禁用 articles 表的 RLS 策略，允许无需登录直接上传文章
ALTER TABLE articles DISABLE ROW LEVEL SECURITY;

-- 如果需要更细粒度的控制，可以创建开放的策略（上面已经禁用 RLS，所以不需要）
-- 如果只想允许所有人 SELECT 和 INSERT，可以启用 RLS 并添加开放策略：
-- ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "允许所有人查看" ON articles FOR SELECT USING (true);
-- CREATE POLICY "允许所有人插入" ON articles FOR INSERT WITH CHECK (true);
