import React, { useState, useEffect, Suspense } from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import { FaTwitter, FaFacebookSquare, FaInstagram } from 'react-icons/fa'
import useLanguage from '../hooks/useLanguage'

const quotes = {
  en: [
    {
      text:
        'Education is the most powerful weapon which you can use to change the world.',
      author: 'Nelson Mandela',
    },
    {
      text:
        'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.',
      author: 'Malcolm X',
    },
    {
      text:
        'If you talk to a person in a language they understand, that goes to their head. If you talk to them in their own language, that goes to their heart.',
      author: 'Nelson Mandela',
    },
  ],
  sw: [
    {
      text: 'Elimu ni silaha kubwa ambayo unaweza kuitumia kubadili dunia.',
      author: 'Nelson Mandela',
    },
    {
      text:
        'Elimu ni pasipoti kwa siku zijazo, maana kesho ni kwa ajili ya wale wanaoiandaa leo hii.',
      author: 'Malcom X',
    },
    {
      text:
        'Kama ukiongea na mtu kwa lugha ambayo anaielewa basi itakaa kichwani. Ila ukiongea nao kwa lugha ya kwao basi itakaa moyoni.',
      author: 'Nelson Mandela',
    },
  ],
}
const Footer: React.FC = () => {
  const { t } = useTranslation()
  const [randomQuote, setRandomQuote] = useState<{
    text: string
    author: string
  } | null>(null)
  const { language } = useLanguage()

  const quotesInLanguage = quotes[language as keyof typeof quotes] || quotes.en
  useEffect(() => {
    setRandomQuote(
      quotesInLanguage[Math.floor(Math.random() * quotesInLanguage.length)]
    )
  }, [quotesInLanguage])
  return (
    <Suspense fallback="loading">
      <footer className="flex justify-center px-4 text-brmg-text bg-brmg-disabled h-40 w-full">
        <div className="flex justify-between flex-col md:flex-row w-5/6 px-3">
          <ul className="flex items-center justify-center flex-col md:flex-row">
            <li className="border-x-2 px-2">
              <a href="#">{t('courses')}</a>
            </li>
            <li className=" px-2">
              <a href="#">{t('landingPage.supportUs')}</a>
            </li>
            <li className=" px-2">
              <a href="#">{t('landingPage.applyAsInstructor')}</a>
            </li>
            <li className=" px-2">
              <a href="#">{t('landingPage.callUs')}</a>
            </li>
          </ul>

          <div className="flex flex-col justify-center items-center">
            <div className="flex items-center justify-center flex-shrink-0">
              <Link to="/">
                <img
                  className="lg:block h-8 w-auto"
                  src="/images/barmaga-logo.png"
                  alt="Barmaga Logo"
                />
              </Link>
            </div>
            <ul className="flex mt-2">
              <li>
                <a href="#">
                  <FaTwitter size={24} className="text-brmg-text px-2" />
                </a>
              </li>
              <li>
                <FaFacebookSquare size={24} className="text-brmg-text" />
              </li>
              <li>
                <FaInstagram size={24} className="text-brmg-text" />
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </Suspense>
  )
}
export default Footer
