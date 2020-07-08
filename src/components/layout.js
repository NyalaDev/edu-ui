import React from 'react'
import PropTypes from 'prop-types'

import Header from './Header'
import Footer from './Footer'
import './layout.css'

const Layout = ({ children }) => {
  return (
    <div className="font-sans leading-normal tracking-normal">
      <Header />

      <div className="container w-full mx-auto pt-20">
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-black-800 leading-normal">
          {children}
        </div>
      </div>

      <Footer />
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
