import React from 'react'
import { ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import { useTranslation } from 'react-i18next'
import Header from './Header'
import PageTitle from './PageTitle'
import Footer from './Footer'
import '../i18n'

import 'react-toastify/dist/ReactToastify.css'
import './layout.css'
import useLanguage from '../hooks/useLanguage'
import SEO from './Seo'

const Layout = ({ children, pageTitle, fullPage, modalOpen }) => {
  const { isRtl, language } = useLanguage()
  const { t } = useTranslation()
  // this is to avoid this issue: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [hasMounted, setHasMounted] = React.useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])

  if (!hasMounted) {
    return null
  }

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
      <SEO title={t('landingPage.heroSubtitle')} />
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
