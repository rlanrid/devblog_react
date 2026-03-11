import { useCallback, useState } from 'react'
import { Outlet } from 'react-router-dom'

import { useLockBodyScroll } from '../../hooks/useLockBodyScroll'

import Header from './Header'
import Sidebar from './Sidebar'
import Footer from './Footer'

const BlogLayout = ({ query, updateQuery }) => {
  // 사이드바
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);
  const syncMenuUI = () => setIsMenuOpen(prev => !prev);
  useLockBodyScroll({ active: isMenuOpen, onClose: closeMenu, breakpoint: 980 });

  return (
    <>
      <Sidebar updateQuery={updateQuery} isMenuOpen={isMenuOpen} />
      <div className="wrap">
        <Header
          query={query}
          updateQuery={updateQuery}
          isMenuOpen={isMenuOpen}
          syncMenuUI={syncMenuUI}
        />

        <main className="main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default BlogLayout