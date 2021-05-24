import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import useLanguage from '../../hooks/useLanguage'
import Header from '../Header'
import HeroSection from './HeroSection'

const LandingPage: React.FC = () => {
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  return (
    <>
      <div
        style={{
          backgroundImage: isRtl
            ? 'url(/images/hero-bg-rtl.png)'
            : 'url(/images/hero-bg-ltr.png)',
          backgroundSize: '50%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: isRtl ? 'left top' : 'right top',
        }}
      >
        <div className={` ${isRtl ? 'flex-row-reverse' : ''} title mb-6`}>
          <Header />
          <HeroSection />
        </div>
      </div>
    </>
  )
}
export default LandingPage
