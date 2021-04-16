import React, { useState, useEffect, Suspense } from 'react'
import useLanguage from '../hooks/useLanguage'
import { getQuotes } from '../services/api'

const Footer = () => {
  const [randomQuote, setRandomQuote] = useState(null)
  const { language } = useLanguage()
  const quoteLanguage = language === 'am' || language === 'ar' ? 'en' : language
  useEffect(() => {
    const fetchData = async () => {
      const data = await getQuotes()
      const quotesInLanguage = data.Quotes[quoteLanguage]
      setRandomQuote(
        quotesInLanguage[Math.floor(Math.random() * quotesInLanguage.length)]
      )
    }
    fetchData()
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
