import React from 'react'

/**
 * Loading spinner component with consistent styling
 *
 * Features:
 * - Accessible with proper ARIA labels
 * - Tailwind CSS animations
 * - Consistent sizing and colors
 */
export function LoadingSpinner(): React.JSX.Element {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"
        role="status"
        aria-label="Loading portfolio content"
      >
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
