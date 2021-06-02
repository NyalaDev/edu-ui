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
      <div className="bg-top-header">
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
