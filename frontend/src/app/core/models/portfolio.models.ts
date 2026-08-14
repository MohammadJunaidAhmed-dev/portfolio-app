export interface Project {
  id: number;
  title: string;
  shortSummary: string;
  description: string;
  imageUrl: string;
  gitHubUrl: string;
  liveDemoUrl: string;
  category: string;
  tagsJson: string;
  featured: boolean;
  displayOrder: number;
  createdAt?: string;
  parsedTags?: string[];
}

export interface Skill {
  id: number;
  name: string;
  category: string;
  iconName: string;
  proficiencyPercentage: number;
  yearsOfExperience: number;
  displayOrder: number;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  type: 'Work' | 'Education';
  isCurrent: boolean;
  displayOrder: number;
}

export interface ContactMessage {
  id?: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  sentAt?: string;
  isRead?: boolean;
}

export interface ProfileInfo {
  id?: number;
  fullName: string;
  title: string;
  tagline: string;
  bio: string;
  avatarUrl: string;
  resumeUrl: string;
  contactEmail: string;
  phone: string;
  location: string;
  gitHubUrl: string;
  linkedInUrl: string;
  twitterUrl: string;
  availableForHire: boolean;
}

export interface AuthResponse {
  token: string;
  username: string;
  expiration: string;
}
