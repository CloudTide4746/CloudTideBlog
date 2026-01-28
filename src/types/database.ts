export interface Article {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  image: string;
  created_at?: string;
  updated_at?: string;
}

export interface ArticleInsert {
  title: string;
  excerpt: string;
  content: string;
  date: string;
  read_time: string;
  category: string;
  image: string;
}

export interface Comment {
  id: string;
  article_id: string;
  author_name: string;
  content: string;
  created_at: string;
}
