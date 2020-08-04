import React, { useState } from 'react'
import { Link } from 'gatsby'
import { useTranslation } from 'react-i18next'
import { isEmpty } from 'lodash'

import UserMenu from './UserMenu'
import SearchBar from './SearchBar'
import MobileMenu from './MobileMenu'

import { getUser } from '../../services/util'

const navBarItems = [
  {
    id: 1,
    label: 'home',
    to: '/',
  },
  {
    id: 2,
    label: 'courses',
    to: '/courses',
  },
]

const Header = () => {
  // Temp for styeling. FIXME: User context or redux ?
  const isAuthenticated = !isEmpty(getUser())

  const { t } = useTranslation()
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)

  const toggleMobileNavBarOpen = () => {
    setMobileNavbarOpen(!mobileNavbarOpen)
  }

  return (
    <nav style={{ direction: 'rtl' }} className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out"
              aria-label="Main menu"
              aria-expanded="false"
              onClick={toggleMobileNavBarOpen}
              type="button"
            >
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className="hidden h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex-shrink-0 ml-2">
              <img
                className="block lg:hidden h-8 w-auto"
                src="https://cdn.nyaladev.com/coderhub/coderhub_small.png"
                alt="Coderhub"
              />
              <img
                className="hidden lg:block h-8 w-auto"
                src="https://cdn.nyaladev.com/coderhub/coderhub_logo_light.png"
                alt="Coderhub"
              />
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex">
                {navBarItems.map(navItem => (
                  <Link
                    key={navItem.id}
                    to={navItem.to}
                    className="mx-2 px-3 py-2 rounded-md text-sm font-medium leading-5 text-white  focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    {t(navItem.label)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <div className="hidden md:block sm:hidden">
              <SearchBar />
            </div>
            {/* <button
              className="p-1 border-2 border-transparent text-gray-400 rounded-full hover:text-white focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              aria-label="Notifications"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
            </button> */}

            {!isAuthenticated && (
              <Link
                to="/signin"
                className="mx-2 px-3 py-2 rounded-md text-sm font-medium leading-5 text-white  focus:outline-none focus:text-white focus:bg-gray-700 transition duration-150 ease-in-out"
              >
                {t('signIn')}
              </Link>
            )}
            {isAuthenticated && <UserMenu />}
          </div>
        </div>
      </div>

      <MobileMenu open={mobileNavbarOpen} navBarItems={navBarItems} />
    </nav>
  )
}

export default Header
