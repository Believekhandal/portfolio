import React from 'react'
import { Skill } from '../../types'

interface SkillsProps {
  skills: Skill[]
}

/**
 * Skills section component displaying technical skills
 *
 * Features:
 * - Skills grouped by category
 * - Proficiency bars with visual indicators
 * - Responsive grid layout
 * - Icon support for skills
 */
export function Skills({ skills }: SkillsProps): React.JSX.Element {
  const categories = Array.from(new Set(skills.map(skill => skill.category)))

  const getSkillColor = (proficiency: number) => {
    if (proficiency >= 80) return 'bg-green-500'
    if (proficiency >= 60) return 'bg-blue-500'
    return 'bg-yellow-500'
  }

  return (
    <section id="skills" className="section-container bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Technical Skills</h2>
      <div className="space-y-12">
        {categories.map(category => {
          const categorySkills = skills.filter(skill => skill.category === category)
          return (
            <div key={category}>
              <h3 className="text-2xl font-semibold mb-6 text-gray-800">{category}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categorySkills.map(skill => (
                  <div
                    key={skill.id}
                    className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        {skill.iconUrl && (
                          <img src={skill.iconUrl} alt={skill.name} className="w-8 h-8" />
                        )}
                        <span className="font-semibold text-lg">{skill.name}</span>
                      </div>
                      <span className="text-sm font-medium text-gray-600">{skill.proficiency}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${getSkillColor(skill.proficiency)}`}
                        style={{ width: `${skill.proficiency}%` }}
                      ></div>
                    </div>
                    {skill.description && (
                      <p className="mt-3 text-sm text-gray-600">{skill.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

