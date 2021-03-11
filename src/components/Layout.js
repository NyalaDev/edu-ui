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
  const { isRtl, language } = useLanguage()

  return (
    <div
      className={`${isRtl ? 'rtl' : ''} ${
        language === 'am' ? 'amharic' : ''
      } bg-gray-100 leading-normal tracking-normal`}
    >
      <Header />

      {pageTitle && <PageTitle title={pageTitle} />}

      {children}

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
