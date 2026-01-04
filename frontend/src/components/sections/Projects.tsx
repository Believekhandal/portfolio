import React from 'react'
import { Project } from '../../types'

interface ProjectsProps {
  projects: Project[]
}

/**
 * Projects section component showcasing portfolio projects
 *
 * Features:
 * - Featured projects highlight
 * - Project cards with images and links
 * - Technology tags
 * - GitHub and live demo links
 * - Responsive grid layout
 */
export function Projects({ projects }: ProjectsProps): React.JSX.Element {
  const featuredProjects = projects.filter(p => p.featured)
  const otherProjects = projects.filter(p => !p.featured)

  return (
    <section id="projects" className="section-container bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Projects</h2>
      
      {featuredProjects.length > 0 && (
        <div className="mb-16">
          <h3 className="text-2xl font-semibold mb-8 text-gray-800">Featured Projects</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {featuredProjects.map(project => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h4 className="text-2xl font-bold mb-2">{project.name}</h4>
                  <p className="text-gray-600 mb-4">{project.description}</p>
                  {project.technologies && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.split(',').map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm"
                        >
                          {tech.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
                      >
                        GitHub
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition"
                      >
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {otherProjects.length > 0 && (
        <div>
          <h3 className="text-2xl font-semibold mb-8 text-gray-800">Other Projects</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {otherProjects.map(project => (
              <div
                key={project.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
              >
                {project.imageUrl && (
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    className="w-full h-40 object-cover"
                  />
                )}
                <div className="p-4">
                  <h4 className="text-xl font-bold mb-2">{project.name}</h4>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        GitHub →
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        Demo →
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  )
}

