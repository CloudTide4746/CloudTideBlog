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
