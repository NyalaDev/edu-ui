import React from 'react'
import { ToastContainer } from 'react-toastify'
import Header from './Header'
import Footer from './Footer'
import '../i18n'

import 'react-toastify/dist/ReactToastify.css'
import './layout.css'

const Layout = ({ children }) => {
  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <Header />

      <div className="container w-full mx-auto pt-20">
        <div className="w-full px-4 md:px-0 md:mt-8 mb-16 text-black-800 leading-normal">
          {children}
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  )
}

export default Layout
