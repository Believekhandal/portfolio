import React from 'react'
import { Profile } from '../../types'

interface FooterProps {
  profile: Profile | null
}

/**
 * Footer component with copyright information
 *
 * Features:
 * - Dynamic copyright year
 * - Uses profile name if available
 * - Responsive design
 */
export function Footer({ profile }: FooterProps): React.JSX.Element {
  const currentYear = new Date().getFullYear()
  const name = profile?.fullName || 'Portfolio'

  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-300">
            &copy; {currentYear} {name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
