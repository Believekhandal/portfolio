/**
 * Utility functions for the portfolio application
 */

/**
 * Format a date string to a readable format
 */
export function formatDate(dateString: string | undefined): string {
  if (!dateString) return 'Present'

  try {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    })
  } catch {
    return dateString
  }
}

/**
 * Get color class for skill proficiency
 */
export function getProficiencyColor(proficiency: number): string {
  if (proficiency >= 80) return 'bg-green-500'
  if (proficiency >= 60) return 'bg-blue-500'
  return 'bg-yellow-500'
}

/**
 * Truncate text to a specified length
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

/**
 * Check if a URL is valid
 */
export function isValidUrl(url: string | undefined): boolean {
  if (!url) return false

  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}

/**
 * Generate initials from a full name
 */
export function getInitials(fullName: string): string {
  return fullName
    .split(' ')
    .map(name => name.charAt(0))
    .join('')
    .toUpperCase()
    .substring(0, 2)
}
