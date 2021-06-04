import React, { useState, useContext } from 'react'
import { Link, useTranslation } from 'gatsby-plugin-react-i18next'
import LanguageSwitcher from '../General/LanguageSwitcher'
import UserMenu from './UserMenu'
import Search from '../Search'
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

const BurgerMenu: React.FC<{ toggleMobileNavBarOpen: () => void }> = ({
  toggleMobileNavBarOpen,
}) => {
  return (
    <button
      className="inline-flex items-center justify-center p-2 rounded-md text-brmg-highlight focus:outline-none transition duration-150 ease-in-out"
      aria-label="Main menu"
      aria-expanded="false"
      onClick={toggleMobileNavBarOpen}
      type="button"
    >
      <svg
        className="block h-12 w-12"
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
    </button>
  )
}
const MobileMenu: React.FC = () => {
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
        <div className="relative flex py-4 items-center justify-between">
          <Link className="flex-grow" to="/">
            <img
              className="h-16 w-auto"
              src="/images/barmaga-logo.png"
              alt="Barmaga Logo"
            />
          </Link>

          <LanguageSwitcher dark />
          <BurgerMenu toggleMobileNavBarOpen={toggleMobileNavBarOpen} />

          {/* <div className="w-2/5 py-2 px-3  right-0 flex items-center">
            <div className="flex">
              {!isLoggedIn && (
                <Link to="/signin" className=" ">
                  {t('signIn')}
                </Link>
              )}
              {isLoggedIn && <UserMenu />}
            </div>
          </div> */}
        </div>
      </div>

      <div className={`${mobileNavbarOpen ? '' : 'hidden'}`}>
        <div className="px-2 py-3 border-t-2 border-brmg-highlight border-opacity-30">
          {navBarItems.map(navItem => (
            <Link
              key={navItem.id}
              to={navItem.to!}
              className="brmg-mobile-menu-item"
            >
              {t(navItem.label!)}
            </Link>
          ))}
          <a
            rel="noreferrer"
            target="_blank"
            className="brmg-mobile-menu-item"
            href="https://chuffed.org/project/barmagaio"
          >
            {t('landingPage.supportUs')}
          </a>
          {!isLoggedIn && (
            <Link to="/signin" className="brmg-mobile-menu-item">
              {t('signIn')}
            </Link>
          )}
          {isLoggedIn && (
            <div className="brmg-mobile-menu-item">
              <UserMenu />
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default MobileMenu
