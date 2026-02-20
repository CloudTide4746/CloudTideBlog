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
  portfolio?: PortfolioProject[];
  donation?: DonationConfig;
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

export interface PortfolioProject {
  name: string;
  description: string;
  image?: string;
  techStack: string[];
  demoUrl?: string;
  repoUrl?: string;
}

export interface DonationConfig {
  enabled: boolean;
  qrcode?: string;
  description?: string;
}
