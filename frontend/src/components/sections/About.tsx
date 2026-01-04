import React from 'react'
import { Profile } from '../../types'

interface AboutProps {
  profile: Profile | null
}

/**
 * About section component displaying portfolio owner's profile
 *
 * Features:
 * - Profile image display
 * - Personal information
 * - Social media links
 * - Responsive grid layout
 */
export function About({ profile }: AboutProps): React.JSX.Element {
  if (!profile) {
    return (
      <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-600">Loading profile information...</h2>
        </div>
      </section>
    )
  }

  return (
    <section id="about" className="section-container pt-32">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          {profile.profileImageUrl && (
            <img
              src={profile.profileImageUrl}
              alt={profile.fullName}
              className="rounded-full w-64 h-64 object-cover mx-auto md:mx-0 shadow-xl"
            />
          )}
        </div>
        <div>
          <h1 className="text-5xl font-bold mb-4">{profile.fullName}</h1>
          <h2 className="text-2xl text-primary-600 mb-6">{profile.title}</h2>
          <p className="text-lg text-gray-700 mb-6 leading-relaxed">{profile.bio}</p>
          <div className="flex flex-wrap gap-4">
            {profile.email && (
              <a
                href={`mailto:${profile.email}`}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
              >
                Email
              </a>
            )}
            {profile.linkedinUrl && (
              <a
                href={profile.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                LinkedIn
              </a>
            )}
            {profile.githubUrl && (
              <a
                href={profile.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
              >
                GitHub
              </a>
            )}
            {profile.websiteUrl && (
              <a
                href={profile.websiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                Website
              </a>
            )}
          </div>
          {profile.location && (
            <p className="mt-4 text-gray-600">📍 {profile.location}</p>
          )}
        </div>
      </div>
    </section>
  )
}

