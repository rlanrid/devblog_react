import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import { Outlet, useSearchParams } from 'react-router-dom'
import Footer from './Footer'

const BlogLayout = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  const updateQuery = (key, value) => {
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);

      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      if (key !== "page") {
        params.get("page", 1);
      }

      return params;
    })
  };

  const syncMenuUI = () => {
    setIsMenuOpen(prev => !prev);
  };

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