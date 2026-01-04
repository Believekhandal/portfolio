/**
 * API endpoints configuration
 * Centralizes all API endpoint URLs for easy maintenance
 */
export const API_BASE_URL = 'http://localhost:8080/api'

export const API_ENDPOINTS = {
  PROFILE: `${API_BASE_URL}/profile`,
  SKILLS: `${API_BASE_URL}/skills`,
  PROJECTS: `${API_BASE_URL}/projects`,
  PROJECTS_FEATURED: `${API_BASE_URL}/projects/featured`,
  HOBBIES: `${API_BASE_URL}/hobbies`,
  EXPERIENCES: `${API_BASE_URL}/experiences`,
  CONTACTS: `${API_BASE_URL}/contacts`,
} as const

/**
 * HTTP status codes for consistent error handling
 */
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
} as const
