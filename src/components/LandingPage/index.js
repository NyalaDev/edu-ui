import React from 'react'
import { useTranslation } from 'react-i18next'
import useLanguage from '../../hooks/useLanguage'
import Button from '../General/Button'

const LandingPage = () => {
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
                </Button>
              </div>
              <div className="rounded-md shadow">
                <Button
                  link
                  href="https://chuffed.org/project/nyala-dev"
                  rel="noreferrer"
                  target="_blank"
                  extraClasses={[
                    'bg-yellow-500 hover:bg-yellow-400 text-gray-800',
                  ]}
                >
                  {t('landingPage.supportUs')}
                </Button>
              </div>
            </div>

            <div className="mt-10 text-sm text-white sm:justify-center lg:justify-start">
              {t('landingPage.getIntouch')}{' '}
              <span className="font-bold">
                <a rel="noreferrer" target="_blank" href="https://nyala.dev">
                  info@nyala.dev
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
