import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import useLanguage from '../../hooks/useLanguage'
import Header from '../Header'
import HeroSection from './HeroSection'
import QuoteSection from './QuoteSection'
import { HomePageSettings } from '../../types/api.types'

type LandingPageProps = {
  settings: HomePageSettings
}

const LandingPage: React.FC<LandingPageProps> = ({ settings }) => {
  const { isRtl } = useLanguage()
  return (
    <>
      <div
        style={{
          backgroundImage: isRtl
            ? 'url(/images/hero-bg-rtl.png)'
            : 'url(/images/hero-bg-ltr.png)',
          backgroundSize: '50% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: isRtl ? 'left top' : 'right top',
        }}
      >
        <div className={` ${isRtl ? 'flex-row-reverse' : ''} title md:pb-24 `}>
          <Header />
          <HeroSection />
        </div>
      </div>
      <QuoteSection settings={settings} />
    </>
  )
}
export default LandingPage
