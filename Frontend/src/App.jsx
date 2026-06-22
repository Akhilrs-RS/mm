import { useState, useEffect } from 'react'
import Home from './components/Home'
import Catalogue from './components/Catalogue'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash === '#catalogue') {
        setCurrentPage('catalogue')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else {
        setCurrentPage('home')
        // Scroll to the targeted section on Home page after brief render timeout
        if (hash && hash !== '#') {
          setTimeout(() => {
            const element = document.getElementById(hash.substring(1))
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' })
            }
          }, 100)
        }
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    // Initial run on mount
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  if (currentPage === 'catalogue') {
    return <Catalogue />
  }

  return <Home />
}

export default App
