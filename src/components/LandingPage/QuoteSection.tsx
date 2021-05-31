import * as React from 'react'
import { AiFillCheckCircle } from 'react-icons/ai'
import useLanguage from '../../hooks/useLanguage'
import { HomePageSettings } from '../../types/api.types'

type QuoteSectionProps = {
  settings: HomePageSettings
}
const QuoteSection: React.FC<QuoteSectionProps> = ({ settings }) => {
  const { isRtl, language } = useLanguage()
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
    <div className="flex flex-wrap title">
      <div
        className="w-full"
        style={{
          backgroundImage: 'url(/images/quote-bg.png)',
          backgroundSize: '50% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: isRtl ? 'right top' : 'left top',
        }}
      >
        <div className="brmg-container h-96 flex flex-wrap">
          <div className="w-1/2 h-full relative">
            <img
              alt=""
              src={`/images/quote-${isRtl ? 'right' : 'left'}.png`}
              className={`w-24 h-auto absolute top-0 -mt-10 ${
                isRtl ? 'right-0' : 'left-0 ml-12 -mb-4'
              }`}
            />
            <div className="px-12 py-8">
              <div className="text-white title text-3xl mt-12 text-justify leading-relaxed">
                {quote.text}
              </div>
              <div className="text-brmg-warning text-2xl text-left mt-4">
                {quote.author}
              </div>
            </div>
            <img
              alt=""
              src={`/images/quote-${isRtl ? 'left' : 'right'}.png`}
              className={`w-24 h-auto absolute bottom-0 -mb-4 ${
                isRtl ? 'left-0 ml-12' : 'right-0 mr-12'
              }`}
            />
          </div>
          <div className="w-1/2 px-4">
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
  )
}

export default QuoteSection
