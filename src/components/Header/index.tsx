import React, { useState, useContext } from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import LanguageSwitcher from '../General/LanguageSwitcher'
import UserMenu from './UserMenu'
import Search from '../Search'
import MobileMenu from './MobileMenu'
import { AuthContext } from '../../contexts/AuthContext'

const navBarItems = [
  // {
  //   id: 1,
  //   label: 'home',
  //   to: '/',
  // },
  {
    id: 2,
    label: 'courses',
    to: '/courses',
  },
]
const Header: React.FC = () => {
  // this is to avoid this issue: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [hasMounted, setHasMounted] = React.useState(false)
  const { isLoggedIn } = useContext(AuthContext)
  const { t } = useTranslation()
  const [mobileNavbarOpen, setMobileNavbarOpen] = useState(false)
  React.useEffect(() => {
    setHasMounted(true)
  }, [])
  const toggleMobileNavBarOpen = () => {
    setMobileNavbarOpen(!mobileNavbarOpen)
  }
  if (!hasMounted) {
    return null
  }
  return (
    <nav className="title">
      <div className="brmg-container">
        <div className="relative flex pt-16 items-center justify-between h-16">
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
              <Link to="/">
                <img
                  className="lg:block h-8 w-auto"
                  src="/images/barmaga-logo.png"
                  alt="Barmaga Logo"
                />
              </Link>
            </div>
            <div className="hidden flex-grow sm:block sm:ml-6">
              <div className="flex">
                {navBarItems.map(navItem => (
                  <Link
                    key={navItem.id}
                    to={navItem.to}
                    className="mx-2 px-3 py-2 rounded-md leading-5 text-xl focus:outline-none transition duration-150 ease-in-out"
                  >
                    {t(navItem.label)}
                  </Link>
                ))}
                <a
                  rel="noreferrer"
                  target="_blank"
                  className="mx-2 px-3 py-2 rounded-md leading-5 text-xl focus:outline-none transition duration-150 ease-in-out"
                  href="https://chuffed.org/project/barmagaio"
                >
                  {t('landingPage.supportUs')}
                </a>
              </div>
            </div>
          </div>
          <div className="w-2/5 right-0 flex items-center">
            <div className="hidden w-1/2 md:block">
              <Search />
            </div>
            <div className="flex text-white">
              {!isLoggedIn && (
                <Link to="/signin" className="px-3 w-2/3 py-2">
                  {t('signIn')}
                </Link>
              )}
              {isLoggedIn && <UserMenu />}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>

      <MobileMenu open={mobileNavbarOpen} navBarItems={navBarItems} />
    </nav>
  )
}
export default Header
