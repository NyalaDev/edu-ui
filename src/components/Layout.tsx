import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { ToastContainer } from 'react-toastify'
import Header from './Header'
import SubscribeEmail from './LandingPage/SubscribeEmail'
import Footer from './Footer'
import 'react-toastify/dist/ReactToastify.css'
import './layout.css'
import useLanguage from '../hooks/useLanguage'
import SEO from './Seo'

type LayoutProps = {
  fullPage?: boolean
  modalOpen?: boolean
  title?: string
}
const Layout: React.FC<LayoutProps> = ({
  children,
  fullPage,
  modalOpen,
  title,
}) => {
  const { t } = useTranslation()
  const { isRtl, language } = useLanguage()
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
    <div className="brmg-container">
      <div className="w-full md:mt-2 mb-16 text-black-800 leading-normal">
        {children}
      </div>
    </div>
  )
  return (
    <div className={modalOpen ? 'opacity-40' : ''}>
      {title && <SEO title={title} />}
      <div
        className={`${isRtl ? 'rtl' : ''} ${
          language === 'am' ? 'amharic' : ''
        } bg-gray-100 leading-normal tracking-normal`}
      >
        {wrappedChildren}
        <div className="">
          <SubscribeEmail title={t('upcomingCourse.notifyMe')} />
        </div>
        <Footer />
        <ToastContainer />
      </div>
    </div>
  )
}

export default Layout
