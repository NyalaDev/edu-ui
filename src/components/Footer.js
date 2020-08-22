import React from 'react'

const quotes = [
  {
    id: 1,
    text:
      'Education is the most powerful weapon which you can use to change the world.',
    author: 'Nelson Mandela',
  },
  {
    id: 2,
    text:
      'Education is the passport to the future, for tomorrow belongs to those who prepare for it today.',
    author: 'Malcolm X',
  },
  {
    id: 3,
    text:
      'Education is what remains after one has forgotten what one has learned in school',
    author: 'Albert Einstein',
  },
]

const Footer = () => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]
  return (
    <footer className="flex justify-center px-4 text-gray-100 bg-gray-800">
      <div className="container py-6">
        <div
          style={{ direction: 'ltr' }}
          className="flex items-center justify-center"
        >
          <div className="flex flex-col items-center w-1/2">
            <h1 className="text-center text-lg font-bold lg:text-2xl">
              {randomQuote.text}
            </h1>
            <h4>{randomQuote.author}</h4>
          </div>
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
  )
}

export default Footer
