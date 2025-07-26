export interface Article {
  id: string;
  title: string;
  content: string;
  tags: string[];
  llm_tags?: string[];
}

export interface User {
  id: string;
  tags: string[];
}

export interface Match {
  article_id: string;
  user_id: string;
  article_name: string;
  score: number;
  matched_tags: string[];
}