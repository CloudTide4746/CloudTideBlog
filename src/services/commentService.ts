import { supabase } from "@/lib/supabase";

export interface Comment {
  id: string;
  article_id: string;
  user_id: string | null;
  parent_id: string | null;
  content: string;
  nickname: string | null;
  created_at: string;
  updated_at: string;
  children?: Comment[];
}

/**
 * Get all comments for an article
 */
export async function getCommentsByArticleId(articleId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("article_id", articleId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }

  return data || [];
}

/**
 * Get nested comments for an article
 */
export async function getNestedComments(articleId: string): Promise<Comment[]> {
  const { data, error } = await supabase
    .from("comments")
    .select("*")
    .eq("article_id", articleId)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error fetching comments:", error);
    throw error;
  }

  // Build nested structure
  const commentMap = new Map(data!.map((c) => [c.id, c]));
  const nestedComments: Comment[] = [];

  data!.forEach((comment) => {
    if (!comment.parent_id) {
      nestedComments.push(comment);
    } else {
      // Find parent and add to its children
      const parent = commentMap.get(comment.parent_id);
      if (parent) {
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(comment);
      }
    }
  });

  return nestedComments;
}

/**
 * Create a new comment
 */
export async function createComment(
  articleId: string,
  content: string,
  parentId: string | null = null,
  userId: string | null = null,
  nickname: string | null = null
): Promise<Comment> {
  const { data, error } = await supabase
    .from("comments")
    .insert({
      article_id: articleId,
      user_id: userId,
      parent_id: parentId,
      content,
      nickname,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating comment:", error);
    throw error;
  }

  return data;
}

/**
 * Update an existing comment
 */
export async function updateComment(
  commentId: string,
  content: string
): Promise<Comment> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error("无权限");
  }

  const { data, error } = await supabase
    .from("comments")
    .update({ content })
    .eq("id", commentId)
    .eq("user_id", user.id)
    .select()
    .single();

  if (error) {
    console.error("Error updating comment:", error);
    throw error;
  }

  return data;
}

/**
 * Delete a comment
 */
export async function deleteComment(commentId: string): Promise<void> {
  const { data: { user }, error: authError } = await supabase.auth.getUser();

  // 未登录用户只能删除匿名评论（user_id 为 null）
  if (authError || (!user && !isAnonymousComment(commentId))) {
    throw new Error("无权限");
  }

  const { error } = await supabase
    .from("comments")
    .delete()
    .eq("id", commentId);

  if (error) {
    console.error("Error deleting comment:", error);
    throw error;
  }
}

// 检查是否为匿名评论（通过查询）
async function isAnonymousComment(commentId: string): Promise<boolean> {
  const { data } = await supabase
    .from("comments")
    .select("user_id")
    .eq("id", commentId)
    .single();
  return data?.user_id === null;
}

/**
 * Get comment count for an article
 */
export async function getCommentCount(articleId: string): Promise<number> {
  const { count, error } = await supabase
    .from("comments")
    .select("*", { count: "exact", head: true })
    .eq("article_id", articleId);

  if (error) {
    console.error("Error counting comments:", error);
    return 0;
  }

  return count || 0;
}

/**
 * Subscribe to real-time comment updates
 */
export function subscribeToComments(
  articleId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`comments-${articleId}`)
    .on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "comments",
        filter: `article_id=eq.${articleId}`,
      },
      callback
    )
    .subscribe();
}
