import React from 'react'
import { useTranslation } from 'react-i18next'
import useLanguage from '../../hooks/useLanguage'

const LandingPage = () => {
  const { t } = useTranslation()
  const { isRtl } = useLanguage()
  return (
    <>
      <div className="bg-gray-800 border-b-2 border-gray-600">
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
              <div className="rounded-md shadow">
                <div className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 md:py-4 md:text-lg md:px-10">
                  {t('landingPage.comingSoon')}
                </div>
              </div>
              <div className={`mt-3 sm:mt-0 sm:m${isRtl ? 'r' : 'l'}-3`}>
                <a
                  href="https://twitter.com/BarmagaIO"
                  rel="noreferrer"
                  target="_blank"
                  className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
                >
                  {t('landingPage.followOnTwitter')}
                </a>
              </div>
            </div>
            <div className="mt-10 text-white sm:justify-center lg:justify-start">
              {t('landingPage.getIntouch')}{' '}
              <span className="font-bold">info@nyala.dev</span>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}

export default LandingPage
