import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'gatsby'

const urls = [
  {
    id: 1,
    to: '/',
    text: 'الرئيسية',
  },
  {
    id: 2,
    to: '/courses',
    text: 'الكورسات',
  },
]

const NavBar = ({ open }) => {
  const statusClassName = open ? 'flex' : 'hidden'
  return (
    <div
      className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${statusClassName} lg:block mt-2 lg:mt-0 bg-grey-900 z-20`}
      id="nav-content"
    >
      <ul className="list-reset lg:flex flex-1 items-center px-4 md:px-0">
        {urls.map(url => (
          <li key={url.id} className="mr-6 my-2 md:my-0">
            <Link
              to={url.to}
              className="block py-1 md:py-3 pl-1 align-middle text-gray-100 no-underline hover:text-white hover:border-b-2  hover:border-grey-600"
            >
              <span className="pb-1 md:pb-0 text-sm">{url.text}</span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="relative pull-right pl-4 pr-4 md:pr-0">
        <input
          type="search"
          placeholder="Search"
          className="w-full bg-gray-100 text-sm text-gray-800 transition border focus:outline-none focus:border-gray-700 rounded py-1 px-2 pl-10 appearance-none leading-normal"
        />
        <div
          className="absolute search-icon"
          style={{ top: '0.375rem', left: '1.75rem' }}
        >
          <svg
            className="fill-current pointer-events-none text-gray-800 w-4 h-4"
            xmlns="https://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z"></path>
          </svg>
        </div>
      </div>
    </div>
  )
}

NavBar.propTypes = {
  open: PropTypes.bool.isRequired,
}

export default NavBar
