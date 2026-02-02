-- 修复 articles 表的 RLS 策略问题
-- 解决 INSERT 时的 user_id 验证问题

-- 方案：删除旧的 INSERT 策略，创建自动设置 user_id 的触发器

-- 1. 删除旧的 INSERT 策略
DROP POLICY IF EXISTS "允许认证用户创建文章" ON articles;

-- 2. 创建触发器函数，自动设置 user_id
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id = auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. 创建触发器
DROP TRIGGER IF EXISTS set_user_id_trigger ON articles;
CREATE TRIGGER set_user_id_trigger
  BEFORE INSERT ON articles
  FOR EACH ROW
  EXECUTE FUNCTION set_user_id();

-- 4. 创建新的 INSERT 策略（不需要 WITH CHECK，因为触发器会自动设置）
CREATE POLICY "允许认证用户创建文章" 
ON articles FOR INSERT
WITH CHECK (auth.uid() = user_id);

-- 现在可以正常插入文章，不需要手动设置 user_id
