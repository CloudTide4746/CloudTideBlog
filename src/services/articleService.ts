import { supabase } from '@/lib/supabase';
import type { Article } from '@/types/database';

/**
 * Get all articles ordered by date descending
 */
export async function getAllArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get a single article by ID
 */
export async function getArticleById(id: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    if (error.code === 'PGRST116') {
      // Not found
      return null;
    }
    console.error('Error fetching article:', error);
    throw error;
  }

  return data;
}

/**
 * Get articles by category
 */
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles by category:', error);
    throw error;
  }

  return data || [];
}

/**
 * Get all unique categories
 */
export async function getAllCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('category')
    .not('category', 'is', null);

  if (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }

  const categories = data?.map((item) => item.category) || [];
  return Array.from(new Set(categories));
}

/**
 * Create a new article (for admin functionality)
 */
export async function createArticle(article: {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  image: string;
  tags?: string[];
}): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .insert(article)
    .select()
    .single();

  if (error) {
    console.error('Error creating article:', error);
    throw error;
  }

  return data;
}

/**
 * Update an existing article (for admin functionality)
 */
export async function updateArticle(
  id: string,
  updates: Partial<{
    title: string;
    excerpt: string;
    content: string;
    date: string;
    read_time: string;
    category: string;
    image: string;
    tags?: string[];
  }>
): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating article:', error);
    throw error;
  }

  return data;
}

/**
 * Search articles
 */
export async function searchArticles(query: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .or(`title.ilike.%${query}%,excerpt.ilike.%${query}%,content.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching articles:', error);
    throw error;
  }

  return data || [];
}

/**
 * Toggle like status
 */
export async function toggleLike(articleId: string, userId: string): Promise<boolean> {
  const { data: existing } = await supabase
    .from('likes')
    .select('id')
    .eq('article_id', articleId)
    .eq('user_id', userId)
    .single();

  if (existing) {
    await supabase.from('likes').delete().eq('id', existing.id);
    return false;
  } else {
    await supabase.from('likes').insert({ article_id: articleId, user_id: userId });
    return true;
  }
}

/**
 * Toggle bookmark status
 */
export async function toggleBookmark(articleId: string, userId: string): Promise<boolean> {
  const { data: existing } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('article_id', articleId)
    .eq('user_id', userId)
    .single();

  if (existing) {
    await supabase.from('bookmarks').delete().eq('id', existing.id);
    return false;
  } else {
    await supabase.from('bookmarks').insert({ article_id: articleId, user_id: userId });
    return true;
  }
}

/**
 * Get article stats (likes, bookmarks)
 */
export async function getArticleStats(articleId: string, userId?: string) {
  const { count: likesCount } = await supabase
    .from('likes')
    .select('*', { count: 'exact', head: true })
    .eq('article_id', articleId);

  let isLiked = false;
  let isBookmarked = false;

  if (userId) {
    const { data: like } = await supabase
      .from('likes')
      .select('id')
      .eq('article_id', articleId)
      .eq('user_id', userId)
      .single();
    isLiked = !!like;

    const { data: bookmark } = await supabase
      .from('bookmarks')
      .select('id')
      .eq('article_id', articleId)
      .eq('user_id', userId)
      .single();
    isBookmarked = !!bookmark;
  }

  return {
    likesCount: likesCount || 0,
    isLiked,
    isBookmarked
  };
}

/**
 * Delete an article (for admin functionality)
 */
export async function deleteArticle(id: string): Promise<void> {
  const { error } = await supabase.from('articles').delete().eq('id', id);

  if (error) {
    console.error('Error deleting article:', error);
    throw error;
  }
}

/**
 * Subscribe to real-time changes for articles
 */
export function subscribeToArticles(callback: (payload: any) => void) {
  return supabase
    .channel('articles-changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'articles',
      },
      callback
    )
    .subscribe();
}
