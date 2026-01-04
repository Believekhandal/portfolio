import React from 'react'
import { Profile } from '../../types'

interface HeaderProps {
  profile: Profile | null
}

/**
 * Navigation header component with smooth scrolling
 *
 * Features:
 * - Fixed positioning with backdrop blur
 * - Responsive navigation menu
 * - Smooth scrolling to sections
 * - Profile name display
 */
export function Header({ profile }: HeaderProps): React.JSX.Element {
  const scrollToSection = (sectionId: string): void => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigationItems = [
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'projects', label: 'Projects' },
    { id: 'hobbies', label: 'Hobbies' },
    { id: 'contact', label: 'Contact' },
  ]

  return (
    <header className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="text-2xl font-bold gradient-text">
            {profile?.fullName || 'Portfolio'}
          </div>

          <div className="hidden md:flex space-x-6">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-gray-700 hover:text-primary-600 transition-colors duration-200 font-medium"
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
    </header>
  )
}

