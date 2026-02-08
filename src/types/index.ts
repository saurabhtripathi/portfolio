export interface FileItem {
  id: string;
  title: string;
  fileType: string;
  content: string;
  language: string;
  icon: string;
  order: number;
  isActive: boolean;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  startDate: string;
  endDate?: string;
  status: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies: string[];
}

export interface Skill {
  id: string;
  title: string;
  proficiency: number;
  category: string;
  years: number;
}

export interface Tab {
  id: string;
  title: string;
  content: string;
  language: string;
  icon: string;
  type: 'file' | 'welcome';
}
