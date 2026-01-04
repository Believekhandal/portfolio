import React from 'react'
import { Experience as ExperienceType } from '../../types'

interface ExperienceProps {
  experiences: ExperienceType[]
}

/**
 * Experience section component showing work history
 *
 * Features:
 * - Timeline-style layout
 * - Company logos support
 * - Date formatting
 * - Current position indicators
 * - Responsive design
 */
export function Experience({ experiences }: ExperienceProps): React.JSX.Element {
  const formatDate = (dateString?: string) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short' })
  }

  return (
    <section id="experience" className="section-container bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Experience</h2>
      <div className="max-w-4xl mx-auto">
        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {index !== experiences.length - 1 && (
                <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gray-300"></div>
              )}
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  {exp.companyLogoUrl ? (
                    <img
                      src={exp.companyLogoUrl}
                      alt={exp.company}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-lg bg-primary-600 flex items-center justify-center text-white font-bold">
                      {exp.company.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-1">{exp.title}</h3>
                  <p className="text-primary-600 font-semibold mb-2">{exp.company}</p>
                  {exp.location && (
                    <p className="text-gray-600 text-sm mb-3">📍 {exp.location}</p>
                  )}
                  <p className="text-gray-600 text-sm mb-4">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </p>
                  {exp.description && (
                    <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

