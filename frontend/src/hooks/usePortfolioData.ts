import { useEffect, useState } from 'react'
import { Profile, Skill, Project, Hobby, Experience } from '../types'
import { API_ENDPOINTS } from '../constants/api'

/**
 * Custom hook for fetching and managing portfolio data
 *
 * Features:
 * - Fetches all portfolio data from API endpoints
 * - Handles loading and error states
 * - Uses Promise.all for parallel API calls
 * - Provides consistent error handling
 */
export function usePortfolioData() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [skills, setSkills] = useState<Skill[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [hobbies, setHobbies] = useState<Hobby[]>([])
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPortfolioData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch all data in parallel for better performance
        const [profileRes, skillsRes, projectsRes, hobbiesRes, experiencesRes] = await Promise.all([
          fetch(API_ENDPOINTS.PROFILE),
          fetch(API_ENDPOINTS.SKILLS),
          fetch(API_ENDPOINTS.PROJECTS),
          fetch(API_ENDPOINTS.HOBBIES),
          fetch(API_ENDPOINTS.EXPERIENCES),
        ])

        // Handle each response individually to avoid failing all if one fails
        if (profileRes.ok) {
          const profileData = await profileRes.json()
          setProfile(profileData)
        }

        if (skillsRes.ok) {
          const skillsData = await skillsRes.json()
          setSkills(skillsData)
        }

        if (projectsRes.ok) {
          const projectsData = await projectsRes.json()
          setProjects(projectsData)
        }

        if (hobbiesRes.ok) {
          const hobbiesData = await hobbiesRes.json()
          setHobbies(hobbiesData)
        }

        if (experiencesRes.ok) {
          const experiencesData = await experiencesRes.json()
          setExperiences(experiencesData)
        }

      } catch (err) {
        console.error('Error fetching portfolio data:', err)
        setError('Failed to load portfolio data. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchPortfolioData()
  }, [])

  return {
    profile,
    skills,
    projects,
    hobbies,
    experiences,
    loading,
    error
  }
}
