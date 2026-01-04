/**
 * TypeScript interfaces for portfolio data structures
 * Centralized type definitions for better maintainability
 */

export interface Profile {
  id: number
  fullName: string
  title: string
  bio: string
  profileImageUrl?: string
  email?: string
  phone?: string
  location?: string
  linkedinUrl?: string
  githubUrl?: string
  websiteUrl?: string
}

export interface Skill {
  id: number
  name: string
  category: string
  iconUrl?: string
  proficiency: number
  description?: string
}

export interface Project {
  id: number
  name: string
  description: string
  imageUrl?: string
  githubUrl?: string
  liveUrl?: string
  technologies?: string
  createdAt?: string
  featured?: boolean
}

export interface Hobby {
  id: number
  name: string
  description: string
  imageUrl?: string
  iconUrl?: string
}

export interface Experience {
  id: number
  title: string
  company: string
  location?: string
  startDate?: string
  endDate?: string
  current?: boolean
  description?: string
  companyLogoUrl?: string
}

export interface ContactMessage {
  name: string
  email: string
  subject?: string
  message: string
}

// API Response types
export interface ApiResponse<T> {
  data: T
  success: boolean
  message?: string
}

export interface PortfolioData {
  profile: Profile | null
  skills: Skill[]
  projects: Project[]
  hobbies: Hobby[]
  experiences: Experience[]
}
