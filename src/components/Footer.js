import React, { useState, useEffect, Suspense } from 'react'
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
        'If you talk to a person in a language he understands, that goes to his head. If you talk to them in their own language, that goes to their heart.',
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

const Footer = () => {
  const [randomQuote, setRandomQuote] = useState(null)
  const { language } = useLanguage()
  const quoteLanguage = language === 'am' || language === 'ar' ? 'en' : language
  const quotesInLanguage = quotes[quoteLanguage]

  useEffect(() => {
    setRandomQuote(
      quotesInLanguage[Math.floor(Math.random() * quotesInLanguage.length)]
    )
  }, [])

  return (
    <Suspense fallback="loading">
      <footer className="flex justify-center px-4 text-gray-100 bg-gray-800">
        <div className="container py-6">
          <div
            style={{ direction: 'ltr' }}
            className="flex items-center justify-center"
          >
            {randomQuote && (
              <div className="flex flex-col items-center w-1/2">
                <h1 className="text-center title text-lg lg:text-2xl">
                  {randomQuote.text}
                </h1>
                <h4 className="font-light">{randomQuote.author}</h4>
              </div>
            )}
          </div>

          <hr className="h-px mt-6 bg-gray-700 border-none" />

          <div
            className="flex flex-col items-center justify-between mt-6 md:flex-row"
            style={{ direction: 'ltr' }}
          >
            <div className="flex items-center justify-center">
              <span className="mr-4">Developed By: </span>
              <a
                href="https://nyala.dev"
                target="_blank"
                rel="noreferrer"
                className="text-xl font-bold"
              >
                <img
                  src="https://cdn.nyaladev.com/logo/nyala-logo-dark-bg.png"
                  alt="nayal"
                  className="w-24"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </Suspense>
  )
}

export default Footer
