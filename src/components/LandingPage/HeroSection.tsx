/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { AiOutlineTwitter } from 'react-icons/ai'
import useLanguage from '../../hooks/useLanguage'
import Button from '../General/Button'

const HeroSection: React.FC = () => {
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  return (
    <>
      <div className="brmg-container flex flex-wrap  mb:10 md:mb-0">
        <div className="w-full md:w-2/5 mt-16">
          <div
            className={`text-center md:pt-24 lg:text-${
              isRtl ? 'right ml-2' : 'left mr-2'
            }`}
          >
            <h1 className="text-5xl tracking-tight">
              <span className="block text-brmg-highlight xl:inline">
                {t('landingPage.heroText')}
              </span>
            </h1>
            <p className="mt-3 text-2xl text-brmg-black">
              {t('landingPage.heroSubtitle')}
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className={`mt-3 sm:mt-0 sm:m${isRtl ? 'l' : 'r'}-3`}>
                <Button
                  link
                  mode="info"
                  href="https://twitter.com/BarmagaIO"
                  rel="noreferrer"
                  target="_blank"
                >
                  <AiOutlineTwitter size="32" className="ml-2" />
                  {t('landingPage.followOnTwitter')}
                </Button>
              </div>
            </div>

            <div className="mt-6 mb-6 md:mb-0 md:mt-10  text-sm sm:justify-center lg:justify-start">
              {t('landingPage.getIntouch')}{' '}
              <span className="font-bold">
                <a rel="noreferrer" target="_blank" href="https://nyala.dev">
                  info@barmaga.io
                </a>
              </span>
            </div>
          </div>
        </div>
        <div className="w-full md:w-3/5 md:mt-16">
          <video
            className="w-auto h-96 rounded-xl"
            src="https://cdn.nyaladev.com/barmaga.io/barmaga-landing.mp4"
            controls
          >
            <source
              src="https://cdn.nyaladev.com/barmaga.io/barmaga-landing.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
    </>
  )
}

export default HeroSection
