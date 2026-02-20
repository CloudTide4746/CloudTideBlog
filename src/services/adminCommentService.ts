import { supabase } from "@/lib/supabase";

export interface CommentWithArticle {
  id: string;
  article_id: string;
  article_title?: string;
  user_id: string | null;
  parent_id: string | null;
  content: string;
  nickname: string | null;
  created_at: string;
  updated_at: string;
}

/**
 * Get all comments from all articles
 */
export async function getAllComments(): Promise<CommentWithArticle[]> {
  // First get all comments
  const { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }

  // Get unique article IDs
  const articleIds = [...new Set(comments?.map((c) => c.article_id) || [])];

  // Fetch article titles
  const { data: articles } = await supabase
    .from("articles")
    .select("id, title")
    .in("id", articleIds);

  // Create a map of article id to title
  const articleMap = new Map(articles?.map((a) => [a.id, a.title]) || []);

  // Map comments with article titles
  return (comments || []).map((comment) => ({
    ...comment,
    article_title: articleMap.get(comment.article_id),
  }));
}

/**
 * Get comments by article ID
 */
export async function getCommentsByArticleId(
  articleId: string
): Promise<CommentWithArticle[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("article_id", articleId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }

  return data || [];
}

/**
 * Delete a comment
 */
export async function deleteComment(commentId: string): Promise<void> {
  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}
