import * as React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import useLanguage from '../../hooks/useLanguage'
import { HomePageSettings } from '../../types/api.types'

type QuoteSectionProps = {
  settings: HomePageSettings
}
const QuoteSection: React.FC<QuoteSectionProps> = ({ settings }) => {
  const { isRtl, language } = useLanguage()

  // ToDo: Enable it when we have translations in Amharic and Swahili
  if (language !== 'ar' && language !== 'en') return null

  const { homeQuotes, homeSettings } = settings
  const { homeBullets } = homeSettings
  const { data: selectedLanguagePoints } =
    homeBullets.find(bull => bull.language === language) ||
    homeBullets.find(bull => bull.language === 'en')!

  const { data: quotesInLanguage } =
    homeQuotes.find(bull => bull.language === language) ||
    homeQuotes.find(bull => bull.language === 'en')!

  const quote =
    quotesInLanguage[Math.floor(Math.random() * quotesInLanguage.length)]

  return (
    <div className="flex flex-wrap title mt-16 md:mt-0">
      <div className="w-full brmg-bg-quote-section">
        <div className="brmg-container md:h-96 flex flex-wrap">
          <div className="w-full md:w-1/2 h-full relative">
            <img
              alt=""
              src={`/images/quote-${isRtl ? 'right' : 'left'}.png`}
              className={`w-16 md:w-24 h-auto absolute top-0 -mt-10 ${
                isRtl ? 'right-0' : 'left-0 ml-12 -mb-4'
              }`}
            />
            <div className="px-12 py-4 md:py-8">
              <div className="text-white title text-2xl md:text-3xl mt-6 md:mt-12 text-justify md:leading-relaxed">
                {quote.text}
              </div>
              <div className="text-brmg-warning text-xl md:text-2xl text-left mt-4 mb-6 md:mb-0">
                {quote.author}
              </div>
            </div>
            <img
              alt=""
              src={`/images/quote-${isRtl ? 'left' : 'right'}.png`}
              className={`w-16 md:w-24 h-auto absolute bottom-0 -mb-4 ${
                isRtl ? 'left-0 md:ml-12' : 'right-0 mr-12'
              }`}
            />
          </div>
          <div className="w-full hidden md:w-1/2 px-4 text-brmg-subtle md:flex items-center">
            <div>
              {selectedLanguagePoints?.map(({ title, bullets }) => {
                return (
                  <>
                    <div className="text-bold text-xl mt-1 mb-2">{title}</div>
                    <ul>
                      {bullets.map(bullet => {
                        return (
                          <li className="list-disc-none leading-loose font-light">
                            <AiFillCheckCircle className="inline-block opacity-60 text-brmg-secondary mx-1" />
                            {bullet}
                          </li>
                        )
                      })}
                    </ul>
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default QuoteSection
