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
const DesktopMenu: React.FC = () => {
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
            <div className="flex-grow block sm:ml-6">
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
            <div className="w-1/2">
              <Search />
            </div>
            <div className="flex text-white">
              {!isLoggedIn && (
                <Link to="/signin" className="px-3 w-2/3 py-2">
                  {t('signIn')}
                </Link>
              )}
              {isLoggedIn && <UserMenu />}
              <div>
                <LanguageSwitcher />
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default DesktopMenu
