import { useState, useEffect } from 'react'
import Home from './components/Home'
import Catalogue from './components/Catalogue'
import Collections from './components/Collections'
import Offers from './components/Offers'
import Gallery from './components/Gallery'
import About from './components/About'

function App() {
  const [currentPage, setCurrentPage] = useState('home')

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash.startsWith('#catalogue')) {
        setCurrentPage('catalogue')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.startsWith('#collections')) {
        setCurrentPage('collections')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.startsWith('#offers')) {
        setCurrentPage('offers')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.startsWith('#gallery')) {
        setCurrentPage('gallery')
        window.scrollTo({ top: 0, behavior: 'smooth' })
      } else if (hash.startsWith('#about')) {
        setCurrentPage('about')
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

  if (currentPage === 'collections') {
    return <Collections />
  }

  if (currentPage === 'offers') {
    return <Offers />
  }

  if (currentPage === 'gallery') {
    return <Gallery />
  }

  if (currentPage === 'about') {
    return <About />
  }

  return <Home />
}

export default App
