import React, { useState, useEffect, Suspense } from 'react'
// import { useTranslation } from 'react-i18next'
import { useTranslation } from 'gatsby-plugin-react-i18next'

const quotes = [
  {
    en: [
      {
        id: 1,
        text: 'quote1',
        author: 'Nelson Mandela',
      },
      {
        id: 2,
        text: 'quote2',
        author: 'Malcolm X',
      },
      {
        id: 3,
        text: 'quote3',
        author: 'Nelson Mandela',
      },
    ],
    sw: [
      {
        id: 1,
        text: 'quote1',
        author: 'Nelson Mandela',
      },
      {
        id: 1,
        text: 'quote2',
        author: 'Malcom X',
      },
      {
        id: 3,
        text: 'quote3',
        author: 'Nelson Mandela',
      },
    ],
  },
]
const Footer = () => {
  const [randomQuote, setRandomQuote] = useState(null)
  const { t } = useTranslation()

  useEffect(() => {
    // console.log(quotes[0]['sw'])
    setRandomQuote(
      quotes[0].en[Math.floor(Math.random() * quotes[0].en.length)]
      // quotes[Math.floor(Math.random() * quotes.length)]
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
                  {t(randomQuote.text)}
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
            {/* <div className="flex mt-4 md:m-0">
            <div className="-mx-4">
              <a href="#" className="px-4 text-sm">
                About
              </a>
              <a href="#" className="px-4 text-sm">
                Blog
              </a>
              <a href="#" className="px-4 text-sm">
                News
              </a>
              <a href="#" className="px-4 text-sm">
                Contact
              </a>
            </div>
          </div> */}
          </div>
        </div>
      </footer>
    </Suspense>
  )
}

export default Footer
