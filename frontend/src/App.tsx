import { Header } from './components/layout/Header'
import { About } from './components/sections/About'
import { Skills } from './components/sections/Skills'
import { Projects } from './components/sections/Projects'
import { Hobbies } from './components/sections/Hobbies'
import { Experience } from './components/sections/Experience'
import { Contact } from './components/sections/Contact'
import { Footer } from './components/layout/Footer'
import { LoadingSpinner } from './components/ui/LoadingSpinner'
import { usePortfolioData } from './hooks/usePortfolioData'

/**
 * Main Portfolio Application Component
 *
 * Features:
 * - Responsive single-page application
 * - Portfolio data fetching and state management
 * - Component-based architecture with clear separation
 * - Modern React patterns with hooks
 */
function App() {
  const {
    profile,
    skills,
    projects,
    hobbies,
    experiences,
    loading,
    error
  } = usePortfolioData()

  // Show loading state while fetching data
  if (loading) {
    return <LoadingSpinner />
  }

  // Show error state if data fetching failed
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Failed to Load Portfolio</h2>
          <p className="text-gray-600">Please try refreshing the page.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header profile={profile} />

      <main className="pt-16">
        <About profile={profile} />
        <Skills skills={skills} />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <Hobbies hobbies={hobbies} />
        <Contact />
      </main>

      <Footer profile={profile} />
    </div>
  )
}

export default App

