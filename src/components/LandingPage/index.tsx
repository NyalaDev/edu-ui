import React from 'react'
import { useTranslation } from 'gatsby-plugin-react-i18next'
import { AiOutlineTwitter } from 'react-icons/ai'
import useLanguage from '../../hooks/useLanguage'
import Button from '../General/Button'

const LandingPage: React.FC = () => {
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  return (
    <>
      <div className="bg-gray-800 border-b-2 border-gray-600 p-2 sm:p-0">
        <main className="mx-auto max-w-6xl pt-24 pb-12">
          <div className={`text-center lg:text-${isRtl ? 'right' : 'left'}`}>
            <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
              <span className="block text-gray xl:inline">
                {t('landingPage.heroText')}
              </span>
            </h1>
            <p className="mt-3 text-3xl text-white">
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
                  {t('landingPage.followOnTwitter')}
                  <AiOutlineTwitter />
                </Button>
              </div>
            </div>

            <div className="mt-10 text-sm text-white sm:justify-center lg:justify-start">
              {t('landingPage.getIntouch')}{' '}
              <span className="font-bold">
                <a rel="noreferrer" target="_blank" href="https://nyala.dev">
                  info@barmaga.io
                </a>
              </span>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
export default LandingPage
