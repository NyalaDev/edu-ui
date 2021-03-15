import React from 'react'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Helmet from 'react-helmet'
import Header from './Header'
import PageTitle from './PageTitle'
import Footer from './Footer'
import '../i18n'

import 'react-toastify/dist/ReactToastify.css'
import './layout.css'
import useLanguage from '../hooks/useLanguage'

const Layout = ({ children, pageTitle, fullPage, modalOpen }) => {
  const { isRtl, language } = useLanguage()
  const { t } = useTranslation()
  const wrappedChildren = fullPage ? (
    children
  ) : (
    <div className="container max-w-6xl w-full mx-auto pt-10">
      <div className="w-full md:mt-2 mb-16 text-black-800 leading-normal">
        {children}
      </div>
    </div>
  )

  return (
    <div className={modalOpen ? 'opacity-40' : ''}>
      <Helmet titleTemplate="%s | barmaga.io">
        <meta property="og:type" content="website" />
        <meta property="og:title" content={t('landingPage.heroText')} />
        <meta
          property="og:description"
          content={t('landingPage.heroSubtitle')}
        />
        <meta property="og:url" content="https://barmaga.io" />
        <meta
          property="og:image"
          content="https://cdn.nyaladev.com/barmaga.io/barmaga_logo_sm.svg"
        />
        <meta
          name="twitter:image"
          content="https://cdn.nyaladev.com/barmaga.io/barmaga_logo_sm.svg"
        />
        <meta name="twitter:card" content={t('landingPage.heroText')} />
        <meta charset="utf-8" />
      </Helmet>
      <div
        className={`${isRtl ? 'rtl' : ''} ${
          language === 'am' ? 'amharic' : ''
        } bg-gray-100 leading-normal tracking-normal`}
      >
        <Header />

        {pageTitle && <PageTitle title={pageTitle} />}

        {wrappedChildren}

        <Footer />
        <ToastContainer />
      </div>
    </div>
  )
}

Layout.propTypes = {
  pageTitle: PropTypes.string,
  fullPage: PropTypes.bool,
  modalOpen: PropTypes.bool,
}

Layout.defaultProps = {
  pageTitle: '',
  fullPage: false,
  modalOpen: false,
}

export default Layout
