import React from 'react'
import { Hobby } from '../../types'

interface HobbiesProps {
  hobbies: Hobby[]
}

/**
 * Hobbies section component displaying personal interests
 *
 * Features:
 * - Hobby cards with icons and descriptions
 * - Image support for hobbies
 * - Gradient background styling
 * - Responsive grid layout
 */
export function Hobbies({ hobbies }: HobbiesProps): React.JSX.Element {
  return (
    <section id="hobbies" className="section-container bg-white">
      <h2 className="text-4xl font-bold text-center mb-12 gradient-text">Hobbies & Interests</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {hobbies.map(hobby => (
          <div
            key={hobby.id}
            className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-lg p-6 shadow-md hover:shadow-lg transition"
          >
            <div className="text-4xl mb-4">{hobby.iconUrl || '🎨'}</div>
            <h3 className="text-2xl font-bold mb-3">{hobby.name}</h3>
            <p className="text-gray-700">{hobby.description}</p>
            {hobby.imageUrl && (
              <img
                src={hobby.imageUrl}
                alt={hobby.name}
                className="mt-4 rounded-lg w-full h-40 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

