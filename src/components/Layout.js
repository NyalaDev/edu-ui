import React from 'react'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import Header from './Header'
import PageTitle from './PageTitle'
import Footer from './Footer'
import '../i18n'

import 'react-toastify/dist/ReactToastify.css'
import './layout.css'
import useLanguage from '../hooks/useLanguage'

const Layout = ({ children, pageTitle }) => {
  const { language } = useLanguage()

  return (
    <div
      style={{ direction: language === 'ar' ? 'rtl' : 'ltr' }}
      className="bg-gray-100 font-sans leading-normal tracking-normal"
    >
      <Header />

      {pageTitle && <PageTitle title={pageTitle} />}

      <div className="container max-w-6xl w-full mx-auto pt-20">
        <div className="w-full md:mt-8 mb-16 text-black-800 leading-normal">
          {children}
        </div>
      </div>

      <Footer />
      <ToastContainer />
    </div>
  )
}

Layout.propTypes = {
  pageTitle: PropTypes.string,
}

Layout.defaultProps = {
  pageTitle: '',
}

export default Layout
