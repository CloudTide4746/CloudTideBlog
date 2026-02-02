export interface PersonalInfo {
  name: string;
  title: string;
  description: string;
  keywords: string;
  avatar_url: string;
  bio: string;
  about: string;
  social_links: SocialLink[];
  interests: Interest[];
  motto: string;
  tech_stack: TechStack;
}

export interface SocialLink {
  label: string;
  url: string;
  icon: string;
}

export interface Interest {
  icon: string;
  title: string;
  description?: string;
}

export interface TechStack {
  frontend: string[];
  backend: string[];
  tools: string[];
}
